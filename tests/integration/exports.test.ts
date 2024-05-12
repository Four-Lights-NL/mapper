import { utils } from '@fourlights/mapper'

describe('Mapper', () => {
	it('should export utils', () => {
		const user = { firstName: 'John', lastName: 'Doe', birthdate: new Date(1999, 5, 1) }
		expect(utils.isPlainObject(user)).toBe(true)
	})
})
