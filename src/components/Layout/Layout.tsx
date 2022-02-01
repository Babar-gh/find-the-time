import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import Logo from 'components/Logo';
import DummyContent from 'components/ui-kit/DummyContent';
import DummyMenu from 'components/ui-kit/DummyList';

import styles from './Layout.module.scss';

const cn = classNames.bind(styles);

interface IProps {
  onThemeSwitch: () => void;
}

const Layout: React.FC<IProps> = ({ onThemeSwitch }) => {
  const [sidebarIsHiddenOnSmallScreens, setSidebarIsHiddenOnSmallScreens] =
    useState(true);

  const topBarLeftPart = (
    <>
      <button
        className={styles['MenuButton']}
        onClick={() =>
          setSidebarIsHiddenOnSmallScreens((isHidden) => !isHidden)
        }
      >
        <MenuIcon className={styles['MenuIcon']} />
      </button>
      <Link to="/" className={styles['LogoContainer']}>
        <Logo />
      </Link>
    </>
  );

  return (
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        {topBarLeftPart}
        <button
          style={{ marginLeft: 'auto', width: '60px' }}
          onClick={onThemeSwitch}
        >
          Switch theme
        </button>
      </header>
      <div className={styles['ColumnWrapper']}>
        <nav
          className={cn('Sidebar', {
            Sidebar_hiddenOnSmallScreens: sidebarIsHiddenOnSmallScreens,
          })}
        >
          <header className={styles['SidebarHeader']}>{topBarLeftPart}</header>
          <DummyMenu />
        </nav>

        {!sidebarIsHiddenOnSmallScreens && (
          <div
            className={styles['SidebarBackdrop']}
            onClick={() => setSidebarIsHiddenOnSmallScreens(true)}
          />
        )}

        <main className={styles['Content']}>
          <DummyContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
