import { max, min } from 'dayjs';
import { TimeInterval } from 'types/common';

export const checkIntersection = (first: TimeInterval, second: TimeInterval) =>
  max(first.start, second.start).isBefore(min(first.end, second.end));

export const getIntersection = (first: TimeInterval, second: TimeInterval) => {
  const start = max(first.start, second.start);
  const end = min(first.end, second.end);

  return start.isBefore(end) ? { start, end } : null;
};
