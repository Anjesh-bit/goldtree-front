import Form, { useForm } from "antd/es/form/Form";
import AntdButton from "../../common/AntdButtons";
import { AntModal } from "../../common/AntdModal";
import Inputs from "../../common/form/AntdInputs";
import { useUpdateEasyApply } from "../../services/jobSeeker/setUp";
import { useEffect, useState } from "react";
import DynamicLogin from "../auth/DynamicLogin";
import useAuthHook from "../../hooks/useAuthHook";
import TextAreas from "../../common/form/AntdTextArea";

const ViewForm = ({ open, setOpen }) => {
  const isAuthenticated = useAuthHook(false);
  const [form] = useForm();
  const [files, setFiles] = useState(null);
  const easyApply = useUpdateEasyApply();
  const type = isAuthenticated?.type;
  const applyNow = open?.isApplyNow;

  const handleFinish = async (value) => {
    try {
      const formData = new FormData();
      for (const key in value) {
        if (key !== "cv_upload") {
          formData.append(key, value[key]);
        }
      }
      if (files) {
        formData.append("cv_upload", files);
      }
      formData.append("type", `${!applyNow ? "easyApply" : "directApply"}`);
      formData.append("userId", isAuthenticated?.id);
      formData.append("postId", !applyNow ? open?.data : open?.data?.[0]);
      await easyApply.mutateAsync(formData);
      setFiles(null);
      form.resetFields();
    } catch (error) {
      console.error("Error occurred during easy apply:", error);
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFiles(files[0]);
  };

  return (
    <AntModal
      open={open}
      setOpen={setOpen}
      title="Apply for Job"
      className="p-6"
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        {!applyNow && (
          <>
            <Form.Item label="Name" name="name" className="mb-4">
              <Inputs />
            </Form.Item>
            <Form.Item label="Email" name="email" className="mb-4">
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
        {(!applyNow || type === "jobSeeker") && !open?.isSaveJobs && (
          <Form.Item label="Upload CV" name="cv_upload" className="mb-4">
            <Inputs type="file" onChange={handleFileChange} />
          </Form.Item>
        )}
        {applyNow && !isAuthenticated ? (
          <DynamicLogin modalData={open?.data} setOpen={setOpen} />
        ) : (
          <Form.Item className="mb-0">
            <AntdButton
              classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors h-8"
              htmlType="submit"
              loading={easyApply?.isError ? false : easyApply?.isPending}
            >
              {applyNow ? "Apply Now" : "Easy Apply"}
            </AntdButton>
          </Form.Item>
        )}
      </Form>
    </AntModal>
  );
};

export default ViewForm;
