import { lazy } from 'react';

export const JobPortalHome = lazy(() => import('../features/home'));
export const DashBoard = lazy(() => import('../features/dashboard/DashBoard'));
export const JobSeekerRegistration = lazy(
  () => import('../features/auth/register/jobSeeker')
);
export const EmployeeRegistration = lazy(
  () => import('../features/auth/register/employers')
);
export const MyProfile = lazy(
  () => import('../features/dashboard/jobseeker/myProfile')
);
export const JobApplied = lazy(
  () => import('../features/dashboard/employee/jobsApplied')
);
export const ManageJobs = lazy(
  () => import('../features/dashboard/employee/manageJobs')
);
export const PostJobs = lazy(
  () => import('../features/dashboard/employee/posts')
);
export const Profile = lazy(
  () => import('../features/dashboard/employee/profile')
);
export const ShorlistCandidate = lazy(
  () => import('../features/dashboard/employee/shortListCandidates')
);
export const ChangePassword = lazy(
  () => import('../features/dashboard/ChangePassword')
);
export const DeactivateAccount = lazy(
  () => import('../features/dashboard/DeactivateAccount')
);
export const DetailJobView = lazy(() => import('../features/detailsJob'));
export const AppliedJobs = lazy(
  () => import('../features/dashboard/jobseeker/appliedJobs')
);
export const UploadPhotoJobSeeker = lazy(
  () => import('../features/dashboard/jobseeker/uploadPhoto')
);
export const UploadPhotoEmployee = lazy(
  () => import('../features/dashboard/employee/uploadphoto')
);
export const MyResume = lazy(
  () => import('../features/dashboard/jobseeker/myResume')
);
export const ShortListedJobs = lazy(
  () => import('../features/dashboard/jobseeker/shortListed')
);
export const SavedJobs = lazy(
  () => import('../features/dashboard/jobseeker/savedJobs')
);
export const Search = lazy(() => import('../features/search'));
export const EmployeeDetails = lazy(
  () => import('../features/employeeDetails')
);
