import { useMutation, useQuery } from '@tanstack/react-query';
import { putUploader, uploader } from '../../lib/axios/uploader';
import { useState } from 'react';
import { fetcher } from '../../lib/axios/fetcher';
import { jobSeekerQueryKeys } from '../../queryKeys/keys';
import { HIRING_STATUS } from '../../features/dashboard/pages/employee/jobsApplied/jobsApplied.constant';

export const useProfileInfo = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader('jobseeker-profile-info', payload);
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: () => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};

export const useUpdateEasyApply = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader(`upload?name=${'cv_upload'}`, payload);
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: () => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};

export const useUpdateProfileInfo = (id) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(`jobseeker-profile-info/${id}`, payload);
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: () => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};

export const useGetProfileInfo = (id) => {
  return useQuery({
    queryFn: () => fetcher(`jobseeker-profile-info/${id}`),
    queryKey: [jobSeekerQueryKeys.setUp.getProfileInfoJobSeeker, id],
    enabled: !!id,
  });
};

export const useGetJobsApplied = (
  id,
  isShorList,
  isSavedJobs,
  statusFilter
) => {
  return useQuery({
    queryFn: () => fetcher(`jobSeeker-applied-jobs?userId=${id}`),
    queryKey: [jobSeekerQueryKeys.setUp.jobSeekerAppliedJobs, id],
    enabled: !!(id && !isShorList && !isSavedJobs && !statusFilter),
  });
};

export const useGetShortListed = (userId, type, isShortList) => {
  return useQuery({
    queryFn: () =>
      fetcher(`get-shortlisted-jobs?userId=${userId}&type=${type}`),
    queryKey: [
      jobSeekerQueryKeys.setUp.jobSeekerGetShortListed,
      userId,
      type,
      isShortList,
    ],
    enabled: !!(userId && type && isShortList),
  });
};

export const useSavedJobs = (id, userId) => {
  const [localLoading, setLocalLoading] = useState(false);

  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(
          `save-jobs?id=${id}&jobSeekUserId=${userId}`,
          payload
        );
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: () => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};

export const useGetSavedJobs = (jobSeekUserId, isSavedJobs) => {
  return useQuery({
    queryFn: () => fetcher(`save-jobs/${jobSeekUserId}`),
    queryKey: [
      jobSeekerQueryKeys.setUp.jobSeekerGetShortListed,
      jobSeekUserId,
      isSavedJobs,
    ],
    enabled: !!(jobSeekUserId && isSavedJobs),
  });
};

export const useGetAcceptedJobs = (jobSeekUserId, statusFilter) => {
  return useQuery({
    queryFn: () => fetcher(`jobSeeker-accepted-jobs/${jobSeekUserId}`),
    queryKey: [jobSeekerQueryKeys.setUp.jobSeekerAcceptedJobs, jobSeekUserId],
    enabled: !!(jobSeekUserId && statusFilter === HIRING_STATUS.ACCEPTED),
  });
};

export const useGetRejectedJobs = (jobSeekUserId, statusFilter) => {
  return useQuery({
    queryFn: () => fetcher(`jobSeeker-rejected-jobs/${jobSeekUserId}`),
    queryKey: [jobSeekerQueryKeys.setUp.jobSeekerRejectedJobs, jobSeekUserId],
    enabled: !!(jobSeekUserId && statusFilter === HIRING_STATUS.REJECTED),
  });
};

export const useGetPendingJobs = (jobSeekUserId, statusFilter) => {
  return useQuery({
    queryFn: () => fetcher(`jobSeeker-pending-jobs/${jobSeekUserId}`),
    queryKey: [jobSeekerQueryKeys.setUp.jobSeekerPendingJobs, jobSeekUserId],
    enabled: !!(jobSeekUserId && statusFilter === HIRING_STATUS.PENDING),
  });
};
