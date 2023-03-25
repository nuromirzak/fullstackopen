import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote_text.value;
    event.target.anecdote_text.value = "";
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
    dispatch(setNotification(`You created '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 2500);
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
