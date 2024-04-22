# @fourlights/mapper

This package provides a set of utilities for mapping data in TypeScript and JavaScript applications.

## Features

- Map data using a configuration object
- Automatically map nested objects and arrays
- Use plugins to extend functionality
- Support for TypeScript
- Fully tested

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Advanced usage](#advanced-usage)
  - [Options](#options)
  - [Structure functions](#structure-functions)
- [Plugins](#plugins)
  - [List of available plugins](#list-of-available-plugins)
- [Other examples](#other-examples)
- [Contributing](#contributing)
- [License](#license)

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

const user = { firstName: 'John', lastName: 'Doe', birthdate: new Date(1990, 1, 1) }

const config: MapperConfig<typeof user> = {
	name: (data) => `${data.firstName} ${data.lastName}`,
	birthdate: (data) => data.birthdate,
	age: (data) => differenceInYears(new Date(), data.birthdate),
}

console.log(mapper.map(user, config))
```

Which will output (depending on the current date):

```json
{
	"name": "John Doe",
	"birthdate": "1990-01-01T00:00:00.000Z",
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
	tags: { value: (data) => data.tags, apply: (r) => r.toUpperCase() },
	is: { value: (data) => data.status, options: { structure: mapper.Flatten } },
	is_not: {
		value: (data) => data.status,
		apply: (r) => !r,
		options: { structure: mapper.Flatten },
	},
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

Both the [`apply`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/map.ts#L3) and [`options.structure`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/map.ts#L3) functions receive the following arguments on each iteration:

- `rowValue`: the value of the current row (e.g. `cool`)
- `parentKey`: the key of the parent holding the iterable value (e.g. `tags`)
- `rowKey`: the key of the current row (normally the array-index or object property name, e.g. `0` or `private`, but if you supply a `structure` function it will be the result of that function)

### Options

The [`options`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/map.ts#L4) object can contain the following properties:

- `structure`: an optional function that will be called for each key in the object or array. The function should return the key that will be used in the output object. If this function is not provided, the original key will be used.
- `init`: an optional function that sets an explicit initial value for the property.

#### Structure functions

Two functions for manipulating structure are provided out of the box:

- [`mapper.Flatten`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/functions.ts#L2): flattens the keys of the object or array. This is useful when you want to flatten nested objects or arrays. Uses an underscore as a separator.
- [`mapper.Keep`](https://github.com/Four-Lights-NL/mapper/blob/main/src/lib/functions.ts#L7): keeps the current structure intact (default)

## Plugins

The package also provides a plugin system that allows you to re-use mapper configuration logic. You can create your own plugins by implementing the `MapperPlugin` interface.

Example usage:

```typescript
import {
	ChangeCasingPlugin,
	type ChangeCasingPluginOptions,
	type ChangeCasingPluginPropertyOptions,
} from '@fourlights/mapper/plugins/changeCasing'

const user = { firstName: 'John', lastName: 'Doe', birthdate: new Date(1990, 1, 1) }
const config: MapperConfig<typeof user> = {
	name: (data) => `${data.firstName} ${data.lastName}`,
	birthdate: (data) => data.birthdate,
	age: (data) => differenceInYears(new Date(), data.birthdate),
}

console.log(mapper.map(user, config, { plugins: [new ChangeCasingPlugin({ casing: 'upper' })] }))

// or alternatively you can set the plugin options per property
const alternativeconfig: MapperConfig<typeof user, ChangeCasingPluginPropertyOptions> = {
	name: {
		value: (data) => `${data.firstName} ${data.lastName}`,
		options: { casing: 'upper' },
	},
	birthdate: (data) => data.birthdate,
	age: (data) => differenceInYears(new Date(), data.birthdate),
}

console.log(mapper.map(user, alternativeconfig, { plugins: [new ChangeCasingPlugin()] }))
```

Which will output:

```json5
{
	name: 'JOHN DOE',
	birthdate: '1990-01-01T00:00:00.000Z',
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
