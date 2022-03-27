import { useState } from 'react';
import Menu from 'ui-kit/Menu';
import Text from 'components/Text';
import { signOut } from 'store/slices/account';
import { useAppDispatch } from 'store/hooks';
import styles from './UserMenu.module.scss';

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className={styles['Button']}
      onClick={() => setIsOpen((current) => !current)}
    >
      <Text font="brand" size="big" color="inherit">
        B
      </Text>
      {isOpen && (
        <nav className={styles['Container']}>
          <Menu>
            {/* TODO: Add enum for all the different routes*/}
            <Menu.Item
              id="account"
              elementProps={{ type: 'RouterLink', to: '/account' }}
              icon="AccountCircle"
            >
              Your account
            </Menu.Item>
            {/* TODO: Add enum for all the different routes*/}
            <Menu.Item
              id="settings"
              elementProps={{ type: 'RouterLink', to: '/settings' }}
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
        </nav>
      )}
    </button>
  );
};

export default UserMenu;
