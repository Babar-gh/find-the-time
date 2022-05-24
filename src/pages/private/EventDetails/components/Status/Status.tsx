import dayjs from 'dayjs';
import { getStatusIcon } from 'helpers/events';
import { IEvent, Role, Status as StatusType } from 'types/events';
import InfoTile from '../InfoTile';
import { getStatusInfo } from './helpers';

interface IProps extends Pick<IEvent, 'chosenInterval'> {
  role: Role;
  status: StatusType;
}

const Status: React.VFC<IProps> = ({ chosenInterval, role, status }) => {
  const info = {
    notYetScheduled: getStatusInfo(
      'Not scheduled yet',
      role === 'organizer'
        ? 'You can pick the time when everyone is subscribed!'
        : 'The event organizer will pick the time when everyone is subscribed!'
    ),
    pending: getStatusInfo(
      `Scheduled for ${dayjs(chosenInterval?.start).format('MMM D, YYYY')}`,
      `Will start in ${dayjs(chosenInterval?.start).toNow()}`
    ),
    past: getStatusInfo(
      `Was scheduled for ${dayjs(chosenInterval?.start).format('MMM D, YYYY')}`,
      `Ended ${dayjs(chosenInterval?.end).fromNow()} ago`
    ),
  };

  return (
    <InfoTile heading="Status" icon={getStatusIcon(status)}>
      {info[status]}
    </InfoTile>
  );
};

export default Status;
