import React from "react";
import { Layout, Menu } from "antd";
import AntdButton from "../common/AntdButtons";
import PopOver from "../components/auth/PopOver";
import DynamicTabs from "../components/auth";
import { useDispatch } from "react-redux";
import { logOut } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import useAuthHook from "../hooks/useAuthHook";
import { useLogout } from "../services/auth/login";

const { Header } = Layout;

const AntdHeader = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAuthHook(false);
  const { mutateAsync, isError, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await mutateAsync();
      dispatch(logOut());
      navigate("/");
    } catch (e) {
      console.error(`Error logging out: ${e}`);
    }
  };

  return (
    <Layout>
      <Header>
        <div className="container mx-auto flex justify-between items-center h-full">
          <div className="text-2xl font-bold text-white w-fit">Logo</div>

          <Menu
            mode="horizontal"
            className="flex-grow flex justify-center items-center text-lg font-semibold"
            theme="dark"
          >
            <Menu.Item key="1" className="!text-white hover:!text-gray-300">
              Find Jobs
            </Menu.Item>
            <Menu.Item key="2" className="!text-white hover:!text-gray-300">
              Companies
            </Menu.Item>
            <Menu.Item key="3" className="!text-white hover:!text-gray-300">
              Career Mentoring
            </Menu.Item>
          </Menu>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <PopOver content={<DynamicTabs dataKey="login" />}>
                  <AntdButton classNames="bg-transparent border border-white text-white px-6 hover:!bg-white hover:!text-black transition-colors font-semibold">
                    Sign Up
                  </AntdButton>
                </PopOver>
                <PopOver content={<DynamicTabs dataKey="registration" />}>
                  <AntdButton classNames="border border-white text-white px-6  hover:!bg-white hover:!text-black transition-colors font-semibold">
                    Register
                  </AntdButton>
                </PopOver>
              </>
            ) : (
              <PopOver
                content={
                  <div className="flex flex-col gap-2 p-4 bg-white text-black">
                    <p className="font-semibold">
                      Are you sure you want to logout?
                    </p>
                    <div className="flex justify-between gap-2">
                      <AntdButton
                        onClick={handleLogOut}
                        classNames="bg-black text-white hover:!bg-black hover:!text-white hover:!border-black"
                        loading={isPending}
                      >
                        Ok
                      </AntdButton>
                      <AntdButton
                        onClick={() => navigate("/")}
                        classNames="bg-gray-300 text-black hover:!bg-gray-200 hover:!border-gray-400 hover:!text-black"
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
        </div>
      </Header>
    </Layout>
  );
};

export default AntdHeader;
