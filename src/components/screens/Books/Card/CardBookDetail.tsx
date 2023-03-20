import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BooksModel } from '../../../../models/books.model';

export const CardBookDetail: FC<BooksModel> = ({
  volumeInfo,
  id,
  kind,
  selfLink,
  etag,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 320 }}>
        <CardActionArea>
          {volumeInfo.imageLinks ? (
            <CardMedia
              component="img"
              height="200"
              width="200"
              loading="lazy"
              src={volumeInfo.imageLinks.thumbnail}
              alt={volumeInfo.title}
            />
          ) : (
            <div>Картинки нет</div>
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {volumeInfo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {volumeInfo.categories}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {volumeInfo.authors?.join(',')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Link to={`${id}`}>Перейти</Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
