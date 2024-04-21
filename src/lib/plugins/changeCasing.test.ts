import type { MapperConfig } from '../types'
import map from '../map'
import type { ChangeCasingPluginPropertyOptions } from './changeCasing'
import ChangeCasingPlugin from './changeCasing'

describe('Plugins', () => {
	it('should use the `ChangeCasingPlugin` when enabled', () => {
		const input = { a: 'hello', b: 'world!' }
		const expected = { a: 'HELLO', b: 'WORLD!' }

		const config = {
			a: {
				value: (data) => data.a,
			},
			b: (data) => data.b,
		} as MapperConfig<typeof input>

		expect(map(input, config, { plugins: [new ChangeCasingPlugin({ casing: 'upper' })] })).toEqual(
			expected,
		)
	})

	it('should use the `ChangeCasingPlugin` on configured properties', () => {
		const input = { a: 'hello', b: 'PLUGable', c: 'world!' }
		const expected = { a: 'HELLO', b: 'PLUGable', c: 'WORLD!' }

		const config = {
			a: {
				value: (data) => data.a,
				options: { casing: 'upper' } as ChangeCasingPluginPropertyOptions,
			},
			b: {
				value: (data) => data.b,
				options: { casing: 'keep' } as ChangeCasingPluginPropertyOptions,
			},
			c: {
				value: (data) => data.c,
				options: { casing: 'upper' } as ChangeCasingPluginPropertyOptions,
			},
		} as MapperConfig<typeof input>

		expect(map(input, config, { plugins: [new ChangeCasingPlugin()] })).toEqual(expected)
	})
})
