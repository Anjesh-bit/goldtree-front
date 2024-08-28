import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { uploader } from "../../axios/uploader";

export const useChangePassword = (userId, type) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader(
          `change-password?userId=${userId}&type=${type}`,
          payload
        );
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: (res) => {},
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
