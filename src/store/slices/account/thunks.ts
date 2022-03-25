import * as jwt from 'jwt';
import history from 'browserHistory';
import { AppThunk } from 'store';
import { Token } from 'types/common';
import { LocationState } from 'types/location';
import { actions } from './account';
import { parseUserToken } from './helpers';

const { update, clear } = actions;

export const updateFromNewToken =
  (token: Token): AppThunk =>
    (dispatch) => {
      jwt.set(token);

      const accountData = parseUserToken(token);
      dispatch(update(accountData));
    };

export const signOut = (): AppThunk => (dispatch) => {
  jwt.remove();

  dispatch(clear());

  const state: LocationState = { returnUrl: history.location.pathname };
  // TODO: Add enum for all the different routes
  history.push('/login', state);
};
