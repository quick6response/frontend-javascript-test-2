import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { BooksModel } from '../../../../models/books.model';

export const CardBookDetail: FC<BooksModel> = ({ volumeInfo, id, kind }) => {
  return (
    <Card sx={{ maxWidth: 320 }}>
      <CardContent>
        {volumeInfo?.imageLinks ? (
          <CardMedia
            component="img"
            height="200"
            width="200"
            loading="lazy"
            src={volumeInfo?.imageLinks?.thumbnail}
            alt={volumeInfo.title}
          />
        ) : (
          <div>Картинки нет</div>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Название: {volumeInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Категория: {volumeInfo.categories}
          </Typography>
          <Typography variant="caption" color="text.primary">
            Описание: {volumeInfo.description}
          </Typography>
          <Typography variant="body1" color="text.primary">
            Автор:
            {volumeInfo.authors ? volumeInfo.authors?.join(',') : 'не указан'}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};
