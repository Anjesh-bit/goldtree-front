import { JOB_STATUS } from '../dashboard.constant';
import { JobType } from './manageJobs/JobType';

const tabConfig = [
  { key: '', label: 'All' },
  { key: JOB_STATUS.LIVE, label: 'Live' },
  { key: JOB_STATUS.CLOSED, label: 'Closed' },
];

export const manageJobsTabItems = (activeTab, status) => {
  return tabConfig.map(({ key, label }) => ({
    key,
    label,
    children: <JobType activeTab={activeTab} status={status} />,
  }));
};
