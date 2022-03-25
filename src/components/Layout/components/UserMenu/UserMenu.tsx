import Text from 'components/Text';
import { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { signOut } from 'store/slices/account';
import Menu from 'ui-kit/Menu';
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
            <Menu.Item
              id="Lorem"
              elementProps={{ type: 'HTMLAnchor', href: '/lorem' }}
              icon="EventAvailable"
            >
              Lorem
            </Menu.Item>
            <Menu.Item
              id="Ipsum"
              elementProps={{ type: 'RouterLink', to: '/ipsum' }}
            >
              Ipsum
            </Menu.Item>
            <Menu.Item
              id="Dolor"
              element="HTMLButton"
              elementProps={{ onClick: () => alert('Dolor!') }}
              icon="Menu"
            >
              Dolor
            </Menu.Item>
            <Menu.Item
              id="Sit"
              element="HTMLButton"
              elementProps={{ onClick: () => alert('Sit!') }}
            >
              Sit
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
