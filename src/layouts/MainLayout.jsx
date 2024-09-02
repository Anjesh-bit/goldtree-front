import React from 'react';
import { Outlet } from 'react-router-dom';
import AntdHeader from './AntdHeader';
import AntdFooter from './AntdFooter';

const MainLayout = () => {
  return (
    <div>
      <AntdHeader />
      <Outlet />
      <AntdFooter />
    </div>
  );
};

export default MainLayout;
