export type MapperFn<T> = (data: T, outerKey?: string, innerKey?: string | number) => any
export type MapperPropertyOptions = {
	structure?: MapperFn<any>
	init?: MapperFn<any>
}
export type MapperProperty<TData, TOptions extends {} = {}> = {
	value: MapperFn<TData>
	apply?: MapperFn<any>
	options?: MapperPropertyOptions & TOptions
}
export type MapperConfig<TData, TOptions extends {} = {}> = {
	[key: string | symbol]: MapperProperty<TData, TOptions> | MapperFn<TData>
}
export type MapperPlugin = {
	config: <TData, TOptions extends {} = {}>(
		config: MapperConfig<TData, TOptions>,
		options?: MapperOptions,
	) => MapperConfig<TData>
}
export type MapperOptions = {
	plugins?: MapperPlugin[]
}
