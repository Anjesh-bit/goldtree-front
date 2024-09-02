import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const getItem = (label, key, icon, path) => {
  return {
    key,
    icon,
    label,
    path,
  };
};

export const employeeSiderRoutes = [
  getItem('Dashboard', 'dashboard', <PieChartOutlined />, ''),
  getItem(
    'My Profile',
    'profile',
    <DesktopOutlined />,
    '/employee/dashboard/profile'
  ),
  getItem(
    'Post A New Job',
    'newJob',
    <FileOutlined />,
    '/employee/dashboard/new-job'
  ),
  getItem(
    'Manage Jobs',
    'manageJobs',
    <FileOutlined />,
    '/employee/dashboard/manage-jobs'
  ),
  getItem(
    'Jobs Applied Candidate',
    'jobsApplied',
    <FileOutlined />,
    '/employee/dashboard/jobs-applied'
  ),
  getItem(
    'Upload A Photo',
    'uploadPhoto',
    <FileOutlined />,
    '/employee/dashboard/upload-photo'
  ),
  getItem(
    'Short Listed Candidates',
    'shortList',
    <FileOutlined />,
    '/employee/dashboard/short-list-candidates'
  ),
  getItem(
    'Changed Password',
    'changePass',
    <FileOutlined />,
    '/employee/dashboard/change-password'
  ),
  getItem(
    'Deactivate Account',
    'deactivateAcc',
    <FileOutlined />,
    '/employee/dashboard/deactivate-account'
  ),
];

export const JobSeekerSiderRoutes = [
  getItem('Dashboard', 'dashboard', <PieChartOutlined />, ''),
  getItem(
    'My Profile',
    'profile',
    <DesktopOutlined />,
    '/jobSeeker/dashboard/profile'
  ),
  getItem(
    'Upload Photo',
    'photo',
    <FileOutlined />,
    '/jobSeeker/dashboard/upload-photo'
  ),
  getItem(
    'My Resume',
    'resume',
    <FileOutlined />,
    '/jobSeeker/dashboard/resume'
  ),
  getItem(
    'Applied Jobs',
    'jobsApplied',
    <FileOutlined />,
    '/jobSeeker/dashboard/jobs-applied'
  ),
  getItem(
    'Short Listed Jobs',
    'shortList',
    <FileOutlined />,
    '/jobSeeker/dashboard/short-listed-jobs'
  ),
  getItem(
    'Job Alerts',
    'jobAlerts',
    <FileOutlined />,
    '/jobSeeker/dashboard/job-alerts'
  ),
  getItem(
    'Saved Jobs',
    'savedJobs',
    <FileOutlined />,
    '/jobSeeker/dashboard/saved-jobs'
  ),
  getItem(
    'Changed Password',
    'changePass',
    <FileOutlined />,
    '/jobSeeker/dashboard/change-password'
  ),
  getItem(
    'Deactivate Account',
    'deactivateAcc',
    <FileOutlined />,
    '/jobSeeker/dashboard/deactivate-account'
  ),
];
