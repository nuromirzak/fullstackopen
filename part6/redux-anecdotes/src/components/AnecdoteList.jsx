import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { Anecdote } from "./Anecdote";

export const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(anecdote => anecdote.content.includes(filter));
    });
    const dispatch = useDispatch();

    const voteHandler = (id) => {
        dispatch(voteForAnecdote(anecdotes.find(a => a.id === id)));
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
