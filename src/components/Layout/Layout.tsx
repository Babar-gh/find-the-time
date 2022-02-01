import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import DummyContent from 'components/ui-kit/DummyContent';
import DummyMenu from 'components/ui-kit/DummyList';
import Logo from '../Logo';
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
            className={styles['SidebarScrim']}
            onClick={() => setSidebarIsHiddenOnSmallScreens(true)}
          />
        )}

        <main className={styles['ContentContainer']}>
          <DummyContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
