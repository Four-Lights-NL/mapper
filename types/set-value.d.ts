declare module 'set-value' {
	type Options = {
		merge: boolean | ((a: any, b: any) => any)
		preservePaths: boolean
		separator: string
		split: (key: string) => string[]
	}
	function set(
		obj: object,
		path: string | symbol | string[] | symbol[],
		value: any,
		options?: Partial<Options>,
	): void
	export = set
}
