import Dropdown from 'ui-kit/Dropdown';
import Menu from 'ui-kit/Menu';
import Separator from 'ui-kit/Separator';
import Text from 'components/Text';
import { getDisplayName } from 'helpers/users';
import { PRIVATE } from 'constants/routes';
import { signOut } from 'store/slices/account';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import styles from './UserMenu.module.scss';

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const account = useAppSelector((store) => store.account);
  const displayName = getDisplayName(account);

  return (
    <Dropdown
      trigger={
        <button className={styles['Button']}>
          <Text font="brand" size="big" color="inherit">
            {displayName.charAt(0).toUpperCase()}
          </Text>
        </button>
      }
      align="right"
    >
      <div className={styles['DisplayName']}>
        <Text size="small">Signed in as </Text>
        <br />
        <Text font="primaryBold" clamp={1}>
          {displayName}
        </Text>
      </div>
      <Separator theme="dropdown" />
      <Menu>
        <Menu.Item
          id="account"
          elementProps={{ type: 'RouterLink', to: PRIVATE.Account }}
          icon="Settings"
        >
          Manage account
        </Menu.Item>
        <Menu.Item
          id="logout"
          element="HTMLButton"
          elementProps={{ onClick: () => dispatch(signOut()) }}
          icon="Logout"
        >
          Sign out
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default UserMenu;
