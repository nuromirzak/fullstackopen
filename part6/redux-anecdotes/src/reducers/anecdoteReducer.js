import { createSlice } from "@reduxjs/toolkit";

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

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export const anecdotesReducer = anecdoteSlice.reducer;
