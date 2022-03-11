import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as jwt from 'jwt';
import Backdrop from 'ui-kit/Backdrop';
import Button from 'ui-kit/Button';
import DummyContent from 'ui-kit/DummyContent';
import Logo from 'components/Logo';
import Text from 'components/Text';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import { createEvent } from 'api/events';
import { ReactComponent as MenuIcon } from 'assets/icons/Menu.svg';
import styles from './Layout.module.scss';
import NavMenu from './components/NavMenu';

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
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
        }}
      >
        <Button elementProps={{ onClick: onThemeSwitch }} theme="primary">
          OK
        </Button>
        <Button elementProps={{ onClick: onThemeSwitch }} theme="primary">
          .
        </Button>
        <Button elementProps={{ onClick: onThemeSwitch }} theme="primary">
          —
        </Button>
        <Button
          elementProps={{ onClick: onThemeSwitch }}
          theme="primary"
          width="block"
          leftIcon="EventAvailable"
        >
          Switch theme
        </Button>
        <Button
          elementProps={{ onClick: onThemeSwitch }}
          theme="primary"
          rightIcon="Menu"
        >
          Switch theme
        </Button>
        <Button
          elementProps={{ onClick: onThemeSwitch }}
          theme="primary"
          width="block"
          leftIcon="Menu"
          rightIcon="EventAvailable"
        >
          Switch theme... dangerously!
        </Button>
        <Button elementProps={{ onClick: onThemeSwitch }} theme="danger">
          Switch theme... dangerously!
        </Button>
        <Button
          elementProps={{ onClick: onThemeSwitch }}
          theme="danger"
          width="block"
          leftIcon="Menu"
        >
          Switch theme... dangerously!
        </Button>
        <Button
          elementProps={{ onClick: onThemeSwitch }}
          theme="danger"
          rightIcon="EventAvailable"
        >
          Switch theme... dangerously!
        </Button>
        <Button
          elementProps={{ onClick: onThemeSwitch }}
          theme="danger"
          width="block"
          leftIcon="EventAvailable"
          rightIcon="Menu"
        >
          Switch theme... dangerously!
        </Button>
      </div>
      <div
        style={{
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
        }}
      >
        <Button
          element="LinkWrapper"
          elementProps={{ type: 'HTMLAnchor', href: 'https://www.google.com/' }}
          theme="primary"
          width="block"
        >
          I'm link to google.com
        </Button>
        <Button
          element="LinkWrapper"
          elementProps={{ type: 'RouterLink', to: '/lorem' }}
          theme="primary"
          leftIcon="EventAvailable"
        >
          I'm router link to /lorem
        </Button>
        <Button
          element="LinkWrapper"
          elementProps={{ type: 'HTMLAnchor', href: 'https://www.google.com/' }}
          theme="primary"
          width="block"
          rightIcon="Menu"
        >
          I'm link to google.com
        </Button>
        <Button
          element="LinkWrapper"
          elementProps={{ type: 'RouterLink', to: '/ipsum' }}
          theme="primary"
          leftIcon="Menu"
          rightIcon="EventAvailable"
        >
          I'm router link to /ipsum
        </Button>
        <Button
          element="LinkWrapper"
          elementProps={{ type: 'HTMLAnchor', href: 'https://www.google.com/' }}
          theme="danger"
          width="block"
        >
          I'm link to google.com... a dangerous one!
        </Button>
        <Button
          element="LinkWrapper"
          elementProps={{ type: 'RouterLink', to: '/dolor' }}
          theme="danger"
          leftIcon="EventAvailable"
        >
          I'm router link to /dolor... a dangerous one!
        </Button>
        <Button
          element="LinkWrapper"
          elementProps={{ type: 'HTMLAnchor', href: 'https://www.google.com/' }}
          theme="danger"
          width="block"
          rightIcon="Menu"
        >
          I'm link to google.com... a dangerous one!
        </Button>
        <Button
          element="LinkWrapper"
          elementProps={{ type: 'RouterLink', to: '/sit' }}
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

  const temporatyJwtIntercetorTest = (
    <div style={{ padding: '16px' }}>
      <Text>{jwt.get() || 'No JWT detected in local storage'}</Text>
      <Button
        elementProps={{
          onClick: () =>
            createEvent({
              title: 'Test Event',
              duration: 123,
              location: 'Miyazaki Swamp',
              comment: '321',
              initialIntervals: [
                {
                  start: '2022-03-11 12:00:00',
                  end: '2022-03-12 12:00:00',
                },
                {
                  start: '2022-03-13 12:00:00',
                  end: '2022-03-14 12:00:00',
                },
              ],
            }).then(({ data }) => {
              console.log(data);
            }),
        }}
      >
        Make request
      </Button>
    </div>
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
          {temporatyJwtIntercetorTest}
          {temporarySwitchThemeButtons}
          {temporaryBreakpointIndicator}
          <DummyContent />
        </main>
      </div>
    </div>
  );
};

export default Layout;
