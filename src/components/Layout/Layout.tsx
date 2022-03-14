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
import { Token } from 'types/common';
import styles from './Layout.module.scss';
import NavMenu from './components/NavMenu';

interface IProps {
  onThemeSwitch: () => void;
}

const Layout: React.FC<IProps> = ({ onThemeSwitch }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const bp = useBreakpointCheck();

  const temporarySwitchThemeButton = (
    <Button elementProps={{ onClick: onThemeSwitch }} leftIcon="Menu">
      Switch theme
    </Button>
  );

  const temporaryBreakpointIndicator = (
    <p>
      <Text>Current breakpoint:</Text> {bp('Desktop') && <Text>Desktop</Text>}
      {bp('Laptop') && <Text>Laptop</Text>}
      {bp('Tablet') && <Text>Tablet</Text>}
      {bp('Mobile') && <Text>Mobile</Text>}
    </p>
  );

  const temporatyJwtIntercetorTest = (
    <div
      style={{
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Text>Set JWT:</Text>
      <input
        style={{
          backgroundColor: 'var(--canvas-secondary)',
          borderColor: 'var(--text-primary)',
        }}
        onChange={(event) => {
          jwt.set(event.target.value as Token);
          window.location.reload();
        }}
      />
      <Text>Current JWT:</Text>
      <Text>
        {`...${jwt.get()?.slice(-30)}` || 'No JWT detected in local storage'}
      </Text>
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
        leftIcon="EventAvailable"
        theme="danger"
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
          <div style={{ padding: '16px' }}>
            {temporatyJwtIntercetorTest}
            {temporarySwitchThemeButton}
            {temporaryBreakpointIndicator}
            <DummyContent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
