import { differenceInYears } from 'date-fns'

const calculateAge = (birthdate: Date): number => {
	const today = new Date()
	return differenceInYears(today, birthdate)
}

export default calculateAge
