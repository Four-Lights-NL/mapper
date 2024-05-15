import { pick } from '@fourlights/mapper/utils'

describe('Pick', () => {
	it('should return single picked field', () => {
		const input = { include: 'hello', exclude: 'world' }
		expect(pick(input, 'include')).toStrictEqual({
			include: 'hello',
		})
	})

	it('should return multiple picked fields', () => {
		const input = { include: 'hello', exclude: 'world', extra: 'there' }
		expect(pick(input, ['include', 'extra'])).toStrictEqual({
			include: 'hello',
			extra: 'there',
		})
	})
})
