import { omit } from '@fourlights/mapper/utils'

describe('Omit', () => {
	it('should return non omitted fields when supplied with a single field', () => {
		const input = { include: 'hello', exclude: 'world' }
		expect(omit(input, 'exclude')).toStrictEqual({
			include: 'hello',
		})
	})

	it('should return non omitted fields when supplied with multiple fields', () => {
		const input = { include: 'hello', exclude: 'world', one: true, two: false }
		expect(omit(input, ['exclude', 'one'])).toStrictEqual({
			include: 'hello',
			two: false,
		})
	})
})
