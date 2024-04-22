import set from 'set-value'
import type { MapperConfig, MapperOptions } from './types'
import { wrapProperty } from './utils/wrapProperty'
import * as structure from './structure'
import { isPlainObject } from './utils/isPlainObject'

export function map<T>(data: T, config: MapperConfig<T>, options?: MapperOptions) {
	const mapped: Record<keyof typeof config, any> = {}

	if (options?.plugins) {
		options.plugins.forEach((plugin) => {
			config = plugin.config(config, options)
		})
	}

	for (const key in config) {
		const property = wrapProperty(config[key])
		if (!property) continue

		if (property.options?.init) {
			mapped[key] = property.options.init(data, key)
		}

		const value = property.value(data)
		if (Array.isArray(value) || isPlainObject(value)) {
			const innerKeys = typeof value === 'object' ? Object.keys(value) : value
			const structureFn = property.options?.structure ?? structure.Keep
			for (let i = 0; i < innerKeys.length; i += 1) {
				const innerKey = typeof value === 'object' ? innerKeys[i] : i
				const innerValue = value[innerKey]

				const targetKey = structureFn(innerValue, key, innerKey)
				const mappedValue = property.apply ? property.apply(innerValue, key, targetKey) : innerValue

				set(mapped, targetKey, mappedValue, { merge: true })
			}
		} else {
			set(mapped, key, value)
		}
	}
	return mapped
}
