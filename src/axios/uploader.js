import axiosInstance from './AxiosInstance';

/* eslint-disable no-useless-catch */
const uploader = async (url, payload) => {
  try {
    const { data } = await axiosInstance.post(url, payload);
    return data;
  } catch (e) {
    throw e;
  }
};

/* eslint-disable no-useless-catch */
const putUploader = async (url, payload) => {
  try {
    const { data } = await axiosInstance.put(url, payload);
    return data;
  } catch (e) {
    throw e;
  }
};

export { uploader, putUploader };
