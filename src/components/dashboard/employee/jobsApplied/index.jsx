import { Fragment, useState } from "react";
import AntdCards from "../../../../common/AntdCards";
import { useGetEasyApply } from "../../../../services/jobSeeker/setUp";
import AntdButton from "../../../../common/AntdButtons";
import { useShortList } from "../../../../services/commonService/setUp";
import useMessage from "../../../../hooks/useMessage";

const JobApplied = () => {
  const { data, isLoading, isError } = useGetEasyApply();

  const [queryParams, setQueryParams] = useState({
    uploadId: "",
    type: "",
  });

  const {
    data: shortListedData,
    isPending,
    isError: errorShortListed,
    isSuccess,
    mutateAsync,
  } = useShortList(queryParams);

  const { contextHolder, showMessage } = useMessage();

  const handleOnClick = async (_, uploadId, type) => {
    setQueryParams({
      shortList: "shortlist",
      uploadId: uploadId,
      type,
    });

    try {
      await mutateAsync();
      showMessage({
        type: "info",
        content: "Candidates have successfully shortlisted",
        className: "mt-[30vh] h-[40px]",
      });
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      showMessage({
        type: "error",
        content: apiMessage,
        className: "mt-[30vh] h-[40px]",
      });
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <div className="py-4">
        {data?.map((items) => {
          const jobTitle = items?.post?.job_title;

          return (
            <div className="mb-2" key={items.email}>
              <div>
                <span className="font-bold text-lg">JobTitle : </span>
                <span className="font-semibold">{jobTitle}</span>
              </div>
              <div className="grid grid-cols-12 w-full gap-2">
                <AntdCards className="col-span-12 p-4 bg-[#f5f5f5]">
                  <div className="font-semibold">Candidates Applied :</div>
                  <div className="grid grid-cols-12 w-full gap-2">
                    {items?.candidates?.map((candidate) => {
                      const url = candidate?.upload_cv?.substring(
                        candidate?.upload_cv?.lastIndexOf("/") + 1
                      );
                      const { jobSeekerProfile = [] } = candidate;
                      const hasProfile = jobSeekerProfile.length > 0;

                      const { profile } = hasProfile ? jobSeekerProfile[0] : {};
                      const name = profile?.full_name || candidate.name;
                      const phoneNo = profile?.phone_no || candidate.email;

                      return (
                        <AntdCards
                          className="col-span-4 p-4"
                          key={candidate._id}
                        >
                          <AntdButton
                            classNames="bg-[#f5f5f5] !border-none px-7 h-8 rounded-r-full text-[#f09b1e] font-medium"
                            onClick={(e) =>
                              handleOnClick(e, candidate._id, candidate.type)
                            }
                          >
                            ShortList
                          </AntdButton>
                          <div>Name: {name}</div>
                          <div>Cover Letter: {candidate.cover_letter}</div>
                          <div>Email / Phone: {phoneNo}</div>
                          <div>
                            Resume:{" "}
                            <a
                              href={candidate.upload_cv}
                              download={url}
                              target="_blank"
                            >
                              {url}
                            </a>
                          </div>
                        </AntdCards>
                      );
                    })}
                  </div>
                </AntdCards>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default JobApplied;
