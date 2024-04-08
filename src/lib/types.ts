import type { MapperPlugin } from './plugins'

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
	[key: string]: MapperProperty<T> | MapperFn<T>
}
export type MapperOptions = {
	plugins?: MapperPlugin[]
}
