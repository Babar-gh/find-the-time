import { createAsyncThunk } from '@reduxjs/toolkit';
import * as jwt from 'jwt';
import { IUserCreationRequest, IUserLoginRequest } from 'api/types/users';
import { createUser, logUserIn } from 'api/users';
import { parseUserToken } from './helpers';

export const signIn = createAsyncThunk(
  'account/signIn',
  async (credentials: IUserLoginRequest) => {
    try {
      const loginResponse = await logUserIn(credentials);
      const token = loginResponse.data;

      jwt.set(token);

      return parseUserToken(token);
    } catch (error) {
      // TODO: Replace with a proper error handling
      console.log(error);
    }
  }
);

export const signUp = createAsyncThunk(
  'account/signIn',
  async (credentials: IUserCreationRequest) => {
    try {
      const registrationResponse = await createUser(credentials);
      const token = registrationResponse.data;

      jwt.set(token);

      return parseUserToken(token);
    } catch (error) {
      // TODO: Replace with a proper error handling
      console.log(error);
    }
  }
);
