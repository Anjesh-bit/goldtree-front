import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import AntdButton from '../common/AntdButtons';
import PopOver from '../components/auth/PopOver';
import DynamicTabs from '../components/auth';
import { useDispatch } from 'react-redux';
import { logOut } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';
import useAuthHook from '../hooks/useAuthHook';
import { useLogout } from '../services/auth/login';
import '../styles/main.css';

const { Header } = Layout;

const AntdHeader = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAuthHook(false);

  const { mutateAsync, isPending } = useLogout();
  const navigate = useNavigate();

  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogOut = async () => {
    try {
      await mutateAsync();
      dispatch(logOut());
      navigate('/');
      window.location.reload();
    } catch (e) {}
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Layout>
      <Header className="flex justify-between items-center h-full px-4 sm:px-6 md:px-8 lg:px-12 ant-header">
        <div className="text-2xl font-bold text-gray-300">Logo</div>

        <Button
          type="primary"
          className="lg:hidden"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        <Menu
          mode="horizontal"
          className="hidden lg:flex flex-grow justify-center items-center text-lg font-semibold"
          theme="dark"
        >
          <Menu.Item key="1" className="text-gray-300">
            Find Jobs
          </Menu.Item>
          <Menu.Item key="2" className="text-gray-300">
            Companies
          </Menu.Item>
          <Menu.Item key="3" className="text-gray-300">
            Career Mentoring
          </Menu.Item>
        </Menu>

        <div className="hidden lg:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <PopOver
                content={<DynamicTabs dataKey="login" />}
                trigger={'click'}
              >
                <AntdButton classNames="bg-transparent border border-white text-white px-6 hover:!bg-white hover:!text-black transition-colors font-semibold">
                  Login
                </AntdButton>
              </PopOver>
              <PopOver
                content={<DynamicTabs dataKey="registration" />}
                trigger={'click'}
              >
                <AntdButton classNames="border border-white text-white px-6 hover:!bg-white hover:!text-black transition-colors font-semibold">
                  Register
                </AntdButton>
              </PopOver>
            </>
          ) : (
            <PopOver
              trigger={'click'}
              content={
                <div className="flex flex-col gap-2 p-4 bg-white text-black">
                  <p className="font-semibold text-lg text-center">
                    Are you sure you want to logout?
                  </p>
                  <div className="flex justify-between gap-2">
                    <AntdButton
                      onClick={handleLogOut}
                      classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
                      loading={isPending}
                    >
                      Ok
                    </AntdButton>
                    <AntdButton
                      onClick={() => navigate('/')}
                      classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
                    >
                      Cancel
                    </AntdButton>
                  </div>
                </div>
              }
            >
              <AntdButton
                classNames="border border-white text-white px-6 hover:!bg-white hover:!text-black transition-colors font-semibold"
                loading={isPending}
              >
                Logout
              </AntdButton>
            </PopOver>
          )}
        </div>

        <Drawer
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          className="lg:hidden"
        >
          <Menu mode="vertical" theme="dark" className="text-lg font-semibold">
            <Menu.Item key="1">Find Jobs</Menu.Item>
            <Menu.Item key="2">Companies</Menu.Item>
            <Menu.Item key="3">Career Mentoring</Menu.Item>
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default AntdHeader;
