import { useMutation } from '@tanstack/react-query';
import { uploader } from '../../axios/uploader';
import { useState } from 'react';

export const useDeactivateAccount = (userId, type) => {
  const [localLoading, setLocalLoading] = useState(false);

  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader(
          `deactivate-account?userId=${userId}&type=${type}`,
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
