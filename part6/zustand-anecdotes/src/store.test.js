import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import anecdoteService from './services/anecdotes'
import useAnecdoteStore, {
  useAnecdoteActions,
  useAnecdotes
} from './store'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

const anecdotes = [
  { id: 1, content: 'first anecdote', votes: 2 },
  { id: 2, content: 'second anecdote', votes: 7 },
  { id: 3, content: 'another story', votes: 4 }
]

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('anecdote store', () => {
  test('initializes state with anecdotes returned by backend', async () => {
    anecdoteService.getAll.mockResolvedValue(anecdotes)
    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    expect(useAnecdoteStore.getState().anecdotes).toEqual(anecdotes)
  })

  test('returns anecdotes sorted by votes', () => {
    useAnecdoteStore.setState({ anecdotes, filter: '' })
    const { result } = renderHook(() => useAnecdotes())

    expect(result.current.map(anecdote => anecdote.id)).toEqual([2, 3, 1])
  })

  test('returns anecdotes filtered by content', () => {
    useAnecdoteStore.setState({ anecdotes, filter: 'anecdote' })
    const { result } = renderHook(() => useAnecdotes())

    expect(result.current.map(anecdote => anecdote.id)).toEqual([2, 1])
  })

  test('voting increases the anecdote vote count', async () => {
    const anecdote = anecdotes[0]
    useAnecdoteStore.setState({ anecdotes: [anecdote], filter: '' })
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: 3 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(anecdote)
    })

    expect(useAnecdoteStore.getState().anecdotes[0].votes).toBe(3)
  })
})
