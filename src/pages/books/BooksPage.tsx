import { Box, Button, Grid, Input } from '@mui/material';
import { FC, FormEvent, useState } from 'react';
import { BooksApi } from '../../api/books/books.api';
import { CardBookDetail } from '../../components/screens/Books/Card/CardBookDetail';
import { BooksModel } from '../../models/books.model';

export const BooksPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [data, setData] = useState<BooksModel[]>([]);

  const getBooks = async () => {
    const result = await BooksApi.getAll({ name: searchTerm });
    setData(result.items);
  };

  const onSubmitGetBooks = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return getBooks();
  };

  return (
    <>
      <Box>
        <form onSubmit={onSubmitGetBooks}>
          <Input
            placeholder="Введите название книги"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button disabled={searchTerm.length === 0} type="submit">
            Найти книгу
          </Button>
        </form>
      </Box>
      {data?.length > 0 ? (
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
