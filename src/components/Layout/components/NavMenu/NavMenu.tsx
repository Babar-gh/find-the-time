import { useLocation } from 'react-router-dom';
import Menu from 'ui-kit/Menu';
import { PRIVATE } from 'constants/routes';
import styles from './NavMenu.module.scss';

const NavMenu: React.VFC = () => {
  const { pathname } = useLocation();

  return (
    <nav className={styles['Root']}>
      <Menu selectedId={pathname}>
        <Menu.Item
          id={PRIVATE.Events}
          icon="Event"
          elementProps={{ type: 'RouterLink', to: PRIVATE.Events }}
        >
          Events
        </Menu.Item>
        <Menu.Item
          id={PRIVATE.About}
          icon="Info"
          elementProps={{ type: 'RouterLink', to: PRIVATE.About }}
        >
          About
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default NavMenu;
