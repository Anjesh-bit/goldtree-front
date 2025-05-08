import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
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
  const items = [
    {
      status: isEmployeeDashboard,
      routes: employeeSiderRoutes,
    },
    {
      status: isJobSeekerDashboard,
      routes: JobSeekerSiderRoutes,
    },
  ];

  const foundItems = items.find((item) => item.status);

  const [selectedKeys, setSelectedKeys] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuSelect = (selected) => {
    setSelectedKeys([selected.key]);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={isMobileScreen}
        theme="dark"
        className="bg-dark-900 fixed lg:top-[80px] top-[60px] left-0  bottom-0 z-[40]"
      >
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          onSelect={handleMenuSelect}
          className="bg-dark-900 text-white"
        >
          {foundItems?.routes.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path} className="text-base hover:text-primary">
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="xl:ml-[220px] sm:ml-[200px] ml-[80px]">
        <Content className="bg-light-100 p-4 md:p-8 lg:p-12 xl:p-[48px]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardSider;
