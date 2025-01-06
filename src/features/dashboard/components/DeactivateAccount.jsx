import { Form } from 'antd';
import AntdButton from '../../../shared/components/AntdButtons';
import { AntRadio } from '../../../shared/components/form/AntdRadioGroup';
import { useAccountManagement } from '../hooks/useAccountManagement';
import { AppConstant } from '../../../shared/constants';

const applyOnlineOptions = [
  {
    option: "This is temporary. I'll be back.",
    value: "This is temporary. I'll be back.",
  },
  { option: "I don't find it useful.", value: "I don't find it useful." },
  { option: 'I have a privacy concern.', value: 'I have a privacy concern.' },
  { option: 'My account was hacked.', value: 'My account was hacked' },
  {
    option: 'I got too many emails and notifications from GoldTree.',
    value: 'I got too many emails and notifications from GoldTree.',
  },
  { option: 'Others...', value: 'Others' },
];

const DeactivateAccount = () => {
  const { handleOnFinish, handleRadioChange, isPending, isError, form } =
    useAccountManagement(AppConstant.DEACTIVATE_ACCOUNT);

  return (
    <Form form={form} onFinish={handleOnFinish}>
      <div className="bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#3d2462] mb-4 md:mb-6 text-center md:text-left">
            Are You Sure You Want To Deactivate Your Account?
          </h2>

          <p className="text-gray-700 text-sm sm:text-base mb-4 md:mb-6 text-center md:text-left">
            Deactivating your account will disable your profile and remove your
            name from most things, such as job alerts.
          </p>

          <div className="mb-4 md:mb-6">
            <h3 className="text-md sm:text-lg font-medium mb-2">
              Reason for leaving
            </h3>
            <AntRadio
              name="deactivate_reason"
              options={applyOnlineOptions}
              deactivateAccount
              onChange={handleRadioChange}
            />
          </div>

          <div className="flex justify-center md:justify-end mt-6">
            <AntdButton
              classNames="bg-[#08142c] text-white font-semibold px-7 py-2 rounded-md hover:!bg-[#0a223f] transition-colors"
              style={{ width: '150px' }}
              htmlType="submit"
              loading={isError ? false : isPending}
            >
              Deactivate
            </AntdButton>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default DeactivateAccount;
