import axios from 'axios';
import { Token } from 'types/common';
import { API_ROOT_PATH } from './constants/path';
import { IUserCreationRequest, IUserLoginRequest } from './types/users';

const baseUrl = `${API_ROOT_PATH}/users`;

export const createUser = (credentials: IUserCreationRequest) =>
  axios.post<Token>(`${baseUrl}/new`, credentials);

export const logUserIn = (credentials: IUserLoginRequest) =>
  axios.post<Token>(`${baseUrl}/login`, credentials);

export const refreshUserToken = () => axios.get<Token>(`${baseUrl}/refresh`);
