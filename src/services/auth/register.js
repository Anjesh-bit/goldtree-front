import { useMutation } from '@tanstack/react-query';
import { uploader } from '../../lib/axios/uploader';
import { useState } from 'react';

export const useRegister = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader('register', payload);
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
