import set from 'set-value'
import type { Plugin, PluginOptions, PluginOptionsMap } from './plugins'

export type MapperFn<T> = (data: T, key?: string, rowId?: string | number) => any
export type MapperPropertyOptions = {
	keys?: MapperFn<any>
	initialValue?: MapperFn<any>
}
export type MapperProperty<T, Plugins extends keyof typeof PluginOptionsMap = never> = {
	value: MapperFn<T>
	row?: MapperFn<any>
	options?: MapperPropertyOptions & PluginOptions<Plugins>
}
export type MapperConfig<T, Plugins extends keyof typeof PluginOptionsMap = never> = {
	[key: string]: MapperProperty<T, Plugins> | MapperFn<T>
}
export type MapperOptions = {
	plugins?: Plugin[]
}

const map = <T, Plugins extends keyof typeof PluginOptionsMap = never>(
	data: T,
	config: MapperConfig<T, Plugins>,
	options?: MapperOptions,
) => {
	const mapped: Record<keyof typeof config, any> = {}

	if (options?.plugins) {
		options.plugins.forEach((plugin) => {
			config = plugin.config(config, options)
		})
	}

	for (const key in config) {
		const property = (
			typeof config[key] === 'function' ? { value: config[key] } : config[key]
		) as MapperProperty<T, Plugins>
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
