import { AxiosError, AxiosStatic } from 'axios';
import * as jwt from 'jwt';
import { HTTP_RESPONSE_STATUS_CODES } from 'api/constants/httpResponseStatusCodes';
import { refreshUserToken } from 'api/users';
import { signOut, updateFromNewToken } from 'store/slices/account';
import { store } from 'store';

const AUTH_HEADER = 'authorization';
const AUTH_ERROR_HEADER = 'auth-error';

const INVALID_TOKEN = 'invalid token';
const EXPIRED_TOKEN = 'expired token';

let _refreshing: Promise<void> | null = null;

export const addJwtInterceptors = (axios: AxiosStatic) => {
  axios.interceptors.request.use((config) => {
    config.headers ??= {};

    if (jwt.checkIfExists()) {
      config.headers[AUTH_HEADER] = `Bearer ${jwt.get()}`;
    }

    return config;
  });

  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.response?.status !== HTTP_RESPONSE_STATUS_CODES.Unauthorized) {
      return Promise.reject(error);
    }

    switch (error.response?.headers[AUTH_ERROR_HEADER]) {
      case INVALID_TOKEN:
        store.dispatch(signOut());

        return Promise.reject(error);

      case EXPIRED_TOKEN: {
        _refreshing ??= refreshUserToken()
          .then(
            ({ data: token }) => store.dispatch(updateFromNewToken(token)),
            (error) => Promise.reject(error)
          )
          .finally(() => (_refreshing = null));

        const originalRequestConfig = error.config;

        if (originalRequestConfig.headers !== undefined) {
          delete originalRequestConfig.headers[AUTH_HEADER];
        }

        return _refreshing.then(() => axios.request(originalRequestConfig));
      }
    }
  });
};
