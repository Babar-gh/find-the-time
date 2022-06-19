import { DATETIME_DEFAULT } from 'constants/formats';
import { IApiTimeInterval } from 'api/types/events';
import { TimeInterval } from 'types/common';

export const convertToIApiTimeInterval = ({
  start,
  end,
}: TimeInterval): IApiTimeInterval => ({
  start: start.format(DATETIME_DEFAULT),
  end: end.format(DATETIME_DEFAULT),
});
