import * as jwt from 'jwt';
import history from 'browserHistory';
import { AppThunk } from 'store';
import { AUTH, BASENAME } from 'constants/routes';
import { LocationState } from 'components/CredentialsForm';
import { Token } from 'types/common';
import { parseUserToken } from './helpers';
import { actions } from './account';

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

  const returnUrl = history.location.pathname.replace(BASENAME, '');
  const state: LocationState = { returnUrl };

  history.push(`${BASENAME}${AUTH.Login}`, state);
};
