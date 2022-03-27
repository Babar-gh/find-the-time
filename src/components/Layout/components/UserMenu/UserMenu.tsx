import { useState } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import Menu from 'ui-kit/Menu';
import Text from 'components/Text';
import useAccountDisplayName from 'hooks/useAccountDisplayName';
import { signOut } from 'store/slices/account';
import { useAppDispatch } from 'store/hooks';
import styles from './UserMenu.module.scss';

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const displayName = useAccountDisplayName();

  return (
    <button
      className={styles['Button']}
      onClick={() => setIsOpen((current) => !current)}
    >
      <Text font="brand" size="big" color="inherit">
        {displayName.charAt(0).toUpperCase()}
      </Text>
      <Backdrop isOpen={isOpen} theme="transparent">
        <nav className={styles['Container']}>
          <div className={styles['DisplayNameContainer']}>
            <Text size="small">Signed in as </Text>
            <Text font="primaryBold" size="small">
              {displayName}
            </Text>
          </div>
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
      </Backdrop>
    </button>
  );
};

export default UserMenu;
