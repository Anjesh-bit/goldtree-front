import Form, { useForm } from 'antd/es/form/Form';
import AntdButton from '../../shared/components/AntdButtons';
import { AntModal } from '../../shared/components/AntdModal';
import Inputs from '../../shared/components/form/AntdInputs';
import { useUpdateEasyApply } from '../../services/jobSeeker/setUp';
import { useEffect, useState } from 'react';
import useAuthHook from '../../hooks/useAuthHook';
import TextAreas from '../../shared/components/form/AntdTextArea';
import useMessage from '../../hooks/useMessage';

export const ViewForm = ({ open, setOpen }) => {
  const isAuthenticated = useAuthHook(false);

  const [form] = useForm();
  const [files, setFiles] = useState(null);
  const { isSuccess, mutateAsync, isError, isPending } = useUpdateEasyApply();
  const type = isAuthenticated?.type;
  const applyNow = open?.isApplyNow;
  const { contextHolder, showMessage } = useMessage();

  const handleFinish = async (value) => {
    try {
      if (!files) {
        showMessage({
          type: 'error',
          content: 'Please select at least one doc.',
          className: 'mt-[30vh] h-[40px]',
        });
        return;
      }

      const formData = new FormData();
      for (const key in value) {
        if (key !== 'cv_upload') {
          formData.append(key, value[key]);
        }
      }
      if (files) {
        formData.append('cv_upload', files);
      }
      formData.append('type', `${!applyNow ? 'easyApply' : 'directApply'}`);
      formData.append('userId', isAuthenticated?.id);
      formData.append('postId', !applyNow ? open?.data : open?.data?.[0]);
      await mutateAsync(formData);
      setFiles(null);
      form.resetFields();
    } catch (error) {
      if (error?.response.data.error) {
        showMessage({
          type: 'error',
          content: error?.response.data.error,
          className: 'mt-[30vh] h-[40px]',
        });
      }
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFiles(files[0]);
  };

  useEffect(() => {
    if (isSuccess)
      showMessage({
        type: 'success',
        content: 'Your details have been saved successfully.',
        className: 'mt-[30vh] h-[40px]',
      });
  }, [isSuccess]);

  return (
    <AntModal
      open={open}
      setOpen={setOpen}
      title="Apply for Job"
      className="p-6"
    >
      <>
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <div style={{ zIndex: 99999999 }}>{contextHolder}</div>
          {!applyNow && (
            <>
              <Form.Item
                label="Name"
                name="name"
                className="mb-4"
                required
                rules={[{ required: true, message: 'Please enter your name.' }]}
              >
                <Inputs />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="mb-4"
                required
                rules={[
                  { required: true, message: 'Please enter your email' },
                  {
                    type: 'email',
                    message:
                      'Please enter a email address in format test@test.com.',
                  },
                ]}
              >
                <Inputs />
              </Form.Item>
              <Form.Item
                label="Cover Letter"
                name="cover_letter"
                className="mb-4"
              >
                <TextAreas rows="6" />
              </Form.Item>
            </>
          )}
          {(!applyNow || type === 'jobSeeker') && !open?.isSaveJobs && (
            <Form.Item label="Upload CV" name="cv_upload" className="mb-4">
              <Inputs type="file" onChange={handleFileChange} />
            </Form.Item>
          )}
          <Form.Item className="mb-0">
            <AntdButton
              classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors h-8"
              htmlType="submit"
              loading={isError ? false : isPending}
            >
              {applyNow ? 'Apply Now' : 'Easy Apply'}
            </AntdButton>
          </Form.Item>
        </Form>
      </>
    </AntModal>
  );
};
