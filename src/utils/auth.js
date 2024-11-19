import axios from 'axios';
import { getCookies, setCookies } from './cookies';
import { getLocalStorage, setLocalStorage } from './localStorage';
import { getNewAccessToken } from '../services/auth/login';

const auth = (token, user, exp) => {
  setCookies('token', token, exp);
  setLocalStorage('loginData', user);
};

const url = 'http://localhost:5000/goldtree/';
const axiosInstance = axios.create({ baseURL: url, withCredentials: true });

let isTokenRefreshing = false;

const isAuthenticated = async () => {
  const loginData = getLocalStorage('loginData');
  const accessToken = getCookies('token');

  if (loginData && accessToken) {
    return loginData;
  } else if (!accessToken && !isTokenRefreshing) {
    isTokenRefreshing = true;
    try {
      const newAccessToken = await getNewAccessToken(axiosInstance);
      if (newAccessToken) {
        setCookies('token', newAccessToken);
        return loginData;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      isTokenRefreshing = false;
    }
  } else {
    return false;
  }
};

export { auth, isAuthenticated };
