import { Form } from "antd";
import Inputs from "../../common/form/AntdInputs";
import { useState } from "react";
import { useUpdateProfile } from "../../services/commonService/setUp";
import AntdButton from "../../common/AntdButtons";
import useAuthHook from "../../hooks/useAuthHook";

const { useForm } = Form;

const UploadProfile = ({ type }) => {
  const [form] = useForm();
  const isAuthenticated = useAuthHook(false);
  const [files, setFiles] = useState("");
  const typeData = type === "jobSeeker" ? "jobSeeker" : "employee";
  const {
    isError: updateError,
    isPending: updatePending,
    mutateAsync: updateMutate,
  } = useUpdateProfile(typeData, isAuthenticated?.id);

  const handleOnFinish = () => {
    try {
      const formData = new FormData();
      formData.append("profile_image", files);
      updateMutate(formData);
    } catch (e) {
      // Handle error if needed
    }
  };

  const handleOnChange = (e) => {
    const { files } = e.target;
    setFiles(files[0]);
  };

  return (
    <Form
      form={form}
      onFinish={handleOnFinish}
      layout="vertical"
      className="p-6 space-y-6 bg-white rounded-lg shadow-md"
    >
      <Form.Item
        label={
          <div className="text-xl md:text-2xl font-medium text-[#3d2462] mb-4 md:mb-0">
            Upload Profile Image
          </div>
        }
        className="mb-4"
      >
        <div className="relative flex items-center justify-center border border-gray-300 rounded-md">
          <input
            type="file"
            onChange={handleOnChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 px-4 font-semibold"
          >
            Choose File
          </button>
        </div>
      </Form.Item>
      <Form.Item>
        <AntdButton
          classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
          htmlType="submit"
          loading={updateError ? false : updatePending}
        >
          Save
        </AntdButton>
      </Form.Item>
    </Form>
  );
};

export default UploadProfile;
