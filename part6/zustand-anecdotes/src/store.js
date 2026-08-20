import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes })
    },
    add: async content => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
      return newAnecdote
    },
    vote: async anecdote => {
      const updatedAnecdote = await anecdoteService.update({
        ...anecdote,
        votes: anecdote.votes + 1
      })

      set(state => ({
        anecdotes: state.anecdotes.map(item =>
          item.id === updatedAnecdote.id ? updatedAnecdote : item
        )
      }))

      return updatedAnecdote
    },
    remove: async id => {
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
    },
    setFilter: filter => set({ filter })
  }
}))

let notificationTimer

const useNotificationStore = create(set => ({
  notification: '',
  actions: {
    notify: (message, seconds = 5) => {
      clearTimeout(notificationTimer)
      set({ notification: message })
      notificationTimer = setTimeout(() => {
        set({ notification: '' })
      }, seconds * 1000)
    }
  }
}))

export const useAnecdotes = () => useAnecdoteStore(state => state.anecdotes)
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)
export const useNotification = () => useNotificationStore(state => state.notification)
export const useNotificationActions = () => useNotificationStore(state => state.actions)

export default useAnecdoteStore
