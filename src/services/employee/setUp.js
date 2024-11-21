import { useMutation, useQuery } from '@tanstack/react-query';
import { putUploader, uploader } from '../../axios/uploader';
import { useState } from 'react';
import { fetcher } from '../../axios/fetcher';
import { employeeQueryKeys } from '../../queryKeys/keys';

export const useGetEasyApply = (id) => {
  return useQuery({
    queryFn: () => fetcher(`upload?userId=${id}`),
    queryKey: [employeeQueryKeys.setUp.getAllApplied],
    enabled: !!id,
  });
};

export const useProfileInfo = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader('emp-profile-info', payload);
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

export const usePostJobs = (id) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader(`emp-post-job-info/?id=${id}`, payload);
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

export const useGetPostJobs = (id) => {
  return useQuery({
    queryKey: [employeeQueryKeys.setUp.getPostsByUserId, id],
    queryFn: () => fetcher(`emp-posts-by-id/${id}`),
    enabled: !!id,
  });
};

export const useGetProfileInfo = (id) => {
  return useQuery({
    queryKey: [employeeQueryKeys.setUp.getProfileInfo, id],
    queryFn: () => fetcher(`emp-profile-info/${id}`),
    enabled: !!id,
  });
};

export const useUpdateProfile = (id) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(`emp-profile-info/${id}`, payload);
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

export const useUpdatePostJobs = (id) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(`emp-posts-by-id/${id}`, payload);
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

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: [employeeQueryKeys.setUp.getAllPosts],
    queryFn: () => fetcher('emp-post-job-info'),
  });
};

export const useGetSinglePost = (id, userId) => {
  return useQuery({
    queryKey: [employeeQueryKeys.setUp.getSinglePost, id, userId],
    queryFn: () => fetcher(`get-emp-post-single?id=${id}&userId=${userId}`),
    enabled: !!id,
  });
};

export const useGetAllShortListedCandidates = (id) => {
  return useQuery({
    queryKey: [employeeQueryKeys.setUp.getAllShortListedCandidates],
    queryFn: () => fetcher(`short-listed-candidates?userId=${id}`),
    enabled: !!id,
  });
};

export const useGetSingleEmployeeDataById = (id) => {
  return useQuery({
    queryKey: [employeeQueryKeys.setUp.getSingleEmployeeDataById],
    queryFn: () => fetcher(`emp-profile-information/${id}`),
    enabled: !!id,
  });
};
