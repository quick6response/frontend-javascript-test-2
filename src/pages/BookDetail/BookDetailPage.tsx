import { useParams } from 'react-router-dom';
import { BookDetailComponent } from '../../components/screens/BooksDetail/BookDetailComponent';

export const BookDetailPage = () => {
  const { path } = useParams();
  if (!path)
    return (
      <div>
        В строке отсутствует айди книги, вернитесь назад и перейдите снова.
      </div>
    );

  return <BookDetailComponent path={path} />;
};
