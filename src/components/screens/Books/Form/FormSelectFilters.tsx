import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC } from 'react';
import { categoriesData, filterData } from '../../../../data/categories.data';
import { useAction } from '../../../../hooks/useActions';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import {
  booksActions,
  TCategoriesFilter,
  TSortFilter,
} from '../../../../store/books/books.slice';

export const FormSelectFilters: FC = () => {
  const booksActionsPanel = useAction(booksActions);
  const selectCategories = useAppSelector((state) => state.books.category);
  const filter = useAppSelector((state) => state.books.filter);
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
        <Select value={filter} onChange={(event) => onChangeSelectSort(event)}>
          {filterData.map((fD) => (
            <MenuItem key={fD} value={fD} disabled={filter === fD}>
              {fD}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
