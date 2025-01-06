import { Form } from 'antd';
import Inputs from '../../../shared/components/form/AntdInputs';
import { useEffect, useState } from 'react';
import { useUpdateProfile } from '../../../services/commonService/setUp';
import AntdButton from '../../../shared/components/AntdButtons';
import useMessage from '../../../hooks/useMessage';
import { isAuthenticated } from '../../../shared/utils/auth';

const { useForm } = Form;

const UploadProfile = ({ type }) => {
  const [form] = useForm();
  const [files, setFiles] = useState(null);
  const [preview, setPreview] = useState('');
  const { contextHolder, showMessage } = useMessage();
  const typeData = type === 'jobSeeker' ? 'jobSeeker' : 'employee';
  const {
    isError: updateError,
    isPending: updatePending,
    mutateAsync: updateMutate,
    isSuccess,
  } = useUpdateProfile(typeData, isAuthenticated()?.id);

  const handleOnFinish = async () => {
    try {
      if (!files) {
        showMessage({
          type: 'error',
          content: 'Please select at least one image.',
          className: 'mt-4',
        });
        return;
      }

      const formData = new FormData();
      formData.append('profile_image', files);
      await updateMutate(formData);
    } catch (e) {
      if (e.response?.data?.error)
        showMessage({
          type: 'error',
          content: e.response.data.error,
          className: 'mt-4',
        });
    }
  };

  const handleOnChange = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith('image/')) {
      showMessage({
        type: 'error',
        content: 'Please select the image.',
        className: 'mt-4',
      });
      setFiles(null);
      setPreview('');
      return;
    }

    setFiles(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess)
      showMessage({
        type: 'success',
        content: 'Image have been saved successfully',
        className: 'mt-4',
      });
    setFiles(null);
    setPreview('');
  }, [isSuccess, form]);

  return (
    <>
      {contextHolder}
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
          <div className="relative flex flex-col items-center justify-center border border-gray-300 rounded-md p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleOnChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="flex items-center justify-center w-full py-2 px-4 font-semibold"
            >
              Choose File
            </button>
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-64 h-64 object-contain  border"
                />
              </div>
            )}
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
    </>
  );
};

export default UploadProfile;
