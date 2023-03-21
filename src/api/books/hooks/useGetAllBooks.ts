import { AxiosError } from 'axios';
import { useState } from 'react';
import { BooksApi } from '../books.api';
import { BooksFindDto } from '../dto/books.find.dto';
import { BooksResultResponseDto } from '../dto/books.result.response.dto';

export const useGetAllBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setTextError] = useState<string>('');
  // отвечает за наличие еще данных, чтобы не затирать totalItem
  const [isMoreData, setIsMoreData] = useState(false);
  const [data, setData] = useState<BooksResultResponseDto>(null);

  const fetchData = async (dto: BooksFindDto) => {
    try {
      setIsLoading(true);
      const result = await BooksApi.getAll(dto);
      if (result.totalItems > 0 || result?.items.length > data?.items.length)
        setIsMoreData(true);
      setData(result);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) setTextError(error.message);
      else if (error instanceof AxiosError) setTextError(error.message);
      else setTextError('Не обработанная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Загрузить еще книги, сохранив прошлые
   * @param dto
   */
  const loadMoreData = async (dto: BooksFindDto) => {
    setIsMoreData(false);
    try {
      setIsLoading(true);
      const result = await BooksApi.getAll(dto);
      // только если у нас есть новые книги в ответе
      if (result.totalItems > 0 || result.items.length > data.items.length) {
        setIsMoreData(true);
        setData((prevState) => {
          return {
            ...prevState,
            items: [...prevState.items, ...result.items],
          };
        });
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchData,
    loadMoreData,
    data,
    isMoreData,
    isError,
    isLoading,
    error,
  };
};
