import Separator from 'ui-kit/Separator';
import Text from 'components/Text';
import { getDisplayName } from 'helpers/users';
import { IEvent } from 'types/events';
import InfoTile from '../InfoTile';

interface IProps extends Pick<IEvent, 'organizedBy'> {
  isCurrentUser: boolean;
}

const OrganizedBy: React.VFC<IProps> = ({ organizedBy, isCurrentUser }) => (
  <InfoTile heading="Organized By" icon="Person">
    <Text>{getDisplayName(organizedBy)}</Text>
    {isCurrentUser && (
      <>
        <Separator />
        <Text font="primaryItalic" size="small">
          That's you!
        </Text>
      </>
    )}
  </InfoTile>
);

export default OrganizedBy;
