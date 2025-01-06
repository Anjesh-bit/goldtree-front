import React, { useState } from 'react';
import AntdTabs from '../../../../../shared/components/AntdTabs';
import { manageJobsTabItems } from '../employee.constant';
import AntdBreadCum from '../../../../../shared/components/AntdBreadCum';
import { useSearchParams } from 'react-router-dom';

const ManageJobs = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const initialStatus = queryParams.get('status') || '';
  const [activeKey, setActiveKey] = useState(initialStatus);

  const handleJobApplication = (key) => {
    setActiveKey(key);
    setQueryParams({ status: key });
  };

  return (
    <div>
      <AntdBreadCum array={['Employee', 'Manage Jobs']} />
      <AntdTabs
        activeKey={activeKey}
        items={manageJobsTabItems(activeKey)}
        onChange={handleJobApplication}
        centered
        backgroundColor="#f8f9fa"
        tabBarStyle={{
          borderBottom: '2px solid #e0e0e0',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
};

export default ManageJobs;
