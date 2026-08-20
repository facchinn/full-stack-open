import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createAnecdote,
  getAnecdotes,
  updateAnecdote
} from '../requests'
import { useNotify } from '../NotificationContext'

const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      queryClient.setQueryData(['anecdotes'], old =>
        (old || []).concat(newAnecdote)
      )
      notify(`you added '${newAnecdote.content}'`)
    },
    onError: error => {
      notify(error.message)
    }
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      queryClient.setQueryData(['anecdotes'], old =>
        (old || []).map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )
      notify(`you voted '${updatedAnecdote.content}'`)
    }
  })

  return {
    anecdotes: query.data
      ? query.data.toSorted((a, b) => b.votes - a.votes)
      : [],
    isPending: query.isPending,
    isError: query.isError,
    addAnecdote: content => createMutation.mutate(content),
    voteAnecdote: anecdote => voteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }
}

export default useAnecdotes
