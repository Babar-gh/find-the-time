import { AxiosError, AxiosStatic } from 'axios';
import * as jwt from 'jwt';
import history from 'browserHistory';
import { refreshUserToken } from 'api/users';
import { PATH_AFTER_LOGIN_STORAGE_KEY } from 'constants/localStorage';

const AUTH_HEADER = 'Authorization';
const AUTH_ERROR_HEADER = 'Auth-Error';

const INVALID_TOKEN = 'invalid token';
const EXPIRED_TOKEN = 'expired token';

let _refreshing: Promise<void> | null = null;

export const addJwtInterceptors = (axios: AxiosStatic) => {
  axios.interceptors.request.use((config) => {
    if (config.headers === undefined) {
      config.headers = {};
    }

    if (jwt.checkIfExists()) {
      config.headers[AUTH_HEADER] = `Bearer ${jwt.get()}`;
    }

    return config;
  });

  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    switch (error.response?.headers[AUTH_ERROR_HEADER]) {
      case INVALID_TOKEN:
        localStorage.setItem(
          PATH_AFTER_LOGIN_STORAGE_KEY,
          history.location.pathname
        );

        // TODO: Add enum for all the different routes
        history.push('/login');

        break;

      case EXPIRED_TOKEN: {
        _refreshing ??= refreshUserToken()
          .then(
            ({ data: token }) => jwt.set(token),
            (error) => Promise.reject(error)
          )
          .finally(() => (_refreshing = null));

        const originalRequestConfig = error.config;
        delete originalRequestConfig.headers![AUTH_HEADER];

        _refreshing.then(() => axios.request(originalRequestConfig));
      }
    }
  });
};
