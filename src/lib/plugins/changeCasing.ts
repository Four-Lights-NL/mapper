import type { MapperPlugin } from '../plugins'
import defu from 'defu'
import { MapperConfig, MapperOptions } from '../types'

export type ChangeCasingPluginOptions = {
	casing?: 'lower' | 'upper'
}
export type ChangeCasingPluginPropertyOptions = ChangeCasingPluginOptions // same options as the plugin itself, but per-property

class ChangeCasingPlugin implements MapperPlugin {
	private readonly _options: ChangeCasingPluginOptions = {}

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

			if (newCasing) {
				const originalValueFn = typeof property === 'function' ? property : property.value
				const casedValueFn = (data: T) =>
					newCasing === 'upper'
						? originalValueFn(data).toUpperCase()
						: originalValueFn(data).toLowerCase()
				config[key] =
					typeof property === 'object' ? { ...property, value: casedValueFn } : casedValueFn
			}
		}
		return config
	}
}

export default ChangeCasingPlugin
