import Text from 'components/Text';
import { IEvent } from 'types/events';
import InfoTile from '../InfoTile';

interface IProps extends Pick<IEvent, 'location'> {}

const Location: React.VFC<IProps> = ({ location }) => (
  <InfoTile heading="Location" icon="LocationOn">
    <Text>{location}</Text>
  </InfoTile>
);

export default Location;
