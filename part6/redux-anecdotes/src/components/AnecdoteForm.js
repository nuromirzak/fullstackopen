import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { flashNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote_text.value;
    event.target.anecdote_text.value = "";
    dispatch(createAnecdote(content));
    dispatch(flashNotification(`You created '${content}'`, 2500));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote_text" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
