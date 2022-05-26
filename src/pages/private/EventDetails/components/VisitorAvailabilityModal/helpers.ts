import { TimeInterval } from 'types/common';

export const getInitialStart = (
  constraints: TimeInterval,
  currentAvailabilities: TimeInterval[]
) => {
  const lastPickedInterval = currentAvailabilities.at(-1);

  if (!lastPickedInterval) {
    return constraints.start;
  }

  const afterPreviousPick = lastPickedInterval.end.add(1, 'hour');

  return afterPreviousPick.isBetween(constraints.start, constraints.end)
    ? afterPreviousPick
    : constraints.start;
};
