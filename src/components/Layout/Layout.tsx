import { useState } from 'react';
import classNames from 'classnames/bind';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import DummyContent from 'components/ui-kit/DummyContent';
import Logo from '../Logo';
import styles from './Layout.module.scss';
import DummyMenu from 'components/ui-kit/DummyList';
import { Link } from 'react-router-dom';

const cn = classNames.bind(styles);

const Layout: React.FC = () => {
  const [menuIsHiddenOnSmallScreens, setMenuIsHiddenOnSmallScreens] =
    useState(true);

  return (
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        <button
          className={styles['MenuButton']}
          onClick={() => setMenuIsHiddenOnSmallScreens((isHidden) => !isHidden)}
        >
          <MenuIcon className={styles['MenuIcon']} />
        </button>
        <Link to="/" className={styles['LogoContainer']}>
          <Logo />
        </Link>
      </header>
      <div className={styles['Wrapper']}>
        <nav
          className={cn('MenuContainer', {
            MenuContainer_hiddenOnSmallScreens: menuIsHiddenOnSmallScreens,
          })}
        >
          <DummyMenu />
        </nav>
        <main className={styles['ContentContainer']}>
          <DummyContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
