import { Button, FormControl, Input } from '@mui/material';
import { FC, FormEvent } from 'react';
import { useAction } from '../../../../hooks/useActions';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { booksActions } from '../../../../store/books/books.slice';

interface IFormInputSearch {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
export const FormInputSearch: FC<IFormInputSearch> = ({ onSubmit }) => {
  const booksActionsPanel = useAction(booksActions);
  const searchTerm = useAppSelector((state) => state.books.searchTerm);

  return (
    <form onSubmit={onSubmit}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <Input
          placeholder="Введите название"
          value={searchTerm}
          onChange={(e) => booksActionsPanel.setSearchTerm(e.target.value)}
        />
        <Button disabled={searchTerm.length === 0} type="submit">
          Найти
        </Button>
      </FormControl>
    </form>
  );
};
