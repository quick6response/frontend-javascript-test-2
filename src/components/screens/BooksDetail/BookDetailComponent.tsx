import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';
import { useGetBookById } from '../../../api/books/hooks/useGetBookById';
import { CardBookDetail } from './Card/CardBookDetail';

export const BookDetailComponent: FC<{ path: string }> = ({ path }) => {
  const { data, isError, isLoading, error } = useGetBookById(path);

  return (
    <Box>
      <div>
        {isLoading && <CircularProgress />}
        {!isLoading && data && <CardBookDetail {...data} />}
        {isError && <h1>{error}</h1>}
      </div>
    </Box>
  );
};
