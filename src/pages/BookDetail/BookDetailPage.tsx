import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetBookById } from '../../api/books/hooks/useGetBookById';
import { CardBookDetail } from '../../components/screens/BooksDetail/Card/CardBookDetail';

export const BookDetailPage = () => {
  const { path } = useParams();
  if (!path)
    return (
      <div>
        В строке отсутствует айди книги, вернитесь назад и перейдите снова.
      </div>
    );

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
