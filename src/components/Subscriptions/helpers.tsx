import dayjs from 'dayjs';
import Text from 'components/Text';
import { DATE_SHORT, TIME_DEFAULT } from 'constants/formats';

export const getConstraintText = (datetime: string) => {
  const constraint = dayjs(datetime);

  return (
    <>
      <Text>{constraint.format(DATE_SHORT)}</Text>
      <Text>{constraint.format(TIME_DEFAULT)}</Text>
    </>
  );
};
