import React from 'react';
import {
  JobPortalHome,
  DashBoard,
  JobSeekerRegistration,
  EmployeeRegistration,
  MyProfile,
  JobApplied,
  ManageJobs,
  PostJobs,
  Profile,
  ShorlistCandidate,
  ChangePassword,
  DeactivateAccount,
  DetailJobView,
  AppliedJobs,
  UploadPhotoJobSeeker,
  UploadPhotoEmployee,
  MyResume,
  ShortListedJobs,
  SavedJobs,
  Search,
  EmployeeDetails,
} from './LazyRoute';
import DynamicTabs from '../components/auth';

export const homeConfig = [
  {
    path: '',
    element: <JobPortalHome />,
  },
  {
    path: 'jobs/:jobtitle/:id',
    element: <DetailJobView />,
  },
  {
    path: 'search',
    element: <Search />,
  },
  {
    path: 'employee/:id',
    element: <EmployeeDetails />,
  },
];

export const authConfig = [
  {
    path: 'auth/register/jobseeker',
    element: <JobSeekerRegistration />,
  },
  {
    path: 'auth/register/employee',
    element: <EmployeeRegistration />,
  },
  {
    path: 'auth/login',
    element: <DynamicTabs dataKey={'login'} />,
  },
];

export const employeeConfig = [
  {
    path: '',
    element: <DashBoard dataKey="employee" />,
  },
  {
    path: 'jobs-applied',
    element: <JobApplied />,
  },
  {
    path: 'manage-jobs',
    element: <ManageJobs />,
  },
  {
    path: 'new-job',
    element: <PostJobs />,
  },
  {
    path: 'edit-job/:id',
    element: <PostJobs />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'short-list-candidates',
    element: <ShorlistCandidate />,
  },
  {
    path: 'upload-photo',
    element: <UploadPhotoEmployee />,
  },
  {
    path: 'change-password',
    element: <ChangePassword />,
  },
  {
    path: 'deactivate-account',
    element: <DeactivateAccount />,
  },
];

export const jobSeekerConfig = [
  {
    path: '',
    element: <DashBoard dataKey={'jobSeeker'} />,
  },
  {
    path: 'jobs-applied',
    element: <AppliedJobs />,
  },
  {
    path: 'manage-jobs',
    element: '',
  },
  {
    path: 'new-job',
    element: '',
  },
  {
    path: 'profile',
    element: <MyProfile />,
  },
  {
    path: 'short-listed-jobs',
    element: <ShortListedJobs />,
  },
  {
    path: 'upload-photo',
    element: <UploadPhotoJobSeeker />,
  },
  {
    path: 'resume',
    element: <MyResume />,
  },
  {
    path: 'saved-jobs',
    element: <SavedJobs />,
  },
  {
    path: 'change-password',
    element: <ChangePassword />,
  },
  {
    path: 'deactivate-account',
    element: <DeactivateAccount />,
  },
];
