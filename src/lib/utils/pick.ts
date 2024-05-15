export function pick<T extends object, K extends keyof T>(obj: T, fields: K | K[]): Pick<T, K> {
	if (!Array.isArray(fields)) fields = [fields]

	const result: Partial<T> = {}
	fields.forEach((key) => {
		if (key in obj) {
			result[key] = obj[key]
		}
	})
	return result as T
}
