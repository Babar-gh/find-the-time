import { JWT_STORAGE_KEY } from 'constants/localStorage';
import { Token } from 'types/common';

export const get = () => localStorage.getItem(JWT_STORAGE_KEY);

export const set = (token: Token) =>
  localStorage.setItem(JWT_STORAGE_KEY, token);

export const checkIfExists = () => Boolean(get());

export const remove = () => localStorage.removeItem(JWT_STORAGE_KEY);
