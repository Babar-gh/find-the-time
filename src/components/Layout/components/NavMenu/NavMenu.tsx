import Menu from 'ui-kit/Menu';
import styles from './NavMenu.module.scss';

const NavMenu: React.FC = () => {
  return (
    <nav className={styles['Root']}>
      <Menu selectedId="Ipsum">
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
      </Menu>
    </nav>
  );
};

export default NavMenu;
