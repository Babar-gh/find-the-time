import { AppThunk } from 'store';
import * as jwt from 'jwt';
import { Token } from 'types/common';
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
};
