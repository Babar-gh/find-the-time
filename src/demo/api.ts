import axios from 'axios';
import { API_ROOT_PATH } from 'api/constants/path';
import { IApiEvent, IApiUser } from 'api/types/events';
import { Token } from 'types/common';

export interface IDemoUserCreationRequest {
  loginUser: IApiUser;
  users: IApiUser[];
  events: Omit<IApiEvent, 'id'>[];
}

export const createDemoUser = (demoContent: IDemoUserCreationRequest) =>
  axios.post<Token>(`${API_ROOT_PATH}/users/new-demo`, demoContent);
