import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from './books/books.slice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  devTools: true,
});
