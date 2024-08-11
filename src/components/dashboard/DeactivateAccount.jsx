import { Descriptions } from "antd";
import AntdButton from "../../common/AntdButtons";
import { AntRadio } from "../../common/form/AntdRadioGroup";

const applyOnlineOptions = [
  { option: "This is temporary. I'll be back.", value: "y" },
  { option: "I don't find it useful.", value: "n" },
  { option: "I have a privacy concern.", value: "n" },
  { option: "My account was hacked.", value: "n" },
  {
    option: "I got too many emails and notifications from GoldTree.",
    value: "n",
  },
  { option: "Others...", value: "n" },
];

const DeactivateAccount = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <Descriptions
        title="Are You Sure You Want To Deactivate Your Account?"
        layout="vertical"
        colon={false}
        className="mb-6"
      >
        <Descriptions.Item>
          <p className="text-gray-700">
            Deactivating your account will disable your profile and remove your
            name from most things, such as job alerts.
          </p>
        </Descriptions.Item>
        <Descriptions.Item label="Reason for leaving" span={3}>
          <AntRadio options={applyOnlineOptions} deactivateAccount />
        </Descriptions.Item>
      </Descriptions>
      <div className="flex justify-end">
        <AntdButton
          classNames="bg-[#242021] text-white border-none px-7 rounded-md hover:bg-[#1e1d1b]"
          style={{ width: "150px" }}
        >
          Update
        </AntdButton>
      </div>
    </div>
  );
};

export default DeactivateAccount;
