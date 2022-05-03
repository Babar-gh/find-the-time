import { ValidationErrors } from 'initValidatejs';

export const constraints = {
  title: {
    length: {
      minimum: 3,
      max: 64,
    },
  },
  location: {
    length: {
      minimum: 3,
      max: 64,
    },
  },
  duration: {
    numericality: {
      greaterThan: 0,
    },
  },
  intervals: {
    noIntersections: true,
  },
};

export type NewEventValidation = ValidationErrors<typeof constraints>;
