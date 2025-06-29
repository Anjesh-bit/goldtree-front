import { Form } from 'antd';
import AntdBreadCum from '../../../shared/components/AntdBreadCum';
import AntdButton from '../../../shared/components/AntdButtons';
import Inputs from '../../../shared/components/form/AntdInputs';
import { useAccountManagement } from '../hooks/useAccountManagement';

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
      <Form
        form={form}
        onFinish={handleOnFinish}
        layout="vertical"
        className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-8"
      >
        <div className="mb-6">
          <AntdBreadCum array={['Employee', 'Change Password']} />
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-gray-100 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#08142c] mb-6">
            Change Your Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Inputs
                required
                className="w-full"
                Label="Old Password"
                type="password"
                name="old_password"
                valMessage="This old password field is required"
              />
            </div>

            <div>
              <Inputs
                required
                className="w-full"
                Label="New Password"
                type="password"
                name="new_password"
                valMessage="This new password field is required"
              />
            </div>

            <div>
              <Inputs
                required
                className="w-full"
                Label="Confirm Password"
                type="password"
                name="confirm_password"
                valMessage="This confirm password field is required"
              />
            </div>
          </div>

          <div className="mt-8">
            <AntdButton
              htmlType="submit"
              loading={isErrorChangePass ? false : isPendingChangePass}
              classNames="
                bg-[#f1c40f] 
                text-[#08142c] 
                font-semibold 
                px-6 
                py-2 
                rounded-md 
                hover:bg-[#d4b80e] 
                transition-all 
                shadow
              "
            >
              Update Password
            </AntdButton>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
