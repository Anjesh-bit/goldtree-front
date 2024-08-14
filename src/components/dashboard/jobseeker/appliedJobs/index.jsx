import { useNavigate } from "react-router-dom";
import AntdCards from "../../../../common/AntdCards";
import {
  useGetJobsApplied,
  useGetSavedJobs,
  useGetShortListed,
} from "../../../../services/jobSeeker/setUp";

import useAuthHook from "../../../../hooks/useAuthHook";
import Loading from "../../../../assets/svg/loading.svg";

const AppliedJobs = ({ isShorList, isSavedJobs }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthHook(false);
  const {
    data: appliedJobs,
    isLoading: appliedIsLoading,
    isError: appliedIsError,
  } = useGetJobsApplied(isAuthenticated?.id, isShorList, isSavedJobs);

  const {
    data: savedJobs,
    isPending,
    isError: savedError,
  } = useGetSavedJobs(isAuthenticated?.id, isSavedJobs);

  const { data, isLoading, isError } = useGetShortListed(
    isAuthenticated?.id,
    "directApply",
    isShorList
  );

  const handleCardClick = (e, postId, name) => {
    e.preventDefault();
    if (postId && name) {
      navigate(`/jobs/${name}/${postId}`, { replace: true });
    }
  };

  const mappedData = isShorList
    ? data?.[0]
    : isSavedJobs
    ? savedJobs?.[0]
    : appliedJobs?.[0];

  if (!mappedData) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <img src={Loading} />
      </div>
    );
  }
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-[#3d2462] mb-4 md:mb-0">
            {isShorList
              ? "Shortlisted Jobs"
              : isSavedJobs
              ? "Saved Jobs"
              : "Applied Jobs"}
          </h2>
        </div>
        {mappedData?.data?.map((items) => (
          <AntdCards
            key={items.postId}
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-[#e0e0e0] transition-colors"
            onClick={(e) =>
              handleCardClick(e, items.postId, items.postInfo.company_name)
            }
          >
            <div className="text-lg font-semibold text-[#3d2462] mb-2">
              {items.postInfo.company_name}
            </div>
            <div className="text-md font-medium text-gray-800 mb-1">
              Job Title:{" "}
              <span className="font-normal">{items.postInfo.job_title}</span>
            </div>
            <div className="text-md font-medium text-gray-800 mb-1">
              Job Location:{" "}
              <span className="font-normal">{items.postInfo.job_location}</span>
            </div>
            <div className="text-md font-medium text-gray-800">
              Job Level:{" "}
              <span className="font-normal">{items.postInfo.job_level}</span>
            </div>
          </AntdCards>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
