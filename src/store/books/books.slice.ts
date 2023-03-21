import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BooksModel } from '../../models/books.model';

export type TCategoriesFilter =
  | 'all'
  | 'art'
  | 'biography'
  | 'computers'
  | 'history'
  | 'medical'
  | 'poetry';
export type TSortFilter = 'relevance' | 'newest';

interface BooksState {
  searchTerm: string;
  category: TCategoriesFilter;
  filter: TSortFilter;
  books: BooksModel[];
}

const initialState: BooksState = {
  searchTerm: '',
  category: 'all',
  filter: 'relevance',
  books: [],
};

export const booksSlice = createSlice({
  name: 'booksState',
  initialState,
  reducers: {
    setSearchTerm(state: BooksState, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCategory(state: BooksState, action: PayloadAction<TCategoriesFilter>) {
      state.category = action.payload;
    },
    setSort(state: BooksState, action: PayloadAction<TSortFilter>) {
      state.filter = action.payload;
    },
    setBooks(state: BooksState, action: PayloadAction<BooksModel[]>) {
      state.books = action.payload;
    },
    resetBooks(state: BooksState) {
      state.books = [];
    },
    reset() {
      return initialState;
    },
  },
});

export const { actions: booksActions, reducer: booksReducer } = booksSlice;
