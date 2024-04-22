export function isPlainObject(target: unknown) {
	return typeof target === 'object' && Object.prototype.toString.call(target) === '[object Object]'
}
