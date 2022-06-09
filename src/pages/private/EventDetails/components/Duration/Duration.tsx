import dayjs from 'dayjs';
import Text from 'components/Text';
import { IEvent } from 'types/events';
import InfoTile from 'components/InfoTile';

interface IProps extends Pick<IEvent, 'duration'> {}

const Duration: React.VFC<IProps> = ({ duration }) => (
  <InfoTile heading="Duration" icon="Timelapse">
    <Text>{dayjs.duration(duration, 'minutes').humanize()}</Text>
  </InfoTile>
);

export default Duration;
