import { TCategoriesFilter, TSortFilter } from '../store/books/books.slice';

export const categoriesData: TCategoriesFilter[] = [
  'all',
  'art',
  'biography',
  'computers',
  'history',
  'medical',
  'poetry',
];

export const filterData: TSortFilter[] = ['newest', 'relevance'];
