import { Token } from 'types/common';
import { IState } from './account';

type JwtMapping = {
  [key: string]: keyof IState;
};

const mapping: JwtMapping = {
  user_id: 'id',
  email: 'email',
  name: 'name',
  demo: 'isDemo',
};

const parseUserToken = (token: Token) => {
  const [, base64Url] = token.split('.');
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  const userData = JSON.parse(jsonPayload, (key, value) => {
    return key in mapping || key === '' ? value : undefined;
  });

  const mappedUserData: unknown = Object.fromEntries(
    Object.entries(userData).map(([key, value]) => {
      return [mapping[key], value];
    })
  );

  return mappedUserData as IState;
};

export { parseUserToken };
