import { Buffer } from 'buffer';
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
    Buffer.from(base64, 'base64')
      .toString()
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  const mappedUserData = JSON.parse(jsonPayload, (key, value) => {
    return key in mapping || key === '' ? value : undefined;
  });

  return mappedUserData as IState;
};

export { parseUserToken };
