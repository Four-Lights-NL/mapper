import type { MapperConfig } from './types'
import { Flatten, Keep } from './structure'
import map from './map'

describe('Keys', () => {
	describe('Flatten', () => {
		it('should flatten an array of numbers', () => {
			const input = { a: 2, b: 3, c: [2, 3, 4] }

			const config: MapperConfig<typeof input> = {
				flattenedC: {
					value: (data) => data.c,
					apply: (row: number) => row,
					options: { structure: Flatten },
				},
			}

			const expected = {
				flattenedC_0: 2,
				flattenedC_1: 3,
				flattenedC_2: 4,
			}

			expect(map(input, config)).toEqual(expected)
		})
	})

	describe('Keep', () => {
		// NOTE: This is currently broken in set-value, see https://github.com/jonschlinkert/set-value/issues/35
		xit('should map an array of numbers to an object', () => {
			const input = { a: 2, b: 3, c: [2, 3, 4] }

			const config: MapperConfig<typeof input> = {
				objectC: {
					value: (data) => data.c,
					apply: (row: number) => row * row,
					options: {
						structure: Keep,
						init: () => {},
					},
				},
			}

			const expected = {
				objectC: { 2: 4, 3: 9, 4: 16 },
			}

			expect(map(input, config)).toEqual(expected)
		})

		it('should map an array of numbers to an array as elements', () => {
			const input = { a: 2, b: 3, c: [2, 3, 4] }

			const config: MapperConfig<typeof input> = {
				objectC: {
					value: (data) => data.c,
					apply: (row: number) => row * row,
					options: {
						structure: Keep,
						init: () => [],
					},
				},
			}

			const expected = {
				objectC: [4, 9, 16],
			}

			expect(map(input, config)).toEqual(expected)
		})
	})
})
