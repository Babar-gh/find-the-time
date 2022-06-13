import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from 'constants/account';
import { ValidationErrors } from 'initValidatejs';

export const constraints = {
  name: {
    presence: true,
    length: {
      minimum: NAME_MIN_LENGTH,
      tooShort: '^Shorter %{count} characters',
      maximum: NAME_MAX_LENGTH,
      tooLong: '^Longer than %{count} characters',
    },
  },
};

export type NameChangeValidation = ValidationErrors<typeof constraints>;
