import createRandomUser from './utils/createRandomUser'
import mapper, { MapperConfig } from '@fourlights/mapper'
import calculateAge from './utils/calculateAge'

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
	tags: { value: (data) => data.tags, row: (r) => r.toUpperCase() },
	is: { value: (data) => data.status, options: { keys: mapper.Flatten } },
	is_not: { value: (data) => data.status, row: (r) => !r, options: { keys: mapper.Flatten } },
}
console.log(mapper.map(page, pageConfig))
