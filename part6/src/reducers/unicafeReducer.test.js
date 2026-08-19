import { describe, expect, test } from 'vitest'
import reducer, { initialState } from './unicafeReducer'
describe('unicafe reducer', () => {
  test('counts feedback and resets', () => {
    const voted = reducer(reducer(initialState, { type: 'GOOD' }), { type: 'BAD' })
    expect(voted).toEqual({ good: 1, ok: 0, bad: 1 })
    expect(reducer(voted, { type: 'ZERO' })).toEqual(initialState)
  })
})
