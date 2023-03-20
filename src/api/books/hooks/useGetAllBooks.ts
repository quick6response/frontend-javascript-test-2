import { useState } from 'react';
import { BooksApi } from '../books.api';
import { BooksFindDto } from '../dto/books.find.dto';
import { BooksResultResponseDto } from '../dto/books.result.response.dto';

export const useGetAllBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<BooksResultResponseDto>(null);

  const fetchData = async (dto: BooksFindDto) => {
    try {
      setIsLoading(true);
      const result = await BooksApi.getAll(dto);
      setData(result);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchData,
    data,
    isError,
    isLoading,
  };
};
