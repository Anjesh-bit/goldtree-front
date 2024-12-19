import {
  AlertOutlined,
  DashboardOutlined,
  FilePdfOutlined,
  AppstoreAddOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
  KeyOutlined,
  SaveOutlined,
  ProfileOutlined,
  UploadOutlined,
  UserDeleteOutlined,
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
  getItem('Dashboard', 'dashboard', <DashboardOutlined />, ''),
  getItem(
    'My Profile',
    'profile',
    <ProfileOutlined />,
    '/employee/dashboard/profile'
  ),
  getItem(
    'Post A New Job',
    'newJob',
    <ProfileOutlined />,
    '/employee/dashboard/new-job'
  ),
  getItem(
    'Manage Jobs',
    'manageJobs',
    <AppstoreAddOutlined />,
    '/employee/dashboard/manage-jobs'
  ),
  getItem(
    'Jobs Applied Candidate',
    'jobsApplied',
    <UserAddOutlined />,
    '/employee/dashboard/jobs-applied'
  ),
  getItem(
    'Upload A Photo',
    'uploadPhoto',
    <UploadOutlined />,
    '/employee/dashboard/upload-photo'
  ),
  getItem(
    'Short Listed Candidates',
    'shortList',
    <CheckCircleOutlined />,
    '/employee/dashboard/short-list-candidates'
  ),
  getItem(
    'Changed Password',
    'changePass',
    <KeyOutlined />,
    '/employee/dashboard/change-password'
  ),
  getItem(
    'Deactivate Account',
    'deactivateAcc',
    <UserDeleteOutlined />,
    '/employee/dashboard/deactivate-account'
  ),
];

export const JobSeekerSiderRoutes = [
  getItem('Dashboard', 'dashboard', <DashboardOutlined />, ''),
  getItem(
    'My Profile',
    'profile',
    <ProfileOutlined />,
    '/jobSeeker/dashboard/profile'
  ),
  getItem(
    'Upload Photo',
    'photo',
    <UploadOutlined />,
    '/jobSeeker/dashboard/upload-photo'
  ),
  getItem(
    'My Resume',
    'resume',
    <FilePdfOutlined />,
    '/jobSeeker/dashboard/resume'
  ),
  getItem(
    'Applied Jobs',
    'jobsApplied',
    <UserAddOutlined />,
    '/jobSeeker/dashboard/jobs-applied'
  ),
  getItem(
    'Short Listed Jobs',
    'shortList',
    <CheckCircleOutlined />,
    '/jobSeeker/dashboard/short-listed-jobs'
  ),
  getItem(
    'Job Alerts',
    'jobAlerts',
    <AlertOutlined />,
    '/jobSeeker/dashboard/job-alerts'
  ),
  getItem(
    'Saved Jobs',
    'savedJobs',
    <SaveOutlined />,
    '/jobSeeker/dashboard/saved-jobs'
  ),
  getItem(
    'Changed Password',
    'changePass',
    <KeyOutlined />,
    '/jobSeeker/dashboard/change-password'
  ),
  getItem(
    'Deactivate Account',
    'deactivateAcc',
    <UserDeleteOutlined />,
    '/jobSeeker/dashboard/deactivate-account'
  ),
];
