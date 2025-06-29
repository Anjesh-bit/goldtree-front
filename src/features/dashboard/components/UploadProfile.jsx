import { Form } from 'antd';
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
      if (e.response?.data?.error) {
        showMessage({
          type: 'error',
          content: e.response.data.error,
          className: 'mt-4',
        });
      }
    }
  };

  const handleOnChange = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith('image/')) {
      showMessage({
        type: 'error',
        content: 'Please select a valid image file.',
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
    if (isSuccess) {
      showMessage({
        type: 'success',
        content: 'Profile image has been uploaded successfully.',
        className: 'mt-4',
      });
      setFiles(null);
      setPreview('');
      form.resetFields();
    }
  }, [isSuccess, form]);

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        onFinish={handleOnFinish}
        layout="vertical"
        className="p-6 space-y-6 bg-[#f9f9f9] rounded-xl  border border-gray-100"
      >
        <Form.Item
          label={
            <div className="text-xl md:text-2xl font-semibold text-[#08142c] mb-4">
              Upload Profile Image
            </div>
          }
        >
          <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-[#fdfdfd] hover:border-[#f1c40f] transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleOnChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="flex items-center justify-center text-[#08142c] border border-[#08142c] px-4 py-2 rounded-md font-medium hover:bg-[#08142c] hover:text-white transition-colors"
            >
              Choose File
            </button>
            {preview && (
              <div className="mt-4 border rounded overflow-hidden shadow-md">
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-48 h-48 object-cover"
                />
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item>
          <AntdButton
            classNames="
              bg-[#f1c40f] 
              text-[#08142c] 
              font-semibold 
              px-6 
              py-2 
              rounded-md 
              hover:bg-[#d4b80e] 
              transition-colors
              shadow
            "
            htmlType="submit"
            loading={updateError ? false : updatePending}
          >
            Save Image
          </AntdButton>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadProfile;
