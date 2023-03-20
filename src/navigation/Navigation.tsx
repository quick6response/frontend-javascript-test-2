import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layouts } from '../components/ui/Layouts/Layouts';
import { BooksPage } from '../pages/books/BooksPage';
import { HomePage } from '../pages/home/HomePage';

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Layouts>
              <HomePage />
            </Layouts>
          }
        />
        <Route
          path="books"
          element={
            <Layouts>
              <BooksPage />
            </Layouts>
          }
        />
        <Route path="books/:path" element={<div />} />
      </Routes>
    </BrowserRouter>
  );
};
