import validate from 'validate.js';
import { TimeInterval } from 'types/common';

validate.validators.longerThan = (
  interval: TimeInterval,
  options: { duration: number }
) =>
  interval.end.diff(interval.start, 'minute') < options.duration
    ? '^Shorter than duration '
    : null;

validate.validators.startIsBeforeEnd = (
  interval: TimeInterval,
  options: boolean
) =>
  options && interval.end.diff(interval.start, 'minute') < 0
    ? '^Later than end'
    : null;

validate.validators.noIntersections = (
  intervals: TimeInterval[],
  options: boolean
) =>
  options &&
  intervals.some((outerInterval) =>
    intervals.some(
      (innerInterval) =>
        innerInterval.start.isBetween(outerInterval.start, outerInterval.end) ||
        innerInterval.end.isBetween(outerInterval.start, outerInterval.end)
    )
  )
    ? 'must not intersect'
    : null;

export type ValidationErrors<Constraints> =
  | { [Key in keyof Constraints]: string }
  | undefined;
