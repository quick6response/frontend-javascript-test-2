import { Button, CircularProgress, Grid } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useGetAllBooks } from '../../../api/books/hooks/useGetAllBooks';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { CardBookDetail } from './Card/CardBookDetail';
import { FormInputSearch } from './Form/FormInputSearch';
import { FormSelectFilters } from './Form/FormSelectFilters';

export const BooksComponent = () => {
  const searchTerm = useAppSelector((state) => state.books.searchTerm);
  const selectCategories = useAppSelector((state) => state.books.category);
  const filter = useAppSelector((state) => state.books.filter);
  const [startIndex, setStartIndex] = useState(0);
  const {
    fetchData,
    loadMoreData,
    data,
    isLoading,
    isError,
    isMoreData,
    error,
  } = useGetAllBooks();

  const onSubmitGetBooks = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return fetchData({
      category: selectCategories,
      sort: filter,
      name: searchTerm,
    });
  };

  const onLoadMoreBooks = () => {
    setStartIndex((prevState) => prevState + 30);
    loadMoreData({
      category: selectCategories,
      sort: filter,
      name: searchTerm,
      startIndex: startIndex + 30,
    });
  };

  return (
    <>
      <FormInputSearch onSubmit={onSubmitGetBooks} />
      <FormSelectFilters />

      {isLoading && <CircularProgress />}
      {isError && <h1>{error}</h1>}
      {!isLoading && data?.items.length > 0 ? (
        <>
          <div>Найдено {data.totalItems} книг(-и)</div>
          <Grid container spacing={1}>
            {data?.items?.map((book) => (
              <CardBookDetail key={book.etag} {...book} />
            ))}
          </Grid>
          <Button disabled={!isMoreData} onClick={onLoadMoreBooks}>
            Загрузить еще
          </Button>
        </>
      ) : (
        <div>Тут будет результат поиска</div>
      )}
    </>
  );
};
