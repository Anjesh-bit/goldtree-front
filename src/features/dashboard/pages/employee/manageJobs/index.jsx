import { useState } from 'react';
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
    <div className="bg-[#f9f9f9] rounded-xl  p-4 md:p-8">
      <AntdBreadCum array={['Employee', 'Manage Jobs']} />
      <AntdTabs
        activeKey={activeKey}
        items={manageJobsTabItems(activeKey)}
        onChange={handleJobApplication}
        centered
        tabBarStyle={{
          background: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          padding: '4px 0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        }}
        tabBarGutter={32}
        className="custom-manage-tabs"
      />
    </div>
  );
};

export default ManageJobs;
