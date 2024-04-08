# @fourlights/mapper

This package provides a set of utilities for mapping data in TypeScript and JavaScript applications.

## Installation

You can install this package using npm:

```bash
npm install @fourlights/mapper
```

## Usage

Import the package in your TypeScript or JavaScript file:

```typescript
import mapper from '@fourlights/mapper'
```

And then define the mapper configuration for your data:

```typescript
import { differenceInYears } from 'date-fns' // just as an example

const user = { firstName: 'John', lastName: 'Doe', birthday: new Date(1990, 1, 1) }

const config: MapperConfig<typeof user> = {
	name: (data) => `${data.firstName} ${data.lastName}`,
	birthday: (data) => data.birthday,
	age: (data) => differenceInYears(new Date(), data.birthday),
}

console.log(mapper.map(user, config))
```

Which will output (depending on the current date):

```json
{
	"name": "John Doe",
	"birthday": "1990-01-01T00:00:00.000Z",
	"age": 33
}
```

The above example uses a shorthand syntax for mapping properties. The shorthand `key: (data) => data.key` is equivalent to `key: { value: (data) => data.key }`.
The long-form is required when you want to use options or when you want to map nested objects or arrays.

## Advanced usage

More advanced configurations allow for manipulating nested arrays and objects:

```typescript
const page = { status: { private: true, archived: true }, tags: ['cool', 'example'] }
const config: MapperConfig<typeof page> = {
	tags: { value: (data) => data.tags, row: (r) => r.toUpperCase() },
	is: { value: (data) => data.status, options: { keys: mapper.Flatten } },
	is_not: { value: (data) => data.status, row: (r) => !r, options: { keys: mapper.Flatten } },
}

console.log(mapper.map(page, config))
```

Which will output:

```json5
{
	tags: ['COOL', 'EXAMPLE'],
	is_private: true,
	is_archived: true,
	is_not_private: false,
	is_not_archived: false,
}
```

Both the [`row`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/map.ts#L3) and [`options.keys`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/map.ts#L3) functions receive the following arguments on each iteration:

- `rowValue`: the value of the current row (e.g. `cool`)
- `parentKey`: the key of the parent holding the iterable value (e.g. `tags`)
- `rowKey`: the key of the current row (normally the array-index or object property name, e.g. `0` or `private`, but if you supply a `keys` function it will be the result of that function)

### Options

The [`options`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/map.ts#L4) object can contain the following properties:

- `keys`: an optional function that will be called for each key in the object or array. The function should return the key that will be used in the output object. If this function is not provided, the original key will be used.
- `initialValue`: an optional function that sets an explicit initial value for the property.

#### Keys functions

Two functions for manipulating keys are provided out of the box:

- [`mapper.Flatten`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/functions.ts#L2): flattens the keys of the object or array. This is useful when you want to flatten nested objects or arrays. Uses an underscore as a separator.
- [`mapper.Objectify`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/functions.ts#L7): converts the iterable to an object.

## Plugins

The package also provides a plugin system that allows you to re-use mapper configuration logic. You can create your own plugins by implementing the `MapperPlugin` interface.

Example usage:

```typescript
import ChangeCasingPlugin from '@fourlights/mapper/plugins/changeCasing'
import type { ChangeCasingPluginPropertyOptions } from '@fourlights/mapper/plugins/changeCasing'

const user = { firstName: 'John', lastName: 'Doe', birthday: new Date(1990, 1, 1) }
const config: MapperConfig<typeof user> = {
	name: (data) => `${data.firstName} ${data.lastName}`,
	birthday: (data) => data.birthday,
	age: (data) => differenceInYears(new Date(), data.birthday),
}

console.log(mapper.map(user, config, { plugins: [new ChangeCasingPlugin({ casing: 'upper' })] }))

// or alternatively you can set the plugin options per property
const alternativeconfig = {
	name: {
		value: (data) => `${data.firstName} ${data.lastName}`,
		options: { casing: 'upper' } as ChangeCasingPluginPropertyOptions,
	},
	birthday: (data) => data.birthday,
	age: (data) => differenceInYears(new Date(), data.birthday),
}

console.log(mapper.map(user, alternativeconfig, { plugins: [new ChangeCasingPlugin()] }))
```

Which will output:

```json5
{
	name: 'JOHN DOE',
	birthday: '1990-01-01T00:00:00.000Z',
	age: 33,
}
```

Refer to the [changeCasing](./src/lib/plugins/changeCasing.ts) plugin for an example on how to implement a plugin.

While the above is trivial, plugins can be used to implement more complex logic, such as the automatic anonymization of PII data.

#### List of available plugins:

- [@fourlights/mapper-plugin-anonymize](https://github.com/Four-Lights-NL/mapper-plugin-anonymize): anonymize PII data during mapping

## Other examples

For more examples, please refer to the [tests](./src/lib/map.test.ts) and the [playground](./playground/src/index.ts).

## Contributing

Contributions are welcome. Please open an issue or submit a pull request on [GitHub](https://github.com/Four-Lights-NL/mapper).

## License

This package is licensed under the MIT license.
