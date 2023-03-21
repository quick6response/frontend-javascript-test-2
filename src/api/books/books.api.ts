import axios from 'axios';
import { BooksModel } from '../../models/books.model';
import { BooksFindDto } from './dto/books.find.dto';
import { BooksResultResponseDto } from './dto/books.result.response.dto';

axios.defaults.baseURL = 'https://www.googleapis.com/books/v1/volumes';
axios.defaults.params = {
  key: import.meta.env.VITE_API_KEY,
};

export const BooksApi = {
  getAll: async (dto: BooksFindDto) => {
    console.log(import.meta.env.VITE_API_KEY);
    const { data } = await axios.get<BooksResultResponseDto>(
      `https://www.googleapis.com/books/v1/volumes`,
      {
        params: {
          q:
            dto.name +
            `${dto?.category !== 'all' ? `+subject:${dto.category}` : ''}`,
          orderBy: dto.sort ?? '',
          maxResults: 30,
          startIndex: dto?.startIndex ?? 0,
        },
      },
    );
    return data;
  },

  getBook: async (etag: string) => {
    const { data } = await axios.get<BooksModel>(
      `https://www.googleapis.com/books/v1/volumes/${etag}`,
    );
    return data;
  },
};
