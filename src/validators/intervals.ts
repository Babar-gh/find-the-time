import dayjs from 'dayjs';
import { TimeInterval } from 'types/common';
import '../initDayjs';

export const notShorterThan = (
  interval: TimeInterval,
  options: { duration: number }
) =>
  interval.end.diff(interval.start, 'millisecond') >=
  dayjs.duration(options.duration, 'minute').asMilliseconds()
    ? null
    : '^Shorter than duration';

export const startIsBeforeEnd = (interval: TimeInterval, options: boolean) =>
  options && interval.start.isBefore(interval.end) ? null : '^Later than end';

export const noIntersections = (intervals: TimeInterval[], options: boolean) =>
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
