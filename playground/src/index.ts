import { createRandomUser } from './utils/createRandomUser'
import * as mapper from '@fourlights/mapper'
import { calculateAge } from './utils/calculateAge'

// User
const user = createRandomUser()
const userMapConfig: mapper.MapperConfig<typeof user> = {
	name: (data) => `${data.firstName} ${data.lastName}`,
	birthdate: (data) => data.birthdate,
	age: (data) => calculateAge(data.birthdate),
}
console.log(mapper.map(user, userMapConfig))

// Page
const page = { status: { private: true, archived: true }, tags: ['cool', 'example'] }
const pageConfig: mapper.MapperConfig<typeof page> = {
	tags: { value: (data) => data.tags, apply: (r) => r.toUpperCase() },
	is: { value: (data) => data.status, options: { structure: mapper.Flatten } },
	is_not: {
		value: (data) => data.status,
		apply: (r) => !r,
		options: { structure: mapper.Flatten },
	},
}
console.log(mapper.map(page, pageConfig))
