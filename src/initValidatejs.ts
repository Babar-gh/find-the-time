import validate from 'validate.js';
import {
  longerThan,
  noIntersections,
  startIsBeforeEnd,
} from 'validators/intervals';

validate.validators = {
  ...validate.validators,
  longerThan,
  startIsBeforeEnd,
  noIntersections,
};

export type ValidationErrors<Constraints> =
  | { [Key in keyof Constraints]: string }
  | undefined;
