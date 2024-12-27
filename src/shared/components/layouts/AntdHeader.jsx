import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button, Avatar } from 'antd';
import {
  DashboardOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import AntdButton from '../AntdButtons';
import DynamicTabs from '../../../features/auth';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../slice/authSlice';
import { useNavigate } from 'react-router-dom';
import useAuthHook from '../../../hooks/useAuthHook';
import { useLogout } from '../../../services/auth/login';
import { useGetProfileInfo as employeeProfileInfo } from '../../../services/employee/setUp';
import { useGetProfileInfo as jobSeekerProfileInfo } from '../../../services/jobSeeker/setUp';
import '../../styles/main.css';
import PopOver from '../../../features/auth/components/PopOver';
import { AppConstant } from '../../constants';

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

  const isJobSeeker = isAuthenticated?.type === AppConstant.JOB_SEEKER;
  const [{ profile_images: employeeProfileImage } = {}] =
    employeeProfileInfo(isJobSeeker ? null : isAuthenticated?.id)?.data || [];

  const [{ profile_images: jobSeekerProfileImage } = {}] =
    jobSeekerProfileInfo(isJobSeeker ? isAuthenticated?.id : null)?.data || [];

  return (
    <Layout>
      <Header className="flex justify-between items-center h-full px-4 sm:px-6 md:px-8 lg:px-12 ant-header">
        <div className="text-2xl font-bold text-gray-300">
          <img src="/logo.png" height={125} width={125} />
        </div>

        <Button
          type="default"
          className="lg:hidden bg-transparent text-[#f5f5f5]"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        <Menu
          mode="horizontal"
          className="hidden lg:flex flex-grow justify-center items-center text-lg font-semibold"
          theme="dark"
        >
          <Menu.Item
            key="1"
            className="text-gray-300"
            onClick={() => navigate('/search')}
          >
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
                <AntdButton classNames="border border-white bg-transparent text-white px-6 hover:!bg-white hover:!text-black transition-colors font-semibold">
                  Register
                </AntdButton>
              </PopOver>
            </>
          ) : (
            <div className="flex gap-16">
              <PopOver
                trigger="click"
                content={
                  <div>
                    <ul>
                      <li
                        onClick={() =>
                          isJobSeeker
                            ? navigate('/jobseeker/dashboard')
                            : navigate('/employee/dashboard')
                        }
                        className="flex items-center gap-3 font-semibold text-lg py-2 px-4 rounded-lg cursor-pointer hover:bg-[#e8f4f9] hover:text-[#00b6b4] transition-colors"
                      >
                        <DashboardOutlined className="text-xl" />
                        <span>DashBoard</span>
                      </li>
                      <li
                        onClick={() =>
                          isJobSeeker
                            ? navigate('/jobseeker/dashboard/change-password')
                            : navigate('/employee/dashboard/change-password')
                        }
                        className="flex items-center gap-3 font-semibold text-lg py-2 px-4 rounded-lg cursor-pointer hover:bg-[#e8f4f9] hover:text-[#00b6b4] transition-colors"
                      >
                        <KeyOutlined className="text-xl" />
                        <span>Change Password</span>
                      </li>
                      <PopOver
                        trigger="click"
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
                        <li className="flex items-center gap-3 font-semibold text-lg py-2 px-4 rounded-lg cursor-pointer hover:bg-[#e8f4f9] hover:text-[#00b6b4] transition-colors">
                          <LogoutOutlined className="text-xl" />
                          <span>Logout</span>
                        </li>
                      </PopOver>
                    </ul>
                  </div>
                }
              >
                <Avatar
                  src={employeeProfileImage || jobSeekerProfileImage}
                  size={64}
                  icon={<UserOutlined />}
                  className="cursor-pointer border-2 border-gray-300 rounded-full"
                />
              </PopOver>
            </div>
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
            <Menu.Item
              key="4"
              onClick={() => {
                navigate('auth/login');
                setDrawerVisible(false);
              }}
            >
              Login
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default AntdHeader;
