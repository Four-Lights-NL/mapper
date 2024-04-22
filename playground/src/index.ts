import { createRandomUser } from './utils/createRandomUser'
import mapper, { type MapperConfig } from '@fourlights/mapper'
import { calculateAge } from './utils/calculateAge'

// User
const user = createRandomUser()
const userMapConfig: MapperConfig<typeof user> = {
	name: (data) => `${data.firstName} ${data.lastName}`,
	birthday: (data) => data.birthday,
	age: (data) => calculateAge(data.birthday),
}
console.log(mapper.map(user, userMapConfig))

// Page
const page = { status: { private: true, archived: true }, tags: ['cool', 'example'] }
const pageConfig: MapperConfig<typeof page> = {
	tags: { value: (data) => data.tags, apply: (r) => r.toUpperCase() },
	is: { value: (data) => data.status, options: { structure: mapper.Flatten } },
	is_not: {
		value: (data) => data.status,
		apply: (r) => !r,
		options: { structure: mapper.Flatten },
	},
}
console.log(mapper.map(page, pageConfig))
