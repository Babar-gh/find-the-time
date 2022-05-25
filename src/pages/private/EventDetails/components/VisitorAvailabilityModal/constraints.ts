import { ValidationErrors } from 'initValidatejs';

const getConstraints = (duration: number) => ({
  start: {
    startIsBeforeEnd: true,
  },
  end: {
    notShorterThan: { duration },
  },
  intervals: {
    noIntersections: true,
  },
});

export type VisitorAvailabilityValidation = ValidationErrors<
ReturnType<typeof getConstraints>
>;

export default getConstraints;
