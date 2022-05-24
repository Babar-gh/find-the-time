import Text from 'components/Text';
import { getDisplayName } from 'helpers/users';
import { IEvent, Role } from 'types/events';
import Separator from 'ui-kit/Separator';
import InfoTile from '../InfoTile';

interface IProps extends Pick<IEvent, 'organizedBy'> {
  role: Role;
}

const OrganizedBy: React.VFC<IProps> = ({ organizedBy, role }) => (
  <InfoTile heading="Organized By" icon="Person">
    <Text>{getDisplayName(organizedBy)}</Text>
    {role === 'organizer' && (
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
