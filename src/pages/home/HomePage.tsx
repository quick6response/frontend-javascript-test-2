import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
  return (
    <Box>
      <center>
        Это главная страница сайта по поиску книг, переходи в каталог и находи
        нужную книгу! Все абсолютно бесплатно.
        <Button>
          <Link to={'books'}> Перейти</Link>
        </Button>
      </center>
    </Box>
  );
};
