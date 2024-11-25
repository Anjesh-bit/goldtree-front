import AntdTabs from '../../shared/components/AntdTabs';
import DynamicRegistration from './components/DynamicRegistration';
import EmployeeLogin from './pages/signIn/employer';
import JobSeekerLogin from './pages/signIn/jobSeeker';

const tabItems = [
  {
    key: 'login',
    tabItems: [
      {
        label: 'Job Seeker',
        children: <JobSeekerLogin />,
        key: 'job_seeker',
      },
      {
        label: 'Employer',
        children: <EmployeeLogin />,
        key: 'employee',
      },
    ],
  },
  {
    key: 'registration',
    tabItems: [
      {
        label: 'Job Seeker',
        children: <DynamicRegistration visibleTabs />,
        key: 'job_seeker',
      },
      {
        label: 'Employer',
        children: <DynamicRegistration visibleTabs isEmployeeTabItems />,
        key: 'employee',
      },
    ],
  },
];

const DynamicTabs = ({ dataKey }) => {
  const handleOnChangeTabs = (keys) => {};
  const foundItems = tabItems?.find((items) => items.key === dataKey);
  const tabItemsFound = foundItems?.tabItems;

  return (
    <div>
      <AntdTabs items={tabItemsFound} onChange={handleOnChangeTabs} centered />
    </div>
  );
};

export default DynamicTabs;
