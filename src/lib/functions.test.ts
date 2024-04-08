import { name as packageName } from '#package.json'
import type { MapperConfig } from './types'
import { Flatten, Objectify } from './functions'
import map from './map'

describe(packageName, () => {
	describe('Functions', () => {
		describe('Flatten', () => {
			it('should flatten an array of numbers', () => {
				const input = { a: 2, b: 3, c: [2, 3, 4] }

				const config: MapperConfig<typeof input> = {
					flattenedC: {
						value: (data) => data.c,
						row: (row: number) => row,
						options: { keys: Flatten },
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

		describe('Objectify', () => {
			// NOTE: This is currently broken in set-value, see https://github.com/jonschlinkert/set-value/issues/35
			xit('should map an array of numbers to an object', () => {
				const input = { a: 2, b: 3, c: [2, 3, 4] }

				const config: MapperConfig<typeof input> = {
					objectC: {
						value: (data) => data.c,
						row: (row: number) => row * row,
						options: {
							keys: Objectify,
							initialValue: () => {},
						},
					},
				}

				const expected = {
					objectC: { 2: 4, 3: 9, 4: 16 },
				}

				expect(map(input, config)).toEqual(expected)
			})

			// NOTE: Brittle test around broken set-value functionality
			it('should map an array of numbers to an array, regardless of key function', () => {
				const input = { a: 2, b: 3, c: [2, 3, 4] }

				const config: MapperConfig<typeof input> = {
					objectC: {
						value: (data) => data.c,
						row: (row: number) => row * row,
						options: {
							keys: Objectify,
							initialValue: () => {},
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
})
