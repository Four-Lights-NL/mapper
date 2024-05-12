import type { MapperFn, MapperProperty } from '../types'

export function wrapProperty<T, U extends {} = {}>(property: MapperProperty<T, U> | MapperFn<T>) {
	return typeof property === 'function' ? { value: property } : property
}
