import { differenceInYears } from 'date-fns'

export function calculateAge(birthdate: Date): number {
	const today = new Date()
	return differenceInYears(today, birthdate)
}
