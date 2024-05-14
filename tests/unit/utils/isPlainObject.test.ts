import { isPlainObject } from '@fourlights/mapper/utils'

describe('isPlainObject', () => {
	it('should return true for plain objects', () => {
		const input = { test: true }
		expect(isPlainObject(input)).toBeTruthy()
	})

	it('should return false for non-plain objects', () => {
		const date = new Date()
		const arr = [1, 2, 3, 4]
		expect(isPlainObject(date)).toBeFalsy()
		expect(isPlainObject(arr)).toBeFalsy()
	})
})
