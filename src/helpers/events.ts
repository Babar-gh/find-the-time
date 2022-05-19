import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import Icon from 'components/Icon';
import { IEvent } from 'types/events';

type Status = 'notYetScheduled' | 'pending' | 'past';

export const getStatus = (chosenInterval: IEvent['chosenInterval']): Status =>
  chosenInterval === null
    ? 'notYetScheduled'
    : dayjs(chosenInterval.end).isAfter(dayjs())
      ? 'pending'
      : 'past';

type MappedIcons = { [Key in Status]: ComponentProps<typeof Icon>['type'] };
const iconsMappedToStatus: MappedIcons = {
  notYetScheduled: 'EditCalendar',
  pending: 'Event',
  past: 'EventAvailable',
};

export const getStatusIcon = (status: Status) => iconsMappedToStatus[status];
