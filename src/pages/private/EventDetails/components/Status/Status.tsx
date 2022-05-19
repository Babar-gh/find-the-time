import dayjs from 'dayjs';
import { getStatus, getStatusIcon } from 'helpers/events';
import { IEvent } from 'types/events';
import InfoTile from '../InfoTile';
import { getStatusInfo } from './helpers';

interface IProps extends Pick<IEvent, 'chosenInterval'> {
  isOrganizer: boolean;
}

const Status: React.VFC<IProps> = ({ chosenInterval, isOrganizer }) => {
  const status = getStatus(chosenInterval);

  const info = {
    notYetScheduled: getStatusInfo(
      'Not scheduled yet',
      isOrganizer
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
