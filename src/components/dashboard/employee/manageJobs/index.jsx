import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AntdBreadCum from '../../../../common/AntdBreadCum';
import AntdCards from '../../../../common/AntdCards';

const ManageJobs = () => {
  const { postData } = useOutletContext();
  const navigate = useNavigate();

  const handleCardClick = (e, id, postItems) => {
    e.preventDefault();
    navigate(`/employee/dashboard/edit-job/${id}`, {
      state: { data: postItems },
    });
  };

  return (
    <div>
      <AntdBreadCum array={['Employee', 'Manage Jobs']} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {postData?.map((postItems) => (
          <AntdCards
            key={postItems._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start justify-between min-h-[200px] transition-transform transform hover:scale-105 hover:bg-gray-300"
            onClick={(e) => handleCardClick(e, postItems._id, postItems)}
          >
            <div className="text-lg sm:text-xl font-semibold mb-2 text-[#3d2462]">
              {postItems?.job_title}
            </div>
            <div className="text-sm sm:text-base text-[#3d2462]">
              {postItems?.job_type}
            </div>
            <div className="text-sm sm:text-base text-[#3d2462]">
              Apply Before : {postItems?.apply_before} days
            </div>
            <div className="text-sm sm:text-base text-[#3d2462]">
              {postItems?.job_location}
            </div>
          </AntdCards>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;
