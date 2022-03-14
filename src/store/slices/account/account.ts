import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'types/common';
import { IUser } from 'types/user';
import { signIn } from './asyncThunks';

export interface IState extends IUser {
  isDemo: boolean;
}

const initialState: IState = {
  id: '' as Guid,
  email: '',
  name: '',
  isDemo: true,
};

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
    builder.addCase(signIn.fulfilled, (_state, { payload: accountData }) => {
      if (accountData) {
        return accountData;
      }
    });
  },
});

export const { reducer, actions } = accountSlice;
