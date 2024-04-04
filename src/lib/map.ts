import set from 'set-value'

export type MapperFn<T> = (data: T, key?: string, rowId?: string | number) => any
export type MapperPropertyOptions = {
	keys?: MapperFn<any>
	initialValue?: MapperFn<any>
}
export type MapperProperty<T> = {
	value: MapperFn<T>
	row?: MapperFn<any>
	options?: MapperPropertyOptions
}
export type MapperConfig<T> = {
	[key: string]: MapperProperty<T>
}

const map = <T>(data: T, config: MapperConfig<T>) => {
	const mapped: Record<keyof typeof config, any> = {}

	for (const key in config) {
		const property = config[key]
		if (!property) continue
		const value = property.value(data)

		if (property.options?.initialValue) {
			mapped[key] = property.options.initialValue
		}

		const customKeys = property.options?.keys
		if (customKeys) {
			const props = typeof value === 'object' ? Object.keys(value) : value
			for (let i = 0; i < props.length; i += 1) {
				const rowId = typeof value === 'object' ? props[i] : i
				const rowKey = customKeys(value[rowId], key, rowId)
				const rowValue = property.row ? property.row(value[rowId], key, rowKey) : value[rowId]
				set(mapped, rowKey, rowValue, { merge: true })
			}
		} else {
			let mappedValue = value
			if (property.row) {
				const { row } = property

				if (Array.isArray(value)) {
					mappedValue = value.map((v, i) => row(v, key, i))
				} else if (typeof value === 'object') {
					const props = Object.entries(value)
					mappedValue = Object.fromEntries(props.map(([k, v]) => [k, row(v, key, k)]))
				}
			}
			set(mapped, key, mappedValue, { merge: true })
		}
	}
	return mapped
}

export default map
