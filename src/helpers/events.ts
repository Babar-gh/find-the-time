import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import Icon from 'components/Icon';
import { IEvent, Role, Status } from 'types/events';
import { IState } from 'store/slices/account/account';

export const getStatus = (chosenInterval: IEvent['chosenInterval']): Status => {
  if (chosenInterval === null) {
    return 'notYetScheduled';
  }

  return dayjs(chosenInterval.end).isAfter(dayjs()) ? 'pending' : 'past';
};

type MappedIcons = { [Key in Status]: ComponentProps<typeof Icon>['type'] };
const iconsMappedToStatus: MappedIcons = {
  notYetScheduled: 'EditCalendar',
  pending: 'Event',
  past: 'EventAvailable',
};

export const getStatusIcon = (status: Status) => iconsMappedToStatus[status];

export const getUserRole = (event: IEvent, account: IState): Role => {
  if (event.organizedBy.id === account.id) {
    return 'organizer';
  }

  if (event.subscriptions.some((entry) => entry.user.id === account.id)) {
    return 'subscriber';
  }

  return 'visitor';
};
