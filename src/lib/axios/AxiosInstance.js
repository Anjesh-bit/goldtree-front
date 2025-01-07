import axios from 'axios';
import {
  deleteCookies,
  getCookies,
  setCookies,
} from '../../shared/utils/cookies';
import { isAuthenticated } from '../../shared/utils/auth';
import { jwtDecode } from 'jwt-decode';
import { getNewAccessToken } from '../../services/auth/login';
import { removeLocalStorage } from '../../shared/utils/localStorage';

let isRefreshing = false;
let refreshSubscribers = [];

const axiosInstance = axios.create({
  baseURL: process.env.GOLD_JOB_TREE_API_URL,
  withCredentials: true,
});

/* eslint-disable no-useless-catch */
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getCookies('token');
    config.headers['Authorization'] = `Bearer ${token}`;
    const authStatus = isAuthenticated();

    if (authStatus) {
      config.headers['Auth-Type'] = authStatus.type;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* eslint-disable no-useless-catch */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const newAccessToken = await getNewAccessToken(axiosInstance);
        const decodedToken = jwtDecode(newAccessToken);
        const { exp } = decodedToken;
        setCookies('token', newAccessToken, exp);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        const response = await axiosInstance(originalRequest);

        refreshSubscribers.forEach((subscriber) => subscriber(newAccessToken));
        refreshSubscribers = [];

        return response;
      } catch (refreshError) {
        removeLocalStorage('loginData');
        deleteCookies('token');
        deleteCookies('refreshToken');
        window.location.replace('/session-time-out');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
