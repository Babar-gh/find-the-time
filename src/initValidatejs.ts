import validate from 'validate.js';
import {
  notShorterThan,
  noIntersections,
  startIsBeforeEnd,
} from 'validators/intervals';

validate.validators = {
  ...validate.validators,
  notShorterThan,
  startIsBeforeEnd,
  noIntersections,
};

export type ValidationErrors<Constraints> =
  | { [Key in keyof Constraints]: string }
  | undefined;
