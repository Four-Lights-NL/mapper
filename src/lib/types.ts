import type { MapperPlugin } from './plugins'

export type MapperFn<T> = (data: T, key?: string, rowId?: string | number) => any
export type MapperPropertyOptions = {
	keys?: MapperFn<any>
	initialValue?: MapperFn<any>
}
export type MapperProperty<T, U = {}> = {
	value: MapperFn<T>
	row?: MapperFn<any>
	options?: MapperPropertyOptions & U
}
export type MapperConfig<T, U = {}> = {
	[key: string]: MapperProperty<T, U> | MapperFn<T>
}
export type MapperOptions = {
	plugins?: MapperPlugin[]
}
