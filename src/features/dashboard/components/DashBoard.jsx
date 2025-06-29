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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {foundItems?.data?.map((item) => (
        <Link
          key={item.key}
          to={`/${dataKey === 'jobSeeker' ? 'jobSeeker' : 'employee'}/dashboard/${item.link}${item.link === 'manage-jobs' ? `?status=${item?.status}` : ''}`}
        >
          <AntdCards
            key={item.key}
            className="
              bg-white
              shadow-sm
              border
              border-gray-200
              rounded-xl
              p-5
              flex flex-col justify-between
              min-h-[220px]
              hover:shadow-lg
              hover:border-[#f1c40f]
              hover:-translate-y-1
              transition-all duration-300
              group
            "
          >
            <div className="text-lg md:text-xl font-bold text-[#08142c] mb-2">
              {item.header}
            </div>

            {['cvs', 'jobStatus'].includes(item.key) && (
              <div className="space-y-1 text-gray-700">
                {item.cvsData.map((subItem) => (
                  <div
                    key={subItem.key}
                    className="text-sm md:text-base flex items-center gap-2"
                  >
                    <span className="inline-block w-2 h-2 bg-[#f1c40f] rounded-full"></span>
                    {item.key === 'cvs' ? subItem.cvsList : subItem.status}
                  </div>
                ))}
              </div>
            )}

            <div className="text-sm text-gray-600 mt-2">{item.subHeader}</div>

            {jobCounts[item.key] > 0 && (
              <div className="mt-4 text-lg font-bold text-[#f1c40f]">
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
