export function Flatten<T>(
	_: T,
	outerKey?: string | symbol,
	innerKey?: string | number | symbol,
): string {
	return `${outerKey?.toString()}_${innerKey?.toString()}`
}

export function Keep<T>(
	_: T,
	outerKey?: string | symbol,
	innerKey?: string | number | symbol,
): string {
	return `${outerKey?.toString()}.${innerKey?.toString()}`
}
