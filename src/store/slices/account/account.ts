import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import * as jwt from 'jwt';
import { Guid } from 'types/common';
import { IUser } from 'types/users';
import { parseUserToken } from './helpers';
import { signIn, signUp } from './asyncThunks';

export interface IState extends IUser {
  isDemo: boolean;
}

const persistedToken = jwt.get();
const emptyState = {
  id: '' as Guid,
  email: '',
  name: '',
  isDemo: true,
};

const initialState: IState = persistedToken
  ? parseUserToken(persistedToken)
  : emptyState;

export const accountSlice = createSlice({
  name: 'account',
  initialState,

  reducers: {
    update: (_state, { payload: newAccountData }: PayloadAction<IState>) => {
      return newAccountData;
    },
    clear: (_state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signIn.fulfilled, signUp.fulfilled),
      (_state, { payload: newAccountData }) => {
        if (newAccountData) {
          return newAccountData;
        }
      }
    );
  },
});

export const { reducer, actions } = accountSlice;
