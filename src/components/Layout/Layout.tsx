import { Link } from 'react-router-dom';
import { useState } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import Logo from 'components/Logo';
import ThemeSwitchButton from 'components/ThemeSwitchButton';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import useTheme from 'App/hooks/useTheme';
import { ReactComponent as MenuIcon } from 'assets/icons/Menu.svg';
import UserMenu from './components/UserMenu';
import NavMenu from './components/NavMenu';
import styles from './Layout.module.scss';

interface IProps {
  theme: ReturnType<typeof useTheme>;
}

const Layout: React.FC<IProps> = ({ theme, children }) => {
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

  const themeSwitchButton = (
    <div className={styles['SwitchThemeButtonContainer']}>
      <ThemeSwitchButton theme={theme} />
    </div>
  );

  const userMenuButton = (
    <div className={styles['UserMenuButtonContainer']}>
      <UserMenu />
    </div>
  );

  return (
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        {bp('Mobile', 'Tablet') && menuButton}
        {logo}
        {themeSwitchButton}
        {userMenuButton}
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
