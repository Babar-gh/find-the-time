import { ValidationErrors } from 'initValidatejs';

export const constraints = {
  name: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: '^At least %{count} characters',
    },
  },
};

export type NameChangeValidation = ValidationErrors<typeof constraints>;
