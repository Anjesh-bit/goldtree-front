import React from 'react';
import AntdCards from '../../../shared/components/AntdCards';
import { Link } from 'react-router-dom';
import { dashBoardData } from '../../home/home.constant';
import { isAuthenticated } from '../../../shared/utils/auth';
import { useGetPostJobs } from '../../../services/employee/setUp';
import {
  useGetAcceptedJobs,
  useGetPendingJobs,
  useGetRejectedJobs,
} from '../../../services/jobSeeker/setUp';
import { HIRING_STATUS } from '../pages/employee/jobsApplied/jobsApplied.constant';

const DashBoard = ({ dataKey }) => {
  const foundItems = dashBoardData?.find((item) => item.key === dataKey);

  const userId = isAuthenticated()?.id;

  const { data: postData } = useGetPostJobs(userId, '');
  const { data: acceptedJobs } = useGetAcceptedJobs(
    userId,
    HIRING_STATUS.ACCEPTED
  );
  const { data: rejectedJobs } = useGetRejectedJobs(
    userId,
    HIRING_STATUS.REJECTED
  );
  const { data: pendingJobs } = useGetPendingJobs(
    userId,
    HIRING_STATUS.PENDING
  );

  const jobCounts = {
    'posted-jobs': postData?.totalCount ?? 0,
    'accepted-count': acceptedJobs?.totalCount ?? 0,
    'rejected-count': rejectedJobs?.totalCount ?? 0,
    'pending-count': pendingJobs?.totalCount ?? 0,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {foundItems?.data?.map((item) => (
        <Link
          key={item.key}
          to={`/${dataKey === 'jobSeeker' ? 'jobSeeker' : 'employee'}/dashboard/${item.link}${item.link === 'manage-jobs' ? `?status=${item?.status}` : ''}`}
        >
          <AntdCards
            key={item.key}
            className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col items-start justify-between min-h-[200px] transition-transform transform hover:scale-105"
          >
            <div className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-[#3d2462]">
              {item.header}
            </div>
            {['cvs', 'jobStatus'].includes(item.key) && (
              <div className="space-y-1 sm:space-y-2 text-[#3d2462]">
                {item.cvsData.map((subItem) => (
                  <div key={subItem.key} className="text-sm sm:text-base">
                    {item.key === 'cvs' ? subItem.cvsList : subItem.status}
                  </div>
                ))}
              </div>
            )}
            <div className="text-sm sm:text-base text-[#3d2462]">
              {item.subHeader}
            </div>
            {jobCounts[item.key] && (
              <div className="mt-2 sm:mt-4 text-lg font-bold text-[#3d2462]">
                {`(${jobCounts[item.key]})`}
              </div>
            )}
          </AntdCards>
        </Link>
      ))}
    </div>
  );
};

export default DashBoard;
