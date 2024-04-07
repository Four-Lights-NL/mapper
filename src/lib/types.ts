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
