import dayjs from 'dayjs';
import { checkIntersection } from 'utilities/intervals';
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
  intervals.some((outer, index) =>
    intervals.slice(index + 1).some((inner) => checkIntersection(inner, outer))
  )
    ? 'must not intersect'
    : null;
