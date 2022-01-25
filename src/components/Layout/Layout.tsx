import { useState } from 'react';
import classNames from 'classnames/bind';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import Logo from './components/Logo';
import styles from './Layout.module.scss';

const cn = classNames.bind(styles);

const Layout: React.FC = () => {
  const [menuIsHidden, setMenuIsHidden] = useState(true);

  return (
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        <button
          className={styles['MenuButton']}
          onClick={() => setMenuIsHidden((isHidden) => !isHidden)}
        >
          <MenuIcon className={styles['MenuIcon']} />
        </button>
        <Logo />
      </header>
      <div className={styles['Wrapper']}>
        <nav
          className={cn(styles['MenuContainer'], {
            [styles['MenuContainer_hidden']]: menuIsHidden,
          })}
        ></nav>
        <main className={styles['ContentContainer']}></main>
      </div>
    </div>
  );
};

export default Layout;
