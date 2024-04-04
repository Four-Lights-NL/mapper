import createRandomUser from './utils/createRandomUser'
import mapper, { MapperConfig } from '@fourlights/mapper'
import type { User } from './user'
import calculateAge from './utils/calculateAge'

// User
const user = createRandomUser()
const userMapConfig: MapperConfig<User> = {
	name: {
		value: (data: User) => `${data.firstName} ${data.lastName}`,
	},
	birthday: { value: (data) => data.birthday },
	age: {
		value: (data) => calculateAge(data.birthday),
	},
}
console.log(mapper.map(user, userMapConfig))

// Page
const page = { status: { private: true, archived: true }, tags: ['cool', 'example'] }
const pageConfig: MapperConfig<typeof page> = {
	tags: { value: (data) => data.tags, row: (r) => r.toUpperCase() },
	is: { value: (data) => data.status, options: { keys: mapper.Flatten } },
	is_not: { value: (data) => data.status, row: (r) => !r, options: { keys: mapper.Flatten } },
}
console.log(mapper.map(page, pageConfig))
