import { BooksModel } from '../../../models/books.model';

/**
 * То в каком виде приходят книги по запросу
 */
export interface BooksResultResponseDto {
  kind: string;
  totalItems: number;
  items: BooksModel[];
}
