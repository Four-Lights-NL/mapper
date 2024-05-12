import { map, type MapperConfig } from '@fourlights/mapper'

describe('Mapper', () => {
	it('should map data', () => {
		const user = { firstName: 'John', lastName: 'Doe', birthdate: new Date(1999, 5, 1) }
		const config = {
			name: (data) => `${data.firstName} ${data.lastName}`,
			birthdate: (data) => data.birthdate,
		} as MapperConfig<typeof user>

		expect(map(user, config)).toStrictEqual({ name: 'John Doe', birthdate: new Date(1999, 5, 1) })
	})
})
