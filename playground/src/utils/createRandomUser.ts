import type { User } from '../user'
import { faker } from '@faker-js/faker'

export function createRandomUser(): User {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()
	const email = faker.internet.email()

	return {
		_id: faker.string.uuid(),
		avatar: faker.image.avatar(),
		birthday: faker.date.birthdate(),
		email,
		firstName,
		lastName,
	}
}
