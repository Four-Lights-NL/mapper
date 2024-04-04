import type { MapperFn } from './map'
const Flatten: MapperFn<any> = <T>(
	data: T,
	key?: string,
	rowId?: string | number | undefined,
): string => `${key}_${rowId}`
const Objectify: MapperFn<any> = <T>(
	data: T,
	key?: string,
	rowId?: string | number | undefined,
): string => `${key}.${rowId}`

export { Flatten, Objectify }
