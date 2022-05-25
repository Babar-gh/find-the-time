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
  onRemoval?: (user: IUser) => void;
}

const User: React.VFC<IProps> = ({ user, rows, onRemoval }) => {
  const notOrganizer = !isFirstRow(rows);
  const notAllParticipants = !isLastRow(rows);

  const removalButtonIsShown = notAllParticipants && notOrganizer && onRemoval;

  return (
    <div className={styles['Root']}>
      <Text font="primaryBold">{getDisplayName(user)}</Text>
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
