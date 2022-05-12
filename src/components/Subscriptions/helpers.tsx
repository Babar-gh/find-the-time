import dayjs from 'dayjs';
import Text from 'components/Text';
import { DATETIME_DEFAULT, DATE_SHORT, TIME_DEFAULT } from 'constants/formats';
import { IEvent } from 'api/types/events';
import { Guid } from 'types/common';

export const getConstraintText = (datetime: string) => {
  const constraint = dayjs(datetime);

  return (
    <>
      <Text>{constraint.format(DATE_SHORT)}</Text>
      <Text>{constraint.format(TIME_DEFAULT)}</Text>
    </>
  );
};

export const addIntersections = (subscriptions: IEvent['subscriptions']) => {
  const availabilities = subscriptions.map(
    (subscription) => subscription.availability
  );

  const intersections = availabilities.reduce(
    (intersections, intervalsToCheck) => {
      return intervalsToCheck.flatMap(({ start, end }) => {
        const interval = { start: dayjs(start), end: dayjs(end) };

        return intersections.flatMap(({ start, end }) => {
          const intersection = { start: dayjs(start), end: dayjs(end) };

          const isIntersecting =
            interval.start.isBetween(intersection.start, intersection.end) ||
            interval.end.isBetween(intersection.start, intersection.end);

          const newIntersection = {
            start: (interval.start.isAfter(intersection.start)
              ? interval.start
              : intersection.start
            ).format(DATETIME_DEFAULT),
            end: (interval.end.isBefore(intersection.end)
              ? interval.end
              : intersection.end
            ).format(DATETIME_DEFAULT),
          };

          return isIntersecting ? newIntersection : [];
        });
      });
    }
  );

  return [
    ...subscriptions,
    {
      user: { name: 'All Participants', email: '', id: '' as Guid },
      availability: intersections,
    },
  ];
};
