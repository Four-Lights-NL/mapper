import type { MapperConfig, MapperOptions } from './types'

export type MapperPlugin = {
	config: <T>(config: MapperConfig<T>, options?: MapperOptions) => MapperConfig<T>
}
