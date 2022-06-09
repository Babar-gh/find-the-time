import Text from 'components/Text';
import { IEvent } from 'types/events';
import InfoTile from 'components/InfoTile';

interface IProps extends Pick<IEvent, 'comment'> {}

const Comment: React.VFC<IProps> = ({ comment }) => (
  <InfoTile heading="Comment" icon="Description">
    {comment === '' ? (
      <Text font="primaryItalic">No additional info provided</Text>
    ) : (
      <Text>{comment}</Text>
    )}
  </InfoTile>
);

export default Comment;
