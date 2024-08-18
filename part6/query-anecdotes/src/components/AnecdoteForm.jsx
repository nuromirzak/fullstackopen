import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdote = useMutation({
    mutationFn: async (anecdote) => {
      const response = await axios.post('http://localhost:3001/anecdotes', anecdote)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
