import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { BooksModel } from '../../../models/books.model';
import { BooksApi } from '../books.api';

export const useGetBookById = (etag: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setTextError] = useState<string>('');
  const [data, setData] = useState<BooksModel>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await BooksApi.getBook(etag);
        setData(result);
        setTextError('');
        setIsError(false);
      } catch (error) {
        setIsError(true);
        if (error instanceof Error) setTextError(error.message);
        else if (error instanceof AxiosError) setTextError(error.message);
        else setTextError('Не обработанная ошибка');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [etag]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
