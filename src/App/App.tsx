import { useEffect } from 'react';
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
      <Layout onThemeSwitch={switchTheme} />
    </div>
  );
};

export default App;
