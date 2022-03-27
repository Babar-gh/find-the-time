import { useEffect } from 'react';
import DummyContent from 'ui-kit/DummyContent';
import Layout from 'components/Layout';
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
        <DummyContent />
      </Layout>
    </div>
  );
};

export default App;
