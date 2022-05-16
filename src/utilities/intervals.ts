import { max, min } from 'dayjs';
import { TimeInterval } from 'types/common';
import '../initDayjs';

export const getIntersection = (first: TimeInterval, second: TimeInterval) => {
  const start = max(first.start, second.start);
  const end = min(first.end, second.end);

  return start.isBefore(end) ? { start, end } : null;
};

export const checkIntersection = (first: TimeInterval, second: TimeInterval) =>
  getIntersection(first, second) !== null;
