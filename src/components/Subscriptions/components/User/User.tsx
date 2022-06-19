import Text from 'components/Text';
import { getDisplayName } from 'helpers/users';
import { IUser } from 'types/users';
import IconButton from 'ui-kit/IconButton';
import styles from './User.module.scss';

interface IProps {
  user: IUser;
  isCurrent: boolean;
  isOrganizer: boolean;
  isAllParticipants: boolean;
  onRemoval?: (user: IUser) => void;
}

const User: React.VFC<IProps> = ({
  user,
  isCurrent,
  isOrganizer,
  isAllParticipants,
  onRemoval,
}) => {
  const removalButtonIsShown = !isAllParticipants && !isOrganizer && onRemoval;

  const displayName = getDisplayName(user);

  return (
    <div className={styles['Root']}>
      <p className={styles['Name']} title={displayName}>
        <Text
          font={isCurrent ? 'primaryBold' : 'primary'}
          color={isCurrent ? 'secondary' : 'primary'}
          clamp={1}
        >
          {displayName}
        </Text>
      </p>
      {removalButtonIsShown && (
        <IconButton
          icon="Close"
          elementProps={{ onClick: () => onRemoval(user) }}
        />
      )}
    </div>
  );
};

export default User;
