import dayjs from 'dayjs';
import Text from 'components/Text';
import { DATE_SHORT, DATETIME_DEFAULT, TIME_DEFAULT } from 'constants/formats';
import { getIntersection } from 'utilities/intervals';
import { Guid } from 'types/common';
import { IEvent } from 'api/types/events';

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
    (foundIntersections, intervalsToCheck) => {
      return intervalsToCheck.flatMap(({ start, end }) => {
        const current = { start: dayjs(start), end: dayjs(end) };

        return foundIntersections.flatMap(({ start, end }) => {
          const previous = { start: dayjs(start), end: dayjs(end) };

          const newIntersection = getIntersection(previous, current);

          if (newIntersection !== null) {
            const start = newIntersection.start.format(DATETIME_DEFAULT);
            const end = newIntersection.end.format(DATETIME_DEFAULT);

            return [{ start, end }];
          } else {
            return [];
          }
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
