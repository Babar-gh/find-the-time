import { Link } from 'react-router-dom';
import { useState } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import Logo from 'components/Logo';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import { ReactComponent as MenuIcon } from 'assets/icons/Menu.svg';
import styles from './Layout.module.scss';
import NavMenu from './components/NavMenu';
import Button from 'ui-kit/Button';

interface IProps {
  onThemeSwitch: () => void;
}

const Layout: React.FC<IProps> = ({ onThemeSwitch, children }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const bp = useBreakpointCheck();

  const menuButton = (
    <button
      className={styles['MenuButton']}
      onClick={() => setSidebarIsOpen((isOpen) => !isOpen)}
    >
      <MenuIcon className={styles['MenuIcon']} />
    </button>
  );

  const logo = (
    <Link to="/" className={styles['LogoContainer']}>
      <Logo />
    </Link>
  );

  const sidebar = (
    <div className={styles['Sidebar']}>
      {bp('Mobile') && (
        <header className={styles['SidebarHeader']}>
          {menuButton}
          {logo}
        </header>
      )}
      <NavMenu />
    </div>
  );

  const tempSwitchThemeButton = (
    <div
      style={{ alignSelf: 'center', marginLeft: 'auto', marginRight: '13px' }}
    >
      <Button
        elementProps={{
          onClick: onThemeSwitch,
        }}
      >
        Switch theme
      </Button>
    </div>
  );

  return (
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        {bp('Mobile', 'Tablet') && menuButton}
        {logo}
        {tempSwitchThemeButton}
      </header>

      <div className={styles['ColumnWrapper']}>
        {bp('Mobile') && (
          <Backdrop
            isOpen={sidebarIsOpen}
            onBackdropClick={() => setSidebarIsOpen(false)}
          >
            {sidebar}
          </Backdrop>
        )}
        {bp('Tablet') && sidebarIsOpen && sidebar}
        {bp('Laptop', 'Desktop') && sidebar}

        <main className={styles['Content']}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
