import React, { useState } from 'react';
import { Layout, Drawer, Button, Avatar } from 'antd';
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
import { useLogout } from '../../../services/auth/login';
import { useGetProfileInfo as employeeProfileInfo } from '../../../services/employee/setUp';
import { useGetProfileInfo as jobSeekerProfileInfo } from '../../../services/jobSeeker/setUp';
import '../../styles/main.css';
import PopOver from '../../../features/auth/components/PopOver';
import { AppConstant } from '../../constants';
import { isAuthenticated } from '../../utils/auth';

const { Header } = Layout;

const navItems = [
  { label: 'Find Jobs', path: '/search' },
  { label: 'Companies', path: '/companies' },
  { label: 'Career Mentoring', path: '/career-mentoring' },
];

const AntdHeader = () => {
  const { mutateAsync, isPending } = useLogout();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogOut = async () => {
    try {
      await mutateAsync();
      dispatch(logOut());
      navigate('/');
    } catch (e) {
      /* empty */
    }
  };

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const isJobSeeker = isAuthenticated()?.type === AppConstant.JOB_SEEKER;
  const [{ profile_images: employeeProfileImage } = {}] =
    employeeProfileInfo(isJobSeeker ? null : isAuthenticated()?.id)?.data || [];
  const [{ profile_images: jobSeekerProfileImage } = {}] =
    jobSeekerProfileInfo(isJobSeeker ? isAuthenticated()?.id : null)?.data ||
    [];

  return (
    <Layout>
      <Header className="fixed w-full top-0 z-[1000] h-[80px] bg-[#08142c] px-4 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center shadow-md">
        <div
          className="text-2xl lg:text-3xl font-bold text-[#f1c40f] tracking-wide cursor-pointer bg-black bg-opacity-20 px-3 py-1 rounded-md inline-block"
          onClick={() => navigate('/')}
        >
          GJ
        </div>

        <Button
          type="text"
          className="lg:hidden text-white hover:text-[#f1c40f]"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        <div className="hidden lg:flex gap-10 text-base font-medium">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="text-gray-300 hover:text-[#f1c40f] cursor-pointer transition"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {!isAuthenticated() ? (
            <>
              <PopOver
                content={<DynamicTabs dataKey="login" />}
                trigger="click"
              >
                <AntdButton classNames="border border-white text-black hover:!text-[#f1c40f] px-5 font-medium rounded transition">
                  Login
                </AntdButton>
              </PopOver>
              <PopOver
                content={<DynamicTabs dataKey="registration" />}
                trigger="click"
              >
                <AntdButton classNames="border border-white text-black hover:!text-[#f1c40f] px-5 font-medium rounded transition">
                  Register
                </AntdButton>
              </PopOver>
            </>
          ) : (
            <PopOver
              trigger="click"
              content={
                <div className="w-[240px] py-3 text-base text-[#08142c] font-medium">
                  <ul className="space-y-2">
                    <li
                      className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer hover:bg-[#f1c40f]/80 hover:text-black transition-all duration-200"
                      onClick={() =>
                        navigate(
                          isJobSeeker
                            ? '/jobseeker/dashboard'
                            : '/employee/dashboard'
                        )
                      }
                    >
                      <DashboardOutlined className="text-lg" />
                      <span className="text-[15px] font-semibold">
                        Dashboard
                      </span>
                    </li>

                    <li
                      className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer hover:bg-[#f1c40f]/80 hover:text-black transition-all duration-200"
                      onClick={() =>
                        navigate(
                          isJobSeeker
                            ? '/jobseeker/dashboard/change-password'
                            : '/employee/dashboard/change-password'
                        )
                      }
                    >
                      <KeyOutlined className="text-lg" />
                      <span className="text-[15px] font-semibold">
                        Change Password
                      </span>
                    </li>

                    <PopOver
                      trigger="click"
                      content={
                        <div className="p-4 text-[#08142c] space-y-4 text-sm font-medium">
                          <p className="text-center font-semibold text-base">
                            Are you sure you want to logout?
                          </p>
                          <div className="flex gap-3 justify-between">
                            <AntdButton
                              onClick={handleLogOut}
                              classNames="bg-[#08142c] text-white px-4 py-1.5 rounded hover:!bg-[#0a223f] transition"
                              loading={isPending}
                            >
                              Ok
                            </AntdButton>
                            <AntdButton
                              onClick={() => navigate('/')}
                              classNames="bg-gray-200 text-black px-4 py-1.5 rounded hover:!bg-gray-300 transition"
                            >
                              Cancel
                            </AntdButton>
                          </div>
                        </div>
                      }
                    >
                      <li className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer hover:bg-[#f1c40f]/80 hover:text-black transition-all duration-200">
                        <LogoutOutlined className="text-lg" />
                        <span className="text-[15px] font-semibold">
                          Logout
                        </span>
                      </li>
                    </PopOver>
                  </ul>
                </div>
              }
            >
              <Avatar
                src={employeeProfileImage || jobSeekerProfileImage}
                size={48}
                icon={<UserOutlined />}
                className="cursor-pointer border-2 border-[#f1c40f] hover:shadow-md transition"
              />
            </PopOver>
          )}
        </div>

        <Drawer
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          className="lg:hidden"
          styles={{ body: { backgroundColor: '#08142c', color: '#fff' } }}
        >
          <div className="flex flex-col space-y-6 text-white font-medium">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="cursor-pointer hover:text-[#f1c40f] transition"
                onClick={() => {
                  navigate(item.path);
                  closeDrawer();
                }}
              >
                {item.label}
              </div>
            ))}
            {!isAuthenticated() && (
              <div
                className="cursor-pointer hover:text-[#f1c40f] transition"
                onClick={() => navigate('/auth/login')}
              >
                Login
              </div>
            )}
          </div>
        </Drawer>
      </Header>

      <div className="xl:h-[80px] h-[60px]" />
    </Layout>
  );
};

export default AntdHeader;
