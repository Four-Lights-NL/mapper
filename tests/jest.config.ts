import type { Config } from 'jest'

const tsJestConfig = {} as Record<string, any>

// Speedup tests, with disable type checking
if (process.env.TEST_FAST) {
	const RED_COLOR = '\x1b[31m'
	console.warn(RED_COLOR, 'Running FAST tests without type checking\n\n')
	tsJestConfig.isolatedModules = true
}

const config: Config = {
	testEnvironment: 'node',
	preset: 'ts-jest/presets/js-with-ts-esm',
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { useESM: true, ...tsJestConfig }],
	},
}

export default config
