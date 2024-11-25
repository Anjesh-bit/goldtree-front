import Inputs from '../../../shared/components/form/AntdInputs';
import AntdButton from '../../../shared/components/AntdButtons';
import Form from 'antd/es/form';
import { Fragment } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthConstant } from '../auth.constant';

const DynamicLogin = ({ isEmployee, setOpen }) => {
  const { handleOnClick, handleOnFinishLogin, contextHolder, form, data } =
    useAuth(isEmployee, AuthConstant.DEFAULT_IS_TAB_ITEMS, setOpen);

  return (
    <Fragment>
      {contextHolder}
      <div className="flex flex-col max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <Form form={form} onFinish={handleOnFinishLogin}>
          <div className="space-y-4">
            <div className="w-full">
              <Inputs Label="Enter Email" name="email" type="email" />
            </div>
            <div className="w-full">
              <Inputs Label="Enter Password" name="password" type="password" />
            </div>

            <div className="mt-6">
              <AntdButton
                loading={data?.loading}
                classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors w-full h-[40px]"
                onClick={() => form.submit()}
              >
                Login
              </AntdButton>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?
            </div>

            <div className="mt-4">
              <AntdButton
                classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors w-full h-[40px]"
                onClick={(e) => handleOnClick(e)}
              >
                Register
              </AntdButton>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default DynamicLogin;
