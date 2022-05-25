import Separator from 'ui-kit/Separator';
import Text from 'components/Text';
import { getDisplayName } from 'helpers/users';
import { IEvent } from 'types/events';
import InfoTile from '../InfoTile';

interface IProps extends Pick<IEvent, 'organizedBy'> {
  isThisUser: boolean;
}

const OrganizedBy: React.VFC<IProps> = ({ organizedBy, isThisUser }) => (
  <InfoTile heading="Organized By" icon="Person">
    <Text>{getDisplayName(organizedBy)}</Text>
    {isThisUser && (
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
