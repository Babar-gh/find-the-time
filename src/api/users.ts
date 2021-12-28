import axios from 'axios';
import { API_ROOT_PATH } from './path';
import {
  IUserCreationRequest,
  IUserLoginRequest,
  IUserResponse,
} from './types/users';

const baseUrl = `${API_ROOT_PATH}/users`;

export const createUser = (credentials: IUserCreationRequest) =>
  axios.post<IUserResponse>(`${baseUrl}/new`, credentials);

export const logUserIn = (credentials: IUserLoginRequest) =>
  axios.post<IUserResponse>(`${baseUrl}/login`, credentials);
