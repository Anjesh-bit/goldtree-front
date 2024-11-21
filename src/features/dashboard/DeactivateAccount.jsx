import { Descriptions, Form } from 'antd';
import AntdButton from '../../shared/components/AntdButtons';
import { AntRadio } from '../../shared/components/form/AntdRadioGroup';
import { useAccountManagement } from './hook/useAccountManagement';
import { AppConstant } from '../../shared/constants';

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
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        <Descriptions
          title="Are You Sure You Want To Deactivate Your Account?"
          layout="vertical"
          colon={false}
          className="mb-6"
        >
          <Descriptions.Item>
            <p className="text-gray-700">
              Deactivating your account will disable your profile and remove
              your name from most things, such as job alerts.
            </p>
          </Descriptions.Item>
          <Descriptions.Item label="Reason for leaving" span={3}>
            <AntRadio
              name="deactivate_reason"
              options={applyOnlineOptions}
              deactivateAccount
              onChange={handleRadioChange}
            />
          </Descriptions.Item>
        </Descriptions>
        <div className="flex justify-end">
          <AntdButton
            classNames="bg-[#242021] text-white border-none px-7 rounded-md hover:bg-[#1e1d1b]"
            style={{ width: '150px' }}
            htmlType="submit"
            loading={isError ? false : isPending}
          >
            Update
          </AntdButton>
        </div>
      </div>
    </Form>
  );
};

export default DeactivateAccount;
