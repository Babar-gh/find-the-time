import { isFirstRow, isLastRow } from 'components/Subscriptions/helpers';
import Text from 'components/Text';
import { getDisplayName } from 'helpers/users';
import { IUser } from 'types/users';
import IconButton from 'ui-kit/IconButton';
import { Rows } from '../../types';
import styles from './User.module.scss';

interface IProps {
  user: IUser;
  rows: Rows;
  isCurrent: boolean;
  onRemoval?: (user: IUser) => void;
}

const User: React.VFC<IProps> = ({ user, rows, isCurrent, onRemoval }) => {
  const notOrganizer = !isFirstRow(rows);
  const notAllParticipants = !isLastRow(rows);

  const removalButtonIsShown = notAllParticipants && notOrganizer && onRemoval;

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
