import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for the state and action payloads
interface Book {
  id: string;
  title: string;
  author: string;
  // Add other properties as needed (e.g., description, imageLinks, etc.)
}

interface BookState {
  favorites: Book[];
}

const initialState: BookState = {
  favorites: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      // Check if the book already exists in favorites by ID (for better performance)
      if (!state.favorites.some((book) => book.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<Book>) => {
      state.favorites = state.favorites.filter((book) => book.id !== action.payload.id);
    },
  },
});

export const { addFavorite, removeFavorite } = bookSlice.actions;
export default bookSlice.reducer;
