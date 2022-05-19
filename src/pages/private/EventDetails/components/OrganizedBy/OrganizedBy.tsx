import Text from 'components/Text';
import { getDisplayName } from 'helpers/users';
import { IEvent } from 'types/events';
import Separator from 'ui-kit/Separator';
import InfoTile from '../InfoTile';

interface IProps extends Pick<IEvent, 'organizedBy'> {
  isOrganizer: boolean;
}

const OrganizedBy: React.VFC<IProps> = ({ organizedBy, isOrganizer }) => (
  <InfoTile heading="Organized By" icon="Person">
    <Text>{getDisplayName(organizedBy)}</Text>
    {isOrganizer && (
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
