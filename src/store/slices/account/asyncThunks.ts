import { createAsyncThunk } from '@reduxjs/toolkit';
import * as jwt from 'jwt';
import { IUserLoginRequest } from 'api/types/users';
import { logUserIn } from 'api/users';
import { parseUserToken } from './helpers';

export const signIn = createAsyncThunk(
  'account/signIn',
  async (credentials: IUserLoginRequest) => {
    try {
      const loginRequest = await logUserIn(credentials);
      const token = loginRequest.data;

      jwt.set(token);

      return parseUserToken(token);
    } catch (error) {
      // TODO: Replace with a proper error handling
      console.log(error);
    }
  }
);
