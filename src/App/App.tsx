import { useEffect } from 'react';
import Button from 'ui-kit/Button';
import DummyContent from 'ui-kit/DummyContent';
import Layout from 'components/Layout';
import Page from 'ui-kit/Page';
import bodyStyles from './Body.module.scss';
import useBreakpointUpdate from './hooks/useBreakpointUpdate';
import useTheme from './hooks/useTheme';

const App: React.VFC = () => {
  const [theme, switchTheme] = useTheme();

  useEffect(() => {
    document.body.className = bodyStyles[`Root_theme_${theme}`];
  }, [theme]);

  useBreakpointUpdate();

  return (
    <div>
      <Layout onThemeSwitch={switchTheme}>
        <Page
          title="That's a Page!"
          headerAddon={
            <Button elementProps={{ onClick: () => alert('Kek!') }}>
              I'm a header addon
            </Button>
          }
        >
          <DummyContent />
        </Page>
      </Layout>
    </div>
  );
};

export default App;
