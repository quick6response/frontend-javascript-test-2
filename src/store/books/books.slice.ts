import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

const initialState: BooksState = {
  searchTerm: '',
  category: 'all',
  filter: 'newest',
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
    reset() {
      return initialState;
    },
  },
});

export const { actions: booksActions, reducer: booksReducer } = booksSlice;
