import React from 'react';
import { useNavigate } from 'react-router-dom';
import AntdCards from '../../../../../shared/components/AntdCards';
import { filterJobByStatus } from '../employee.utils';
import Loading from '../../../../../assets/svg/loading.svg';
import { useGetPostJobs } from '../../../../../services/employee/setUp';
import { isAuthenticated } from '../../../../../shared/utils/auth';
import NoDataSVG from '../../../../../assets/svg/no-data.svg';
import EmptyState from '../../components/emptyStateWithButton';

export const JobType = ({ activeTab }) => {
  const navigate = useNavigate();
  const {
    data: postData = [],
    isLoading: postLoading,
    isError: postError,
  } = useGetPostJobs(isAuthenticated()?.id, activeTab);

  const handleCardClick = (e, id, postItems) => {
    e.preventDefault();
    navigate(`/employee/dashboard/edit-job/${id}`, {
      state: { data: postItems },
    });
  };

  if (postLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <img src={Loading} />
      </div>
    );
  }

  const isEmpty = postData.length === 0;
  if (isEmpty) {
    return (
      <EmptyState
        image={NoDataSVG}
        title="No Posted Jobs Found."
        description="It seems like you haven't posted any jobs yet. Start exploring opportunities and take the first step toward your dream job!"
        buttonText="Post a new job"
        buttonAction={() => navigate('/employee/dashboard/new-job')}
        containerHeight="h-[40vh]"
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {postData?.map((postItems) => {
          const { className, text } = filterJobByStatus(postItems?.status);
          return (
            <AntdCards
              key={postItems._id}
              className={`bg-white shadow-lg rounded-lg p-5 flex flex-col items-start justify-between min-h-[220px] transition-all transform hover:scale-105 hover:bg-gray-300 cursor-pointer`}
              onClick={(e) => handleCardClick(e, postItems._id, postItems)}
            >
              <div className="text-lg sm:text-xl font-semibold mb-2 text-[#3d2462]">
                {postItems?.job_title}
              </div>
              <div className="text-sm sm:text-base text-[#3d2462]">
                {postItems?.job_type}
              </div>
              <div className="text-sm sm:text-base text-[#3d2462]">
                Apply Before: {postItems?.apply_before} days
              </div>
              <div className="text-sm sm:text-base text-[#3d2462]">
                {postItems?.job_location}
              </div>
              <div
                className={`mt-2 text-xs font-medium py-1 px-2 rounded-md ${className}`}
              >
                {text}
              </div>
            </AntdCards>
          );
        })}
      </div>
    </div>
  );
};
