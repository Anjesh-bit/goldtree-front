import { Form } from 'antd';
import AntdBreadCum from '../../common/AntdBreadCum';
import AntdButton from '../../common/AntdButtons';
import Inputs from '../../common/form/AntdInputs';
import useAuthHook from '../../hooks/useAuthHook';
import { useChangePassword } from '../../services/auth/changePassword';
import { useForm } from 'antd/es/form/Form';
import { removeLocalStorage } from '../../utils/localStorage';
import { useLogout } from '../../services/auth/login';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const isAuth = useAuthHook(false);
  const [form] = useForm();
  const navigate = useNavigate();
  const { id, type } = isAuth;
  const { isPending, isError, mutateAsync } = useChangePassword(id, type);
  const { mutateAsync: mutateAsyncLogout } = useLogout();

  const handleChangePassword = async (values) => {
    try {
      await mutateAsync({ ...values });
      removeLocalStorage('loginData');
      await mutateAsyncLogout();
      navigate('/');
    } catch (e) {}
  };

  return (
    <Form form={form} onFinish={handleChangePassword}>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <AntdBreadCum array={['Employee', 'Change Password']} />
        </div>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-[#3d2462] mb-6">
            Change Password
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1">
              <Inputs
                className="w-full"
                Label="Old Password"
                type="password"
                name="old_password"
              />
            </div>
            <div className="col-span-1">
              <Inputs
                className="w-full"
                Label="New Password"
                type="password"
                name="new_password"
              />
            </div>
            <div className="col-span-1">
              <Inputs
                className="w-full"
                Label="Confirm Password"
                type="password"
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <AntdButton
                htmlType="submit"
                classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
                loading={isError ? false : isPending}
              >
                Update
              </AntdButton>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ChangePassword;
