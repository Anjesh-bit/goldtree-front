import AntdCards from '../../../../../shared/components/AntdCards';
import { useAppliedJobs } from '../../../hooks/useAppliedJobs';
import Loading from '../../../../../assets/svg/loading.svg';
import NoDataSVG from '../../../../../assets/svg/no-data.svg';
import { EmptyStateWithButton } from '../../components/emptyStateWithButton';
import { filterHiringStatus } from '../../../dashboard.utils';

const AppliedJobs = ({ isShortList, isSavedJobs }) => {
  const { handleCardClick, jobsData, statusFilter } = useAppliedJobs(
    isSavedJobs,
    isShortList
  );

  const { data, isLoading } = jobsData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <img src={Loading} alt="Loading" />
      </div>
    );
  }

  const isEmptyData = data?.data.length === 0;

  if (isEmptyData) {
    return (
      <EmptyStateWithButton
        image={NoDataSVG}
        title={`No ${isShortList ? 'Shortlisted' : isSavedJobs ? 'Saved' : ''} ${statusFilter ? statusFilter : 'Applied'} Jobs Found`}
        description={`It seems like you haven't ${
          isShortList ? 'shortlisted' : isSavedJobs ? 'saved' : 'applied for'
        } any jobs yet. Start exploring opportunities and take the first step toward your dream job!`}
        buttonText="Explore Jobs"
        buttonAction={() => {}}
        containerHeight="h-[80vh]"
      />
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
        {data?.data.map((items) => {
          const jobDetails = items.jobDetails;
          const jobStatus = items.status;
          const { className, text } = filterHiringStatus(jobStatus);

          return (
            <AntdCards
              key={jobDetails.postId}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition-colors"
              onClick={(e) =>
                handleCardClick(e, jobDetails._id, jobDetails.company_name)
              }
            >
              <div className="text-lg font-semibold text-[#3d2462] mb-2">
                {jobDetails.company_name}
              </div>
              <div className="text-md font-medium text-gray-800 mb-1">
                Job Title:{' '}
                <span className="font-normal">{jobDetails.job_title}</span>
              </div>
              <div className="text-md font-medium text-gray-800 mb-1">
                Job Location:{' '}
                <span className="font-normal">{jobDetails.job_location}</span>
              </div>
              <div className="text-md font-medium text-gray-800 mb-1">
                Job Level:{' '}
                <span className="font-normal">{jobDetails.job_level}</span>
              </div>
              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${className}`}
                >
                  {text}
                </span>
              </div>
            </AntdCards>
          );
        })}
      </div>
    </div>
  );
};

export default AppliedJobs;
