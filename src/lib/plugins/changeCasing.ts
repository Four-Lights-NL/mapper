import type { MapperPlugin } from '../plugins'
import defu from 'defu'
import type { MapperConfig, MapperOptions } from '../types'

export type ChangeCasingPluginOptions = {
	casing: 'lower' | 'upper' | 'keep'
}
export type ChangeCasingPluginPropertyOptions = ChangeCasingPluginOptions // same options as the plugin itself, but per-property

class ChangeCasingPlugin implements MapperPlugin {
	private readonly _options: ChangeCasingPluginOptions = { casing: 'keep' }

	constructor(options?: ChangeCasingPluginOptions) {
		this._options = defu(options, this._options)
	}

	config<T>(config: MapperConfig<T>, options: MapperOptions | undefined): MapperConfig<T> {
		for (const key in config) {
			const property = config[key]

			const newCasing =
				typeof property === 'object'
					? (property.options as ChangeCasingPluginPropertyOptions)?.casing || this._options?.casing
					: this._options?.casing

			if (newCasing !== 'keep') {
				const originalValueFn = typeof property === 'function' ? property : property.value
				const casedValueFn = (data: T) => {
					const value = originalValueFn(data)
					if (typeof value !== 'string') return value
					return newCasing === 'upper' ? value.toUpperCase() : value.toLowerCase()
				}
				config[key] =
					typeof property === 'object' ? { ...property, value: casedValueFn } : casedValueFn
			}
		}
		return config
	}
}

export default ChangeCasingPlugin
