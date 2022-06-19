import dayjs from 'dayjs';
import Text from 'components/Text';
import { IEvent } from 'types/events';
import InfoTile from 'components/InfoTile';

interface IProps extends Pick<IEvent, 'duration'> {}

const Duration: React.VFC<IProps> = ({ duration: totalMinutes }) => {
  const duration = dayjs.duration(totalMinutes, 'minutes');

  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  return (
    <InfoTile heading="Duration" icon="Timelapse">
      {hours > 0 && <Text>{`${hours} hours `}</Text>}
      <Text>{`${minutes} minutes`}</Text>
    </InfoTile>
  );
};

export default Duration;
