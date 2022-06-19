import { Dayjs } from 'dayjs';
import Text from 'components/Text';
import { DATE_SHORT, TIME_DEFAULT } from 'constants/formats';
import { getIntersection } from 'utilities/intervals';
import { Subscription } from 'types/events';
import { ALL_PARTICIPANTS_ID } from './constants';

export const getConstraintText = (constraint: Dayjs, isSmall?: boolean) => {
  const size = isSmall ? 'small' : 'regular';

  return (
    <>
      <Text size={size}>{constraint.format(DATE_SHORT)}</Text>
      <Text size={size}>{constraint.format(TIME_DEFAULT)}</Text>
    </>
  );
};

export const addIntersections = (
  participants: Subscription[],
  visitor?: Subscription
) => {
  const withVisitor = visitor?.availability.length
    ? [...participants, visitor]
    : participants;

  const availabilities = withVisitor.map(
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
    ...withVisitor,
    {
      user: { name: 'All Participants', email: '', id: ALL_PARTICIPANTS_ID },
      availability: intersections,
    },
  ];
};
