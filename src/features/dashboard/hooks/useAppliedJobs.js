import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useGetAcceptedJobs,
  useGetJobsApplied,
  useGetPendingJobs,
  useGetRejectedJobs,
  useGetSavedJobs,
  useGetShortListed,
} from '../../../services/jobSeeker/setUp';

import { AppConstant } from '../../../shared/constants';
import { isAuthenticated } from '../../../shared/utils/auth';
import { HIRING_STATUS } from '../pages/employee/jobsApplied/jobsApplied.constant';

const getFilteredJobData = (
  statusFilter,
  appliedJobsData,
  acceptedJobs,
  rejectedJobs,
  pendingJobs,
  isLoadingAcceptedJobs,
  isLoadingRejectedJobs,
  isLoadingPendingJobs
) => {
  switch (statusFilter) {
    case HIRING_STATUS.ACCEPTED:
      return { data: acceptedJobs, isLoading: isLoadingAcceptedJobs };
    case HIRING_STATUS.REJECTED:
      return { data: rejectedJobs, isLoading: isLoadingRejectedJobs };
    case HIRING_STATUS.PENDING:
      return { data: pendingJobs, isLoading: isLoadingPendingJobs };
    default:
      return appliedJobsData;
  }
};

export const useAppliedJobs = (isSavedJobs, isShortList) => {
  const navigate = useNavigate();
  const userId = isAuthenticated()?.id;
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');

  const { data: acceptedJobs, isLoading: isLoadingAcceptedJobs } =
    useGetAcceptedJobs(userId, statusFilter);
  const { data: rejectedJobs, isLoading: isLoadingRejectedJobs } =
    useGetRejectedJobs(userId, statusFilter);
  const { data: pendingJobs, isLoading: isLoadingPendingJobs } =
    useGetPendingJobs(userId, statusFilter);

  const { data: appliedJobs, isLoading: isLoadingAppliedJobs } =
    useGetJobsApplied(
      isAuthenticated()?.id,
      isShortList,
      isSavedJobs,
      statusFilter
    );

  const { data: savedJobs, isLoading: isLoadingSaved } = useGetSavedJobs(
    isAuthenticated()?.id,
    isSavedJobs
  );

  const { data: shortListedJobs, isLoading: isLoadingShortlisted } =
    useGetShortListed(
      isAuthenticated()?.id,
      AppConstant.DIRECT_APPLY,
      isShortList
    );

  const appliedJobsData = isShortList
    ? { data: shortListedJobs, isLoading: isLoadingShortlisted }
    : isSavedJobs
      ? { data: savedJobs, isLoading: isLoadingSaved }
      : { data: appliedJobs, isLoading: isLoadingAppliedJobs };

  const jobsData = getFilteredJobData(
    statusFilter,
    appliedJobsData,
    acceptedJobs,
    rejectedJobs,
    pendingJobs,
    isLoadingAcceptedJobs,
    isLoadingRejectedJobs,
    isLoadingPendingJobs,
    isLoadingAppliedJobs
  );

  const handleCardClick = (e, postId, name) => {
    e.preventDefault();

    if (postId && name) {
      navigate(`/jobs/${name}/${postId}`, { replace: true });
    }
  };

  return { handleCardClick, jobsData, statusFilter };
};
