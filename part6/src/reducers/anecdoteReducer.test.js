import { describe, expect, test } from 'vitest'
import reducer, { createAnecdote } from './anecdoteReducer'

describe('anecdote reducer', () => {
  test('adds the fulfilled anecdote', () => {
    const anecdote = { id: 'x', content: 'Tests make refactoring safer', votes: 0 }
    expect(reducer([], { type: createAnecdote.fulfilled.type, payload: anecdote })).toEqual([anecdote])
  })
})
