import { utils } from '@fourlights/mapper'
import { isPlainObject } from '@fourlights/mapper/utils'

describe('Mapper', () => {
	it('should export utils', () => {
		const user = { firstName: 'John', lastName: 'Doe', birthdate: new Date(1999, 5, 1) }
		expect(utils.isPlainObject(user)).toBe(true)
	})

	it('should allow imports through the utils subpath`', () => {
		const user = { firstName: 'John', lastName: 'Doe', birthdate: new Date(1999, 5, 1) }
		expect(isPlainObject(user)).toBe(true)
	})
})
