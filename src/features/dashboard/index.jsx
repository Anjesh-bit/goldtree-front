import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, theme, Grid } from 'antd';
import {
  employeeSiderRoutes,
  JobSeekerSiderRoutes,
} from '../../shared/utils/sider';

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const DashBoardSider = ({ isEmployeeDashboard, isJobSeekerDashboard }) => {
  const screens = useBreakpoint();
  const isMobileScreen = screens.xs;
  const location = useLocation();

  const items = [
    { status: isEmployeeDashboard, routes: employeeSiderRoutes },
    { status: isJobSeekerDashboard, routes: JobSeekerSiderRoutes },
  ];
  const foundItems = items.find((item) => item.status);

  const [selectedKeys, setSelectedKeys] = useState(() => {
    const matchedItem = foundItems?.routes.find((route) =>
      location.pathname.startsWith(route.path)
    );
    return matchedItem ? [matchedItem.key] : [];
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuSelect = ({ key }) => {
    setSelectedKeys([key]);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={isMobileScreen}
        theme="dark"
        width={220}
        className="fixed lg:top-[80px] top-[60px] left-0 bottom-0 z-[40] bg-[#08142c] rounded-tr-xl rounded-br-xl shadow-lg"
      >
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          onSelect={handleMenuSelect}
          className="bg-[#08142c] text-gray-300"
          items={foundItems?.routes.map(({ key, icon, label, path }) => ({
            key,
            icon,
            label: (
              <Link
                to={path}
                className="text-base font-medium transition-colors duration-200"
              >
                {label}
              </Link>
            ),
          }))}
          style={{
            borderRight: 'none',
          }}
        />
      </Sider>
      <Layout
        className="xl:ml-[220px] sm:ml-[220px] ml-[80px] bg-[#f5f5f5]"
        style={{ minHeight: '100vh' }}
      >
        <Content className="p-6 md:p-10 lg:p-14 xl:p-[48px]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardSider;
