import AntdCards from '../../../../shared/components/AntdCards';
import { useAppliedJobs } from '../../hook/useAppliedJobs';
import Loading from '../../../../assets/svg/loading.svg';

const AppliedJobs = ({ isShortList, isSavedJobs }) => {
  const { handleCardClick, appliedJobsData } = useAppliedJobs(
    isSavedJobs,
    isShortList
  );

  if (!appliedJobsData) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <img src={Loading} alt="Loading" />
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-[#3d2462] mb-4 md:mb-0">
            {isShortList
              ? 'Shortlisted Jobs'
              : isSavedJobs
                ? 'Saved Jobs'
                : 'Applied Jobs'}
          </h2>
        </div>
        {appliedJobsData?.data?.map((items) => (
          <AntdCards
            key={items.postId}
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={(e) =>
              handleCardClick(e, items.postId, items.postInfo.company_name)
            }
          >
            <div className="text-lg font-semibold text-[#3d2462] mb-2">
              {items.postInfo.company_name}
            </div>
            <div className="text-md font-medium text-gray-800 mb-1">
              Job Title:{' '}
              <span className="font-normal">{items.postInfo.job_title}</span>
            </div>
            <div className="text-md font-medium text-gray-800 mb-1">
              Job Location:{' '}
              <span className="font-normal">{items.postInfo.job_location}</span>
            </div>
            <div className="text-md font-medium text-gray-800">
              Job Level:{' '}
              <span className="font-normal">{items.postInfo.job_level}</span>
            </div>
          </AntdCards>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;