import { Form } from 'antd';
import AntdBreadCum from '../../common/AntdBreadCum';
import AntdButton from '../../common/AntdButtons';
import Inputs from '../../common/form/AntdInputs';
import { useAccountManagement } from './hook/useAccountManagement';

const ChangePassword = () => {
  const {
    handleOnFinish,
    isErrorChangePass,
    isPendingChangePass,
    form,
    contextHolder,
  } = useAccountManagement();
  return (
    <>
      {contextHolder}
      <Form form={form} onFinish={handleOnFinish}>
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
                  required
                  className="w-full"
                  Label="Old Password"
                  type="password"
                  name="old_password"
                  valMessage="This old password field is required"
                />
              </div>
              <div className="col-span-1">
                <Inputs
                  required
                  className="w-full"
                  Label="New Password"
                  type="password"
                  name="new_password"
                  valMessage="This new password field is required"
                />
              </div>
              <div className="col-span-1">
                <Inputs
                  required
                  className="w-full"
                  Label="Confirm Password"
                  type="password"
                  name="confirm_password"
                  valMessage="This confirm password field is required"
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <AntdButton
                  htmlType="submit"
                  classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
                  loading={isErrorChangePass ? false : isPendingChangePass}
                >
                  Update
                </AntdButton>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
