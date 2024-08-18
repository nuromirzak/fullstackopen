import { useDispatch } from "react-redux";
import { createAnecdoteAction } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createAnecdoteHandler = async (event) => {
        event.preventDefault();
        const content = event.target.note.value;
        dispatch(createAnecdoteAction(content));
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