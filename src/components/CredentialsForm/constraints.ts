import { ValidationErrors } from 'initValidatejs';

export const constraints = {
  email: {
    email: { message: 'is not valid' },
  },
  password: {
    length: {
      minimum: 3,
      max: 32,
    },
  },
};

export type CredentialsValidation = ValidationErrors<typeof constraints>;
