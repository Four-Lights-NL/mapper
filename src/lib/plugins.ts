import type { MapperConfig, MapperOptions } from './map'

export type PluginOptions<Plugins extends keyof typeof PluginOptionsMap = never> =
	(typeof PluginOptionsMap)[Plugins]

export type Plugin = {
	config: <T, Plugins extends keyof typeof PluginOptionsMap = never>(
		config: MapperConfig<T, Plugins>,
		options?: MapperOptions & PluginOptions<Plugins>,
	) => MapperConfig<T, Plugins>
}
// Global registry for plugins
export const PluginOptionsMap: Record<string, any> = {}

const registerPlugin = <Name extends string, Options>(name: Name, options: Options) => {
	PluginOptionsMap[name] = options
}

export default registerPlugin
