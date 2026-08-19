import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { create, getAll, vote } from '../services/anecdotes'
import { useNotification } from '../context/NotificationContext'
import { AnecdoteView } from './ReduxAnecdotes'

export default function QueryAnecdotes() {
  const [filter, setFilter] = useState('')
  const queryClient = useQueryClient()
  const { notification, notify } = useNotification()
  const result = useQuery({ queryKey: ['anecdotes'], queryFn: getAll, retry: 1 })
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  const createMutation = useMutation({ mutationFn: create, onSuccess: (item) => { refresh(); notify(`You added “${item.content}”`) } })
  const voteMutation = useMutation({ mutationFn: vote, onSuccess: (item) => { queryClient.setQueryData(['anecdotes'], (old) => old.map((entry) => entry.id === item.id ? item : entry)); notify(`You voted for “${item.content}”`) } })

  const submit = (event) => { event.preventDefault(); const content = event.target.anecdote.value.trim(); if (content.length >= 5) createMutation.mutate(content); event.target.reset() }
  const anecdotes = (result.data || []).filter((item) => item.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)

  return <AnecdoteView title="TanStack Query + Context" notification={notification} error={result.isError ? 'Anecdote service is unavailable' : ''} anecdotes={anecdotes} onVote={(item) => voteMutation.mutate(item)} onCreate={submit} filter={filter} onFilter={setFilter} />
}
