import { lazy } from 'react';

export const JobPortalHome = lazy(() => import('../components/home'));
export const DashBoard = lazy(
  () => import('../components/dashboard/DashBoard')
);
export const JobSeekerRegistration = lazy(
  () => import('../components/auth/register/jobSeeker')
);
export const EmployeeRegistration = lazy(
  () => import('../components/auth/register/employers')
);
export const MyProfile = lazy(
  () => import('../components/dashboard/jobseeker/myProfile')
);
export const JobApplied = lazy(
  () => import('../components/dashboard/employee/jobsApplied')
);
export const ManageJobs = lazy(
  () => import('../components/dashboard/employee/manageJobs')
);
export const PostJobs = lazy(
  () => import('../components/dashboard/employee/posts')
);
export const Profile = lazy(
  () => import('../components/dashboard/employee/profile')
);
export const ShorlistCandidate = lazy(
  () => import('../components/dashboard/employee/shortListCandidates')
);
export const ChangePassword = lazy(
  () => import('../components/dashboard/ChangePassword')
);
export const DeactivateAccount = lazy(
  () => import('../components/dashboard/DeactivateAccount')
);
export const DetailJobView = lazy(() => import('../components/detailsJob'));
export const AppliedJobs = lazy(
  () => import('../components/dashboard/jobseeker/appliedJobs')
);
export const UploadPhotoJobSeeker = lazy(
  () => import('../components/dashboard/jobseeker/uploadPhoto')
);
export const UploadPhotoEmployee = lazy(
  () => import('../components/dashboard/employee/uploadphoto')
);
export const MyResume = lazy(
  () => import('../components/dashboard/jobseeker/myResume')
);
export const ShortListedJobs = lazy(
  () => import('../components/dashboard/jobseeker/shortListed')
);
export const SavedJobs = lazy(
  () => import('../components/dashboard/jobseeker/savedJobs')
);
export const Search = lazy(() => import('../components/search'));
