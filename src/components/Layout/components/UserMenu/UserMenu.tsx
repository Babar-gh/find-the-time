import Dropdown from 'ui-kit/Dropdown';
import Menu from 'ui-kit/Menu';
import Text from 'components/Text';
import { getDisplayName } from 'helpers/users/getDisplayName';
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
      <Dropdown.Separator />
      <Menu>
        <Menu.Item
          id="account"
          elementProps={{ type: 'RouterLink', to: PRIVATE.Account }}
          icon="AccountCircle"
        >
          Your account
        </Menu.Item>
        <Menu.Item
          id="settings"
          elementProps={{ type: 'RouterLink', to: PRIVATE.Settings }}
          icon="Settings"
        >
          Settings
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
