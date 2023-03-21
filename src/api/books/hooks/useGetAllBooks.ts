import { AxiosError } from 'axios';
import { useState } from 'react';
import { BooksApi } from '../books.api';
import { BooksFindDto } from '../dto/books.find.dto';
import { BooksResultResponseDto } from '../dto/books.result.response.dto';

// это не работает, но должно было помочь упростить конструкции кода
interface IUseGetAllBooks {
  fetchData: (dto: BooksFindDto) => Promise<void>;
  loadMoreData: (dto: BooksFindDto) => Promise<void>;
  isMoreData: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error?: string;
  data?: BooksResultResponseDto;
}
//
// type InitState = IUseGetAllBooks & {
//   isSuccess: false;
//   isLoading: false;
//   isError: false;
//   error: string;
//   data: undefined;
// };
//
// type LoadingState = IUseGetAllBooks & {
//   isLoading: true;
//   isError: false;
//   data: undefined;
// };
//
// type LoadedState = IUseGetAllBooks & {
//   isSuccess: true;
//   isError: false;
//   isLoading: false;
//   data: BooksResultResponseDto;
// };
//
// type ErrorState = IUseGetAllBooks & {
//   isError: true;
//   isLoading: false;
//   isSuccess: false;
//   error: string;
//   data: undefined;
// };
//
// type State = LoadedState | LoadingState | ErrorState | InitState;

export const useGetAllBooks = (): IUseGetAllBooks => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMoreData, setIsMoreData] = useState(false);
  const [error, setTextError] = useState<string>();
  const [data, setData] = useState<BooksResultResponseDto>();

  const fetchData = async (dto: BooksFindDto) => {
    try {
      setIsLoading(true);
      const result = await BooksApi.getAll(dto);
      if (
        result.totalItems > 0 ||
        (data && result?.items.length > data?.items?.length)
      )
        setIsMoreData(true);
      setIsSuccess(true);
      setData(result);
    } catch (error) {
      setIsError(true);
      setIsSuccess(false);
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
    try {
      setIsLoading(true);
      const result = await BooksApi.getAll(dto);
      if (
        result.totalItems <= 0 ||
        (data && result.items.length <= data.items.length)
      )
        return setIsMoreData(false);
      // только если у нас есть новые книги в ответе
      setIsMoreData(true);
      setData((prevState) => {
        return prevState
          ? {
              ...prevState,
              items: [...prevState.items, ...result.items],
            }
          : prevState;
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isError,
    isSuccess,
    isLoading,
    error,
    isMoreData,
    fetchData,
    loadMoreData,
  };
};
