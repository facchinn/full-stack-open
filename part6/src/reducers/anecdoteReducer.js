import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as service from '../services/anecdotes'

export const initializeAnecdotes = createAsyncThunk('anecdotes/initialize', service.getAll)
export const createAnecdote = createAsyncThunk('anecdotes/create', service.create)
export const voteAnecdote = createAsyncThunk('anecdotes/vote', service.vote)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(initializeAnecdotes.fulfilled, (_state, action) => action.payload)
    .addCase(createAnecdote.fulfilled, (state, action) => { state.push(action.payload) })
    .addCase(voteAnecdote.fulfilled, (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index >= 0) state[index] = action.payload
    }),
})

export default anecdoteSlice.reducer
