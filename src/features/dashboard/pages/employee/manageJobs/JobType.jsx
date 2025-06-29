import AntdCards from '../../../../../shared/components/AntdCards';
import { useNavigate } from 'react-router-dom';
import { useGetPostJobs } from '../../../../../services/employee/setUp';
import { filterJobByStatus } from '../employee.utils';
import { EmptyStateWithButton } from '../../components/emptyStateWithButton';
import { isAuthenticated } from '../../../../../shared/utils/auth';
import NoDataSVG from '../../../../../assets/svg/no-data.svg';
import Loading from '../../../../../assets/svg/loading.svg';

export const JobType = ({ activeTab }) => {
  const navigate = useNavigate();
  const { data: postData = [], isLoading: postLoading } = useGetPostJobs(
    isAuthenticated()?.id,
    activeTab
  );

  const handleCardClick = (e, id, postItems) => {
    e.preventDefault();
    navigate(`/employee/dashboard/edit-job/${id}`, {
      state: { data: postItems },
    });
  };

  if (postLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <img src={Loading} alt="Loading" />
      </div>
    );
  }

  const isEmpty = postData.length === 0;

  if (isEmpty) {
    return (
      <EmptyStateWithButton
        image={NoDataSVG}
        title="No Posted Jobs Found."
        description="It seems like you haven't posted any jobs yet. Start exploring opportunities and take the first step toward your dream job!"
        buttonText="Post a new job"
        buttonAction={() => navigate('/employee/dashboard/new-job')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {postData.map((postItems) => {
        const { className, text } = filterJobByStatus(postItems?.status);
        return (
          <AntdCards
            key={postItems._id}
            className="
              bg-white
              border
              border-gray-200
              shadow-md
              rounded-xl
              p-5
              flex flex-col justify-between
              min-h-[220px]
              hover:border-[#f1c40f]
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              cursor-pointer
            "
            onClick={(e) => handleCardClick(e, postItems._id, postItems)}
          >
            <div className="text-lg md:text-xl font-bold text-[#08142c] mb-2">
              {postItems?.job_title}
            </div>

            <div className="text-sm md:text-base text-gray-700 mb-1">
              {postItems?.job_type}
            </div>

            <div className="text-sm md:text-base text-gray-600 mb-1">
              Apply Before:{' '}
              <span className="font-medium">
                {postItems?.apply_before} days
              </span>
            </div>

            <div className="text-sm md:text-base text-gray-600">
              {postItems?.job_location}
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
  );
};
