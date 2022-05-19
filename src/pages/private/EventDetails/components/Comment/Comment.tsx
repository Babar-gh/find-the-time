import Text from 'components/Text';
import { IEvent } from 'types/events';
import InfoTile from '../InfoTile';

interface IProps extends Pick<IEvent, 'comment'> {}

const Comment: React.VFC<IProps> = ({ comment }) => (
  <InfoTile heading="Comment" icon="Description">
    <Text>{comment}</Text>
  </InfoTile>
);

export default Comment;
