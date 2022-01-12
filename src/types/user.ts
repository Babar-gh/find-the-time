import { Guid } from './common';

export interface IUser {
  id: Guid;
  email: string;
  name: string;
}
