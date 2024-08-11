import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createAnecdoteHandler = (event) => {
        event.preventDefault();
        dispatch(createAnecdote(event.target.note.value));
        event.target.note.value = "";
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdoteHandler}>
                <div>
                    <input name="note" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
}