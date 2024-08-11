import { useParams } from "react-router-dom";
import { useGetSinglePost } from "../../services/employee/setUp";
import AntdCards from "../../common/AntdCards";
import { Tag, Skeleton } from "antd";
import AntdButton from "../../common/AntdButtons";
import { useState } from "react";
import ViewForm from "./ViewForm";

import { useSavedJobs } from "../../services/jobSeeker/setUp";
import useMessage from "../../hooks/useMessage";
import useAuthHook from "../../hooks/useAuthHook";

const DetailJobView = () => {
  const isAuthenticated = useAuthHook(false);
  const [open, setOpen] = useState({ open: false });
  const [id, setId] = useState("");
  const params = useParams();

  const {
    data: singlePostData,
    isLoading: singlePostLoading,
    isError: singlePostError,
  } = useGetSinglePost(params?.id);

  const { mutateAsync, isPending, isError } = useSavedJobs(
    id,
    isAuthenticated?.id
  );
  const { contextHolder, showMessage } = useMessage();

  const handleClick = (e, filter, id) => {
    e.preventDefault();
    const isOpen = filter === "easy";
    const isSaveJobs = filter === "saveJobs";

    if (isAuthenticated && isSaveJobs) {
      setId(id);
      const savedJobs = async () => {
        try {
          await mutateAsync();
          showMessage({
            type: "success",
            content: "The job has been successfully saved.",
            className: "mt-[30vh] h-[40px]",
          });
        } catch (error) {
          const apiMessage = error?.response?.data?.message;
          if (apiMessage) {
            showMessage({
              type: "info",
              content: apiMessage,
              className: "mt-[30vh] h-[40px]",
            });
          }
        }
      };
      savedJobs();
    } else {
      const postData = isOpen
        ? singlePostData?._id
        : [singlePostData?._id, singlePostData?.company_name];

      setOpen({
        open: true,
        data: postData,
        isApplyNow: !isOpen,
        isSaveJobs,
      });
    }
  };

  if (singlePostLoading && !singlePostError) {
    return (
      <div className="px-[50px] py-[20px]">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="px-[50px] py-[20px] space-y-6">
        <AntdCards className="p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900">
            {singlePostData?.company_name}
          </h1>
          <p className="text-lg text-gray-700">
            {singlePostData?.job_location}
          </p>
          <p className="text-lg text-gray-700">
            {singlePostData?.industry_type}
          </p>
          <div
            className="mt-4 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: singlePostData?.company_description,
            }}
          />
          <AntdButton
            classNames="bg-[#242021] !border-none text-white px-7 h-10 mt-4 transition-colors duration-300 ease-in-out hover:!bg-[#333] hover:!shadow-lg hover:!text-white"
            onClick={(e) => handleClick(e, "saveJobs", singlePostData?._id)}
          >
            Save Job
          </AntdButton>
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {singlePostData?.job_title}
            </h2>
            <span className="text-sm text-gray-500">
              Apply Before: {singlePostData?.apply_before} days
            </span>
          </div>

          <div className="mt-4 text-gray-600">
            <h3 className="font-semibold text-lg">Job Summary:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              <div>No. of Vacancy: {singlePostData?.no_of_vacancy}</div>
              <div>Job Type: {singlePostData?.job_type}</div>
              <div>Offered Salary: {singlePostData?.salary}</div>
              <div>
                Gender:{" "}
                {singlePostData?.gender === "m"
                  ? "Male"
                  : singlePostData?.gender === "f"
                  ? "Female"
                  : "Others"}
              </div>
              <div>Career Level: {singlePostData?.job_level}</div>
              <div>Experience: {singlePostData?.exp_required}</div>
              <div className="col-span-full">
                Skills:{" "}
                {singlePostData?.skills?.map((skill) => (
                  <Tag
                    key={skill}
                    color={`#${Math.floor(Math.random() * 16777215)
                      .toString(16)
                      .padStart(6, "0")}`}
                    className="mr-2 mb-2"
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">
            Job Description:
          </h3>
          <div
            className="mt-2 text-gray-600"
            dangerouslySetInnerHTML={{ __html: singlePostData?.job_desc }}
          />
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">Job Benefits:</h3>
          <div
            className="mt-2 text-gray-600"
            dangerouslySetInnerHTML={{ __html: singlePostData?.job_benefits }}
          />
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">
            Required Knowledge, Skills, and Abilities:
          </h3>
          <div
            className="mt-2 text-gray-600"
            dangerouslySetInnerHTML={{ __html: singlePostData?.job_spec }}
          />
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">
            Education + Experience:
          </h3>
          <div
            className="mt-2 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: singlePostData?.education_qual_desc,
            }}
          />
        </AntdCards>

        {singlePostData?.is_apply_instruction === "m" && (
          <AntdCards className="p-6 bg-white shadow-md rounded-lg">
            <p className="text-gray-700">
              Interested candidates fulfilling the mentioned criteria are
              encouraged to Apply using the Easy Apply Button below. Registered
              candidates may also apply using Apply Now Button.
            </p>
            <div className="flex gap-4 mt-4">
              <AntdButton
                classNames="bg-[#242021] !border-none text-white px-7 h-10 transition-colors duration-300 ease-in-out hover:!bg-[#333] hover:!shadow-lg hover:!text-white"
                onClick={(e) => handleClick(e, "easy")}
              >
                Easy Apply
              </AntdButton>
              <AntdButton
                classNames="bg-[#242021] !border-none text-white px-7 h-10 transition-colors duration-300 ease-in-out hover:!bg-[#333] hover:!shadow-lg hover:!text-white"
                onClick={(e) => handleClick(e, "now")}
              >
                Apply Now
              </AntdButton>
            </div>
          </AntdCards>
        )}

        <ViewForm open={open} setOpen={(e) => setOpen(e)} />
      </div>
    </>
  );
};

export default DetailJobView;
