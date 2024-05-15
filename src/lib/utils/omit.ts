export function omit<T extends object, K extends keyof T>(obj: T, fields: K | K[]): Omit<T, K> {
	if (!Array.isArray(fields)) fields = [fields]

	const keys = Object.keys(obj) as K[]
	const result: Partial<T> = {}
	keys.forEach((key) => {
		if (!(fields as K[]).includes(key)) {
			result[key] = obj[key]
		}
	})
	return result as T
}
