import type { MapperFn, MapperProperty } from '../types'

const wrapProperty = <T, U = {}>(property: MapperProperty<T, U> | MapperFn<T>) => {
	return typeof property === 'function' ? { value: property } : property
}

export default wrapProperty
