import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, useEffect } from "react"
import { NotificationContext } from "./NotificationContext"

const App = () => {
  const { pushNotification } = useContext(NotificationContext)
  const queryClient = useQueryClient();

  const {
    data: anecdotes,
    isLoading,
    error
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3001/anecdotes')
      return response.data
    }
  });

  const updateAnecdote = useMutation({
    mutationFn: async (anecdote) => {
      const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      pushNotification('Anecdote updated successfully')
    },
  });

  useEffect(() => {
    pushNotification('Welcome to the anecdote app')
  }, [pushNotification]);

  const handleVote = (anecdote) => {
    updateAnecdote.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
