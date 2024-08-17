import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { createNew } from "../services/anecdotes";

export const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createAnecdoteHandler = async (event) => {
        event.preventDefault();
        const content = event.target.note.value;
        const response = await createNew(content);
        dispatch(createAnecdote(response));
        dispatch(setNotification(`You created '${content}'`));
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