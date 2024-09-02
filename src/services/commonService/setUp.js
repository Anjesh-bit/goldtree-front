import { useState } from 'react';
import { putUploader } from '../../axios/uploader';
import { useMutation } from '@tanstack/react-query';

export const useUpdateProfile = (type, id) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(
          `profile-update?name=${'profile_image'}&type=${type}&id=${id}`,
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

export const useShortList = (data) => {
  const [localLoading, setLocalLoading] = useState(false);
  const params = new URLSearchParams(data);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(
          `shortlist?${params.toString()}`,
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
