import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createAnecdoteHandler = (event) => {
        event.preventDefault();
        dispatch(createAnecdote(event.target.note.value));
        dispatch(setNotification(`You created '${event.target.note.value}'`));
        setTimeout(() => {
            dispatch(setNotification(""));
        }, 2500);
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