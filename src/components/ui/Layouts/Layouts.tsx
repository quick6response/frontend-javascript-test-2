import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Layouts: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet />
      <div
        style={{
          height: '100vh',
          padding: '50px 10px 10px 10px',
        }}
      >
        {children}
      </div>
    </>
  );
};
