import React from 'react';
import NoData from '../../../../assets/svg/no-data.svg';

const EmptyState = ({ message = 'No Data Available' }) => (
  <div className="flex items-center justify-center h-[60vh] flex-col">
    <img src={NoData} alt="No Data" className="w-1/2 mb-4" />
    <p className="text-lg font-medium text-gray-500 text-center">{message}</p>
  </div>
);

export default EmptyState;