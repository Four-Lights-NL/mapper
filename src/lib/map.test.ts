import map from './map'
import { Flatten } from './functions'
import type { MapperConfig } from './types'
import { name as packageName } from '#package.json'

describe(packageName, () => {
	it('should map data', () => {
		const input = { a: 10, b: 20, c: [2, 3, 4], d: { e: 2, f: 3, g: 4 } }

		const config: MapperConfig<typeof input> = {
			stringA: { value: (data) => `${data.a}` },
			b: (data) => data.b,
			sumAB: (data) => data.a + data.b,
			c: (data) => data.c,
			c_squared: {
				value: (data) => data.c,
				row: (row: number) => row * row,
			},
			flattenedC: {
				value: (data) => data.c,
				row: (row: number) => row,
				options: { keys: Flatten },
			},
			totalC: { value: (data) => data.c.reduce((s, c) => s + c) },
			d: { value: (data) => data.d, row: (row: number) => row, options: { keys: Flatten } },
			d_squared_flat: {
				value: (data) => data.d,
				row: (row: number) => row * row,
				options: { keys: Flatten },
			},
			d_squared: {
				value: (data) => data.d,
				row: (row: number) => row * row,
			},
		}

		const expected = {
			stringA: '10',
			b: 20,
			c: [2, 3, 4],
			c_squared: [4, 9, 16],
			flattenedC_0: 2,
			flattenedC_1: 3,
			flattenedC_2: 4,
			totalC: 9,
			sumAB: 30,
			d_e: 2,
			d_f: 3,
			d_g: 4,
			d_squared_flat_e: 4,
			d_squared_flat_f: 9,
			d_squared_flat_g: 16,
			d_squared: { e: 4, f: 9, g: 16 },
		}

		expect(map(input, config)).toEqual(expected)
	})
})
