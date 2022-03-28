import { IUser } from 'types/user';

export const getDisplayName = ({ name, email }: IUser) =>
  name !== '' ? name : email;
