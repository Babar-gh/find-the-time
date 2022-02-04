import { useState } from 'react';
import { Link } from 'react-router-dom';

import Backdrop from 'components/ui-kit/Backdrop';
import Logo from 'components/Logo';
import DummyContent from 'components/ui-kit/DummyContent';
import DummyMenu from 'components/ui-kit/DummyList';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';

import styles from './Layout.module.scss';

interface IProps {
  onThemeSwitch: () => void;
}

const Layout: React.FC<IProps> = ({ onThemeSwitch }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  /* ——————————————— To be replaced with proper functionality ——————————————— */

  type Breakpoint = 'Mobile' | 'Tablet' | 'Laptop' | 'Desktop';
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('Desktop');

  const bp = (...breakpoints: Breakpoint[]) => {
    return breakpoints.some((bp) => bp === breakpoint);
  };

  const temporaryBreakpointSelect = (
    <select
      name="choice"
      value={breakpoint}
      onChange={(event) => setBreakpoint(event.target.value as Breakpoint)}
    >
      <option value="Mobile">Mobile</option>
      <option value="Tablet">Tablet</option>
      <option value="Laptop">Laptop</option>
      <option value="Desktop">Desktop</option>
    </select>
  );

  const temporarySwitchThemeButton = (
    <button onClick={onThemeSwitch}>Switch theme</button>
  );

  /* ———————————————————————————————————————————————————————————————————————— */

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
          {temporaryBreakpointSelect}
          <DummyContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
