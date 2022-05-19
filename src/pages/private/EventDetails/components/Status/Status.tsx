import dayjs from 'dayjs';
import Separator from 'ui-kit/Separator';
import Text from 'components/Text';
import { getStatus, getStatusIcon } from 'helpers/events';
import { IEvent } from 'types/events';
import InfoTile from '../InfoTile';

interface IProps extends Pick<IEvent, 'chosenInterval'> {
  isOrganizer: boolean;
}

const Status: React.VFC<IProps> = ({ chosenInterval, isOrganizer }) => {
  const status = getStatus(chosenInterval);

  const notYetScheduled = (
    <>
      <Text>Not scheduled yet</Text>
      <Separator context="menu" />
      <Text font="primaryItalic" size="small">
        {isOrganizer
          ? 'You can pick the time when everyone is subscribed!'
          : 'The event organizer will pick the time when everyone is subscribed!'}
      </Text>
    </>
  );

  const pending = (
    <>
      <Text>
        Scheduled for {dayjs(chosenInterval?.start).format('MMM D, YYYY')}
      </Text>
      <Separator context="menu" />
      <Text font="primaryItalic" size="small">
        Will start in {dayjs(chosenInterval?.start).toNow()}
      </Text>
    </>
  );

  const past = (
    <>
      <Text>
        Was scheduled for {dayjs(chosenInterval?.start).format('MMM D, YYYY')}
      </Text>
      <Separator context="menu" />
      <Text font="primaryItalic" size="small">
        Ended {dayjs(chosenInterval?.end).fromNow()} ago
      </Text>
    </>
  );

  const tileChildren = { notYetScheduled, pending, past };

  return (
    <InfoTile heading="Status" icon={getStatusIcon(status)}>
      {tileChildren[status]}
    </InfoTile>
  );
};

export default Status;
