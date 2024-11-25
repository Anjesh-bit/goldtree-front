import { lazy } from 'react';

export const JobPortalHome = lazy(() => import('../features/home/pages'));
export const DashBoard = lazy(
  () => import('../features/dashboard/components/DashBoard')
);
export const JobSeekerRegistration = lazy(
  () => import('../features/auth/pages/register/jobSeeker')
);
export const EmployeeRegistration = lazy(
  () => import('../features/auth/pages/register/employers')
);
export const MyProfile = lazy(
  () => import('../features/dashboard/pages/jobseeker/myProfile')
);
export const JobApplied = lazy(
  () => import('../features/dashboard/pages/employee/jobsApplied')
);
export const ManageJobs = lazy(
  () => import('../features/dashboard/pages/employee/manageJobs')
);
export const PostJobs = lazy(
  () => import('../features/dashboard/pages/employee/posts')
);
export const Profile = lazy(
  () => import('../features/dashboard/pages/employee/profile')
);
export const ShorlistCandidate = lazy(
  () => import('../features/dashboard/pages/employee/shortListCandidates')
);
export const ChangePassword = lazy(
  () => import('../features/dashboard/components/ChangePassword')
);
export const DeactivateAccount = lazy(
  () => import('../features/dashboard/components/DeactivateAccount')
);
export const DetailJobView = lazy(() => import('../features/detailsJob'));
export const AppliedJobs = lazy(
  () => import('../features/dashboard/pages/jobseeker/appliedJobs')
);
export const UploadPhotoJobSeeker = lazy(
  () => import('../features/dashboard/pages/jobseeker/uploadPhoto')
);
export const UploadPhotoEmployee = lazy(
  () => import('../features/dashboard/pages/employee/uploadphoto')
);
export const MyResume = lazy(
  () => import('../features/dashboard/pages/jobseeker/myResume')
);
export const ShortListedJobs = lazy(
  () => import('../features/dashboard/pages/jobseeker/shortListed')
);
export const SavedJobs = lazy(
  () => import('../features/dashboard/pages/jobseeker/savedJobs')
);
export const Search = lazy(() => import('../features/search/pages'));
export const EmployeeDetails = lazy(
  () => import('../features/employeeDetails')
);
