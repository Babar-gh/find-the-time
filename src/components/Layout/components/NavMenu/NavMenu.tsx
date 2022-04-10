import { ComponentProps } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from 'ui-kit/Menu';
import { PRIVATE } from 'constants/routes';
import styles from './NavMenu.module.scss';

const getMenuItem = (
  to: PRIVATE,
  icon: ComponentProps<typeof Menu.Item>['icon'],
  text: string
) => (
  <Menu.Item
    id={to.slice(1)}
    icon={icon}
    elementProps={{ type: 'RouterLink', to }}
  >
    {text}
  </Menu.Item>
);

const NavMenu: React.VFC = () => {
  const { pathname } = useLocation();

  return (
    <nav className={styles['Root']}>
      <Menu selectedId={pathname.split('/')[1]}>
        {getMenuItem(PRIVATE.Events, 'Event', 'Events')}
        {getMenuItem(PRIVATE.About, 'Info', 'About')}
      </Menu>
    </nav>
  );
};

export default NavMenu;
