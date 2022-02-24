import { Link } from 'react-router-dom';
import { useState } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import Button from 'ui-kit/Button';
import DummyContent from 'ui-kit/DummyContent';
import Logo from 'components/Logo';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import { ReactComponent as MenuIcon } from 'assets/icons/Menu.svg';
import NavMenu from './components/NavMenu';
import styles from './Layout.module.scss';

interface IProps {
  onThemeSwitch: () => void;
}

const Layout: React.FC<IProps> = ({ onThemeSwitch }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const bp = useBreakpointCheck();

  const temporarySwitchThemeButtons = (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
        }}
      >
        <Button onClick={onThemeSwitch} theme="primary">
          Switch theme
        </Button>
        <Button
          onClick={onThemeSwitch}
          theme="primary"
          leftIcon="EventAvailable"
        >
          Switch theme
        </Button>
        <Button onClick={onThemeSwitch} theme="primary" rightIcon="Menu">
          Switch theme
        </Button>
        <Button
          onClick={onThemeSwitch}
          theme="primary"
          leftIcon="Menu"
          rightIcon="EventAvailable"
        >
          Switch theme... dangerously!
        </Button>
        <Button onClick={onThemeSwitch} theme="danger">
          Switch theme... dangerously!
        </Button>
        <Button onClick={onThemeSwitch} theme="danger" leftIcon="Menu">
          Switch theme... dangerously!
        </Button>
        <Button
          onClick={onThemeSwitch}
          theme="danger"
          rightIcon="EventAvailable"
        >
          Switch theme... dangerously!
        </Button>
        <Button
          onClick={onThemeSwitch}
          theme="danger"
          leftIcon="EventAvailable"
          rightIcon="Menu"
        >
          Switch theme... dangerously!
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
        }}
      >
        <Button
          linkConfig={{ type: 'HTMLAnchor', href: 'https://www.google.com/' }}
          theme="primary"
        >
          I'm link to google.com
        </Button>
        <Button
          linkConfig={{ type: 'RouterLink', to: '/lorem' }}
          theme="primary"
          leftIcon="EventAvailable"
        >
          I'm router link to /lorem
        </Button>
        <Button
          linkConfig={{ type: 'HTMLAnchor', href: 'https://www.google.com/' }}
          theme="primary"
          rightIcon="Menu"
        >
          I'm link to google.com
        </Button>
        <Button
          linkConfig={{ type: 'RouterLink', to: '/ipsum' }}
          theme="primary"
          leftIcon="Menu"
          rightIcon="EventAvailable"
        >
          I'm router link to /ipsum
        </Button>
        <Button
          linkConfig={{ type: 'HTMLAnchor', href: 'https://www.google.com/' }}
          theme="danger"
        >
          I'm link to google.com... a dangerous one!
        </Button>
        <Button
          linkConfig={{ type: 'RouterLink', to: '/dolor' }}
          theme="danger"
          leftIcon="EventAvailable"
        >
          I'm router link to /dolor... a dangerous one!
        </Button>
        <Button
          linkConfig={{ type: 'HTMLAnchor', href: 'https://www.google.com/' }}
          theme="danger"
          rightIcon="Menu"
        >
          I'm link to google.com... a dangerous one!
        </Button>
        <Button
          linkConfig={{ type: 'RouterLink', to: '/sit' }}
          theme="danger"
          leftIcon="Menu"
          rightIcon="EventAvailable"
        >
          I'm router link to /sit... a dangerous one!
        </Button>
      </div>
    </div>
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
          {temporarySwitchThemeButtons}
          {temporaryBreakpointIndicator}
          <DummyContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
