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
  TableFooter,
} from '@mui/material';
import { FC, FormEvent } from 'react';
import { useGetAllBooks } from '../../api/books/hooks/useGetAllBooks';
import { CardBookDetail } from '../../components/screens/Books/Card/CardBookDetail';
import { categoriesData, filterData } from '../../data/categories.data';
import { useAction } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  booksActions,
  TCategoriesFilter,
  TSortFilter,
} from '../../store/books/books.slice';

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

  const onChangeSelectCategory = (
    event: SelectChangeEvent<TCategoriesFilter>,
  ) => {
    return booksActionsPanel.setCategory(
      event.target.value as TCategoriesFilter,
    );
  };

  const onChangeSelectSort = (event: SelectChangeEvent<TSortFilter>) => {
    return booksActionsPanel.setSort(event.target.value as TSortFilter);
  };

  return (
    <>
      <form onSubmit={onSubmitGetBooks}>
        <FormControl sx={{ m: 1 }} variant="standard">
          <Input
            placeholder="Введите название"
            onChange={(e) => booksActionsPanel.setSearchTerm(e.target.value)}
          />
          <Button disabled={searchTerm.length === 0} type="submit">
            Найти
          </Button>
        </FormControl>
      </form>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
          <InputLabel id="demo-customized-select-label">Категория</InputLabel>
          <Select
            value={selectCategories}
            onChange={(event) => onChangeSelectCategory(event)}
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
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
          <InputLabel id="demo-customized-select-label">Сортировка</InputLabel>
          <Select
            value={filter}
            onChange={(event) => onChangeSelectSort(event)}
          >
            {filterData.map((fD) => (
              <MenuItem key={fD} value={fD} disabled={filter === fD}>
                {fD}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {isLoading && <CircularProgress />}

      {!isError && !isLoading && data?.items.length > 0 ? (
        <>
          <TableFooter>Найдено {data.totalItems} книг</TableFooter>
          <Grid container spacing={1}>
            {data.items.map((book) => (
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
