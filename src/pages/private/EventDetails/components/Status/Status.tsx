import dayjs from 'dayjs';
import { getStatusIcon } from 'helpers/events';
import { IEvent, Role, Status as StatusType } from 'types/events';
import InfoTile from '../InfoTile';
import { getStatusInfo } from './helpers';

interface IProps extends Pick<IEvent, 'chosenInterval'> {
  role: Role;
  status: StatusType;
}

const notYetScheduledByRole = {
  organizer: 'You can pick the time when everyone is subscribed!',
  subscriber: 'The organizer will pick the time when everyone is subscribed!',
  visitor: 'You can subscribe!',
};

const Status: React.VFC<IProps> = ({ chosenInterval, role, status }) => {
  const info = {
    notYetScheduled: getStatusInfo(
      'Not scheduled yet',
      notYetScheduledByRole[role]
    ),
    pending: getStatusInfo(
      `Scheduled for ${dayjs(chosenInterval?.start).format('MMM D, YYYY')}`,
      `Will start ${dayjs(chosenInterval?.start).fromNow()}`
    ),
    past: getStatusInfo(
      `Was scheduled for ${dayjs(chosenInterval?.start).format('MMM D, YYYY')}`,
      `Ended ${dayjs(chosenInterval?.end).fromNow()}`
    ),
  };

  return (
    <InfoTile heading="Status" icon={getStatusIcon(status)}>
      {info[status]}
    </InfoTile>
  );
};

export default Status;
