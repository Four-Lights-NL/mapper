export type MapperFn<T> = (data: T, outerKey?: string, innerKey?: string | number) => any
export type MapperPropertyOptions = {
	structure?: MapperFn<any>
	init?: MapperFn<any>
}
export type MapperProperty<T, U = {}> = {
	value: MapperFn<T>
	apply?: MapperFn<any>
	options?: MapperPropertyOptions & U
}
export type MapperConfig<T, U = {}> = {
	[key: string | symbol]: MapperProperty<T, U> | MapperFn<T>
}
export type MapperPlugin = {
	config: <T>(config: MapperConfig<T>, options?: MapperOptions) => MapperConfig<T>
}
export type MapperOptions = {
	plugins?: MapperPlugin[]
}
