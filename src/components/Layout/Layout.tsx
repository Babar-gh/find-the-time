import { useState } from 'react';
import { Link } from 'react-router-dom';
import useBreakpointCheck from 'hooks/useBreakpointCheck';

import Backdrop from 'ui-kit/Backdrop';
import DummyContent from 'ui-kit/DummyContent';
import Logo from 'components/Logo';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';

import styles from './Layout.module.scss';
import NavMenu from './components/NavMenu';

interface IProps {
  onThemeSwitch: () => void;
}

const Layout: React.FC<IProps> = ({ onThemeSwitch }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const bp = useBreakpointCheck();

  const temporarySwitchThemeButton = (
    <button onClick={onThemeSwitch}>Switch theme</button>
  );

  const temporaryBreakpointIndicator = (
    <p style={{ color: 'var(--text-primary)' }}>
      Current breakpoint: {bp('Desktop') && 'Desktop'}
      {bp('Laptop') && 'Laptop'}
      {bp('Tablet') && 'Tablet'}
      {bp('Mobile') && 'Mobile'}
    </p>
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
          {temporaryBreakpointIndicator}
          <DummyContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
