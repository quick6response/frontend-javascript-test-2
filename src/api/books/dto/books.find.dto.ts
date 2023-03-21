import {
  TCategoriesFilter,
  TSortFilter,
} from '../../../store/books/books.slice';

export interface BooksFindDto {
  name: string;
  category?: TCategoriesFilter;
  sort?: TSortFilter;
  startIndex?: number;
}
