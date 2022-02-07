import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBreakpoints } from 'hooks/breakpoints';

import Backdrop from 'ui-kit/Backdrop';
import DummyContent from 'ui-kit/DummyContent';
import DummyMenu from 'ui-kit/DummyList';
import Logo from 'components/Logo';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';

import styles from './Layout.module.scss';

interface IProps {
  onThemeSwitch: () => void;
}

const Layout: React.FC<IProps> = ({ onThemeSwitch }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const bp = useBreakpoints();

  const temporarySwitchThemeButton = (
    <button onClick={onThemeSwitch}>Switch theme</button>
  );

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
    <nav className={styles['Sidebar']}>
      {bp('Mobile') && (
        <header className={styles['SidebarHeader']}>
          {menuButton}
          {logo}
        </header>
      )}
      <DummyMenu />
    </nav>
  );

  return (
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        {bp('Mobile', 'Tablet') && menuButton}
        {logo}
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

        <main className={styles['Content']}>
          {temporarySwitchThemeButton}
          <DummyContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
