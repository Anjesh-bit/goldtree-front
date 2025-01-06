import { getCookies, setCookies } from './cookies';
import { getLocalStorage, setLocalStorage } from './localStorage';

const auth = (token, user, exp) => {
  setCookies('token', token, exp);
  setLocalStorage('loginData', user);
};

const isAuthenticated = () => {
  const loginData = getLocalStorage('loginData');
  const accessToken = getCookies('token');
  const refreshToken = getCookies('refreshToken');
  const isAccessOrRefreshToken = accessToken || refreshToken;

  if (loginData && isAccessOrRefreshToken) {
    return loginData;
  } else {
    return false;
  }
};

export { auth, isAuthenticated };
