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
        title={`No ${
          isShortList ? 'Shortlisted' : isSavedJobs ? 'Saved' : ''
        } ${statusFilter ? statusFilter : 'Applied'} Jobs Found`}
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
    <div className="bg-[#f8f9fa] min-h-screen py-6 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#08142c] mb-6">
        {isShortList
          ? 'Shortlisted Jobs'
          : isSavedJobs
            ? 'Saved Jobs'
            : 'Applied Jobs'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data.map((items) => {
          const jobDetails = items.jobDetails;
          const jobStatus = items.status;
          const { className, text } = filterHiringStatus(jobStatus);

          return (
            <AntdCards
              key={jobDetails.postId}
              className="
                bg-white
                border
                border-gray-200
                shadow-md
                rounded-xl
                p-5
                flex flex-col justify-between
                min-h-[220px]
                cursor-pointer
                transition-all
                hover:border-[#f1c40f]
                hover:shadow-lg
                hover:-translate-y-1
              "
              onClick={(e) =>
                handleCardClick(e, jobDetails._id, jobDetails.company_name)
              }
            >
              <div className="text-lg font-bold text-[#08142c] mb-2">
                {jobDetails.company_name}
              </div>

              <div className="text-base font-medium text-gray-800 mb-1">
                Job Title:{' '}
                <span className="font-normal">{jobDetails.job_title}</span>
              </div>

              <div className="text-base font-medium text-gray-800 mb-1">
                Location:{' '}
                <span className="font-normal">{jobDetails.job_location}</span>
              </div>

              <div className="text-base font-medium text-gray-800 mb-1">
                Job Level:{' '}
                <span className="font-normal">{jobDetails.job_level}</span>
              </div>

              <div className="mt-3">
                <span
                  className={`
                    inline-block px-3 py-1 rounded-full text-sm font-semibold
                    ${className}
                    ${text === 'Live' ? 'bg-[#f1c40f]/20 text-[#f1c40f]' : ''}
                  `}
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
