import { createSlice } from "@reduxjs/toolkit";
import { getAll, createNew, update } from "../services/anecdotes";
import { setNotificationAction } from "./notificationReducer";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      console.log("vote action", action);
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      if (!anecdoteToChange) {
        console.warn(`Anecdote with id ${id} not found`);
        return;
      }
      anecdoteToChange.votes += 1;
    },
    createAnecdote(state, action) {
      console.log("createAnecdote action", action);
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      console.log("setAnecdotes action", action);
      return action.payload;
    },
  },
});

const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export const anecdotesReducer = anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(vote(updatedAnecdote.id));
    dispatch(
      setNotificationAction(`You voted for '${updatedAnecdote.content}'`)
    );
  };
};

export const createAnecdoteAction = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotificationAction(`You created '${content}'`));
  };
};
