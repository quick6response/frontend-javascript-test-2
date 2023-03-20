import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BooksPage } from '../pages/books/BooksPage';
import { HomePage } from '../pages/home/HomePage';

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="books/:path" element={<div />} />
      </Routes>
    </BrowserRouter>
  );
};
