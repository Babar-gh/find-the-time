import { Dayjs } from 'dayjs';
import Text from 'components/Text';
import { DATE_SHORT, TIME_DEFAULT } from 'constants/formats';
import { getIntersection } from 'utilities/intervals';
import { Guid } from 'types/common';
import { IEvent } from 'types/events';

export const getConstraintText = (constraint: Dayjs) => (
  <>
    <Text>{constraint.format(DATE_SHORT)}</Text>
    <Text>{constraint.format(TIME_DEFAULT)}</Text>
  </>
);

export const addIntersections = (subscriptions: IEvent['subscriptions']) => {
  const availabilities = subscriptions.map(
    (subscription) => subscription.availability
  );

  const intersections = availabilities.reduce(
    (foundIntersections, intervalsToCheck) => {
      return intervalsToCheck.flatMap((current) => {
        return foundIntersections.flatMap((previous) => {
          const newIntersection = getIntersection(previous, current);

          return newIntersection !== null ? [newIntersection] : [];
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
