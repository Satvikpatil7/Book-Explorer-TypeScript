import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './BookSlice'; // Import the book reducer

// Configure the Redux store with reducers
const store = configureStore({
  reducer: {
    books: bookReducer, // "books" slice managed by bookReducer
  },
});

// Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
