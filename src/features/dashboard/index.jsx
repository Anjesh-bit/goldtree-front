import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import {
  employeeSiderRoutes,
  JobSeekerSiderRoutes,
} from '../../shared/utils/sider';

const { Content, Sider } = Layout;

const DashBoardSider = ({
  isEmployeeDashboard,
  isJobSeekerDashboard,
  data,
}) => {
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

  const [collapsed, setCollapsed] = useState(false);
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
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        className="bg-dark-900"
      >
        <div className="logo text-center text-white text-xl font-semibold py-4">
          Dashboard
        </div>
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
      <Layout>
        <Content className="bg-light-100 p-4 md:p-8 lg:p-12 xl:p-[48px]">
          <Outlet context={data} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardSider;
