import React from 'react';
import { dashBoardData } from '../home/Data';
import AntdCards from '../../shared/components/AntdCards';
import { Link, useOutletContext } from 'react-router-dom';

const DashBoard = ({ dataKey }) => {
  const outletContext = useOutletContext();
  const postData = outletContext?.postData;
  const foundItems = dashBoardData?.find((item) => item.key === dataKey);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {foundItems?.data?.map((item) => (
        <Link
          to={`/${
            dataKey === 'jobSeeker' ? 'jobSeeker' : 'employee'
          }/dashboard/${item.link}`}
        >
          <AntdCards
            key={item.key}
            className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col items-start justify-between min-h-[200px] transition-transform transform hover:scale-105"
          >
            <div className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-[#3d2462]">
              {item.header}
            </div>
            {item.key === 'cvs' && (
              <div className="space-y-1 sm:space-y-2 text-[#3d2462]">
                {item.cvsData.map((subItem) => (
                  <div key={subItem.key} className="text-sm sm:text-base">
                    {subItem.cvsList}
                  </div>
                ))}
              </div>
            )}
            {item.key === 'jobStatus' && (
              <div className="space-y-1 sm:space-y-2 text-[#3d2462]">
                {item.cvsData.map((subItem) => (
                  <div key={subItem.key} className="text-sm sm:text-base">
                    {subItem.status}
                  </div>
                ))}
              </div>
            )}
            <div className="text-sm sm:text-base text-[#3d2462]">
              {item.subHeader}
            </div>

            {item.key === 'postedJobs' && (
              <div className="mt-2 sm:mt-4 text-lg font-bold text-[#3d2462]">
                {`(${postData?.length || 0})`}
              </div>
            )}
          </AntdCards>
        </Link>
      ))}
    </div>
  );
};

export default DashBoard;
