import { useNavigate } from 'react-router-dom';
import {
  useGetJobsApplied,
  useGetSavedJobs,
  useGetShortListed,
} from '../../../services/jobSeeker/setUp';
import useAuthHook from '../../../hooks/useAuthHook';
import { AppConstant } from '../../../shared/constants';

export const useAppliedJobs = (isSavedJobs, isShortList) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthHook(false);

  const { data: appliedJobs } = useGetJobsApplied(
    isAuthenticated?.id,
    isShortList,
    isSavedJobs
  );

  const { data: savedJobs } = useGetSavedJobs(isAuthenticated?.id, isSavedJobs);

  const { data: shortListedJobs } = useGetShortListed(
    isAuthenticated?.id,
    AppConstant.DIRECT_APPLY,
    isShortList
  );

  const handleCardClick = (e, postId, name) => {
    e.preventDefault();

    if (postId && name) {
      navigate(`/jobs/${name}/${postId}`, { replace: true });
    }
  };

  const appliedJobsData = isShortList
    ? shortListedJobs
    : isSavedJobs
      ? savedJobs
      : appliedJobs;

  return { handleCardClick, appliedJobsData };
};
