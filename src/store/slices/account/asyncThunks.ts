import { createAsyncThunk } from '@reduxjs/toolkit';
import * as jwt from 'jwt';
import { AppDispatch } from 'store';
import { createUser, logUserIn } from 'api/users';
import { IUserCreationRequest, IUserLoginRequest } from 'api/types/users';
import { createDemoUser } from 'demo/api';
import { getDemoContent } from 'demo/helpers';
import { notifyOnNetworkError } from '../notifications';
import { IState } from './account';
import { parseUserToken } from './helpers';

export const signIn = createAsyncThunk<
IState | undefined,
IUserLoginRequest,
{ dispatch: AppDispatch }
>('account/signIn', async (credentials, { dispatch }) => {
  try {
    const loginResponse = await logUserIn(credentials);
    const token = loginResponse.data;

    jwt.set(token);

    return parseUserToken(token);
  } catch (error) {
    dispatch(notifyOnNetworkError('sign you in', error));
  }
});

export const signUp = createAsyncThunk<
IState | undefined,
IUserCreationRequest,
{ dispatch: AppDispatch }
>('account/signUp', async (credentials, { dispatch }) => {
  try {
    const registrationResponse = await createUser(credentials);
    const token = registrationResponse.data;

    jwt.set(token);

    return parseUserToken(token);
  } catch (error) {
    dispatch(notifyOnNetworkError('sign you up', error));
  }
});

export const signUpDemo = createAsyncThunk<
IState | undefined,
undefined,
{ dispatch: AppDispatch }
>('account/signUp', async (_, { dispatch }) => {
  try {
    const demoRegistrationResponse = await createDemoUser(getDemoContent());
    const token = demoRegistrationResponse.data;

    jwt.set(token);

    return parseUserToken(token);
  } catch (error) {
    dispatch(notifyOnNetworkError('create demo account', error));
  }
});
