import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC, FormEvent, useState } from 'react';
import { BooksApi } from '../../api/books/books.api';
import { CardBookDetail } from '../../components/screens/Books/Card/CardBookDetail';
import { categoriesData } from '../../data/categories.data';
import { useAction } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { BooksModel } from '../../models/books.model';
import { booksActions, TCategoriesFilter } from '../../store/books/books.slice';

export const BooksPage: FC = () => {
  const booksActionsPanel = useAction(booksActions);
  const searchTerm = useAppSelector((state) => state.books.searchTerm);
  const selectCategories = useAppSelector((state) => state.books.category);
  const filter = useAppSelector((state) => state.books.filter);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState<BooksModel[]>([]);

  const getBooks = async () => {
    try {
      setIsLoading(true);
      const result = await BooksApi.getAll({
        name: searchTerm,
        category: selectCategories,
        sort: filter,
      });
      setData(result.items);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitGetBooks = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return getBooks();
  };

  const onChangeSelectFilter = (
    event: SelectChangeEvent<TCategoriesFilter>,
  ) => {
    return booksActionsPanel.setCategory(
      event.target.value as TCategoriesFilter,
    );
  };

  return (
    <>
      <form onSubmit={onSubmitGetBooks}>
        <FormControl sx={{ m: 1 }} variant="standard">
          <Input
            placeholder="Введите название книги"
            onChange={(e) => booksActionsPanel.setSearchTerm(e.target.value)}
          />
          <Button disabled={searchTerm.length === 0} type="submit">
            Найти книги
          </Button>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel id="demo-customized-select-label">Категория</InputLabel>
            <Select
              value={selectCategories}
              onChange={(event) => onChangeSelectFilter(event)}
            >
              {categoriesData.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                  disabled={selectCategories === category}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormControl>
      </form>

      {isLoading && <CircularProgress />}

      {!isError && !isLoading && data?.length > 0 ? (
        <Grid container spacing={1}>
          {data.map((book) => (
            <CardBookDetail key={book.id} {...book} />
          ))}
        </Grid>
      ) : (
        <div>Тут будет результат поиска</div>
      )}
    </>
  );
};
