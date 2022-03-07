import { AxiosError, AxiosStatic } from 'axios';
import * as jwt from 'jwt';
import history from 'browserHistory';
import { refreshUserToken } from 'api/users';

export const addJwtInterceptors = (axios: AxiosStatic) => {
  axios.interceptors.request.use((config) => {
    if (config.headers === undefined) {
      config.headers = {};
    }

    if (jwt.checkIfExists()) {
      config.headers['Authorization'] = `Bearer ${jwt.get()}`;
    }

    return config;
  });

  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (error.response.headers['Auth-Error'] === 'invalid token') {
        // TODO: Add enum for all the different routes
        history.push('/login');
      }

      if (error.response.headers['Auth-Error'] === 'expired token') {
        refreshUserToken().then(({ data: token }) => jwt.set(token));
      }
    }
  });
};
