import axios from 'axios';
import { BooksFindDto } from './dto/books.find.dto';
import { BooksResultResponseDto } from './dto/books.result.response.dto';

export const BooksApi = {
  getAll: async (dto: BooksFindDto) => {
    const { data } = await axios.get<BooksResultResponseDto>(
      `https://www.googleapis.com/books/v1/volumes`,
      {
        params: {
          q:
            dto.name +
            `${dto?.category !== 'all' ? `+subject:${dto.category}` : ''}`,
          orderBy: dto.sort ?? '',
          maxResults: 30,
        },
      },
    );
    return data;
  },
};
