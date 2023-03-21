import { CircularProgress, Grid, TableFooter } from '@mui/material';
import { FC, FormEvent } from 'react';
import { useGetAllBooks } from '../../api/books/hooks/useGetAllBooks';
import { CardBookDetail } from '../../components/screens/Books/Card/CardBookDetail';
import { FormInputSearch } from '../../components/screens/Books/Form/FormInputSearch';
import { FormSelectFilters } from '../../components/screens/Books/Form/FormSelectFilters';
import { useAction } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { booksActions } from '../../store/books/books.slice';

export const BooksPage: FC = () => {
  const booksActionsPanel = useAction(booksActions);
  const searchTerm = useAppSelector((state) => state.books.searchTerm);
  const selectCategories = useAppSelector((state) => state.books.category);
  const filter = useAppSelector((state) => state.books.filter);
  const { fetchData, data, isLoading, isError } = useGetAllBooks();

  const onSubmitGetBooks = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return fetchData({
      category: selectCategories,
      sort: filter,
      name: searchTerm,
    });
  };

  return (
    <>
      <FormInputSearch onSubmit={onSubmitGetBooks} />
      <FormSelectFilters />

      {isLoading && <CircularProgress />}

      {!isError && !isLoading && data?.items.length > 0 ? (
        <>
          <TableFooter>Найдено {data.totalItems} книг</TableFooter>
          <Grid container spacing={1}>
            {data?.items?.map((book) => (
              <CardBookDetail key={book.id} {...book} />
            ))}
          </Grid>
        </>
      ) : (
        <div>Тут будет результат поиска</div>
      )}
    </>
  );
};
