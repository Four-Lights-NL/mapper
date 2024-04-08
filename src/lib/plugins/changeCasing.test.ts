import { name as packageName } from '#package.json'
import type { MapperConfig } from '../types'
import map from '../map'
import type { ChangeCasingPluginPropertyOptions } from './changeCasing'
import ChangeCasingPlugin from './changeCasing'

describe(packageName, () => {
	describe('Plugins', () => {
		it('should use the `ChangeCasingPlugin` when enabled', () => {
			const input = { a: 'hello', b: 'plugin-able', c: 'world' }
			const expected = { a: 'HELLO', b: 'PLUGIN-ABLE', c: 'WORLD' }

			const config = {
				a: {
					value: (data) => data.a,
				},
				b: (data) => data.b,
				c: {
					value: (data) => data.c,
				},
			} as MapperConfig<typeof input>

			expect(
				map(input, config, { plugins: [new ChangeCasingPlugin({ casing: 'upper' })] }),
			).toEqual(expected)
		})

		it('should use the `ChangeCasingPlugin` on configured properties', () => {
			const input = { a: 'hello', b: 'plugin-able', c: 'world' }
			const expected = { a: 'HELLO', b: 'plugin-able', c: 'WORLD' }

			const config = {
				a: {
					value: (data) => data.a,
					options: { upperCase: true } as ChangeCasingPluginPropertyOptions,
				},
				b: (data) => data.b,
				c: {
					value: (data) => data.c,
					options: { upperCase: true } as ChangeCasingPluginPropertyOptions,
				},
			} as MapperConfig<typeof input>

			expect(map(input, config, { plugins: [new ChangeCasingPlugin()] })).toEqual(expected)
		})
	})
})
