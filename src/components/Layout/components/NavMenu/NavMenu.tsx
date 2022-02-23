import Menu from 'ui-kit/Menu';
import styles from './NavMenu.module.scss';

const NavMenu: React.FC = () => {
  return (
    <nav className={styles['Root']}>
      <Menu selectedId="Ipsum">
        <Menu.Item
          id="Lorem"
          linkConfig={{ type: 'HTMLAnchor', href: '/lorem' }}
          icon="EventAvailable"
        >
          Lorem
        </Menu.Item>
        <Menu.Item id="Ipsum" linkConfig={{ type: 'RouterLink', to: '/lorem' }}>
          Ipsum
        </Menu.Item>
        <Menu.Item
          id="Dolor"
          isButton
          onClick={() => alert('Dolor!')}
          icon="Menu"
        >
          Dolor
        </Menu.Item>
        <Menu.Item id="Sit" isButton onClick={() => alert('Sit!')}>
          Sit
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default NavMenu;
