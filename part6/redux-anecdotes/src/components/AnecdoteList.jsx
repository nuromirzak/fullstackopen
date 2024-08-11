import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { Anecdote } from "./Anecdote";

export const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state);
    const dispatch = useDispatch();

    const voteHandler = (id) => {
        dispatch(vote(id));
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
