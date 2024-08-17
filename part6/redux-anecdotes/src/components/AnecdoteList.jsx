import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Anecdote } from "./Anecdote";

export const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(anecdote => anecdote.content.includes(filter));
    });
    const dispatch = useDispatch();

    const voteHandler = (id) => {
        dispatch(vote(id));
        dispatch(setNotification(`You created '${event.target.note.value}'`));
        setTimeout(() => {
            dispatch(setNotification(""));
        }, 2500);
    };

    const sortAnecdotes = (anecdotes) => {
        return anecdotes.sort((a, b) => b.votes - a.votes);
    };

    return (
        sortAnecdotes(anecdotes).map((anecdote) => (
            <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => voteHandler(anecdote.id)} />
        ))
    );
}
