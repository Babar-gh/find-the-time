import { IUser } from 'types/users';

export const getDisplayName = ({ name, email }: IUser) =>
  name !== '' ? name : email;
