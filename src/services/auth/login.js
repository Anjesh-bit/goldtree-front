import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios/AxiosInstance';

import { getLocalStorage } from '../../shared/utils/localStorage';
import { uploader } from '../../lib/axios/uploader';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

//create our own action creators
const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('login', payload, {
        withCredentials: true,
      });
      const token = data?.token;
      return { res: { ...data }, token };
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a non-successful status code
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        return rejectWithValue('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an error
        return rejectWithValue('Error setting up the request.');
      }
    }
  }
);

/* eslint-disable no-useless-catch */
export const getNewAccessToken = async (axiosInstance) => {
  const type = getLocalStorage('loginData')?.type;
  try {
    if (type) {
      const response = await axiosInstance.post(
        `/token/${type || 'jobSeeker'}`
      );
      return response.data.accessToken;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const useLogout = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader('logout', payload);
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

export default login;
