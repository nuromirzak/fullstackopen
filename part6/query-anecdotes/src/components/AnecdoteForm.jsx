import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from "react"
import { NotificationContext } from "../NotificationContext"

const AnecdoteForm = () => {
  const { pushNotification } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const createAnecdote = useMutation({
    mutationFn: async (anecdote) => {
      const response = await axios.post('http://localhost:3001/anecdotes', anecdote)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      pushNotification('Anecdote created successfully')
    },
    onError: (error) => {
      let message = 'Failed to create anecdote'
      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error
      }
      pushNotification(message)
    }
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
