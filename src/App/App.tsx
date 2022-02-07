import { useEffect } from 'react';
import { useBreakpointsUpdate } from 'hooks/breakpoints';

import Layout from 'components/Layout';
import useTheme from './hooks/useTheme';
import bodyStyles from './Body.module.scss';

const App: React.VFC = () => {
  const [theme, switchTheme] = useTheme();

  useEffect(() => {
    document.body.className = bodyStyles[`Root_theme_${theme}`];
  }, [theme]);

  useBreakpointsUpdate();

  return (
    <div>
      <Layout onThemeSwitch={switchTheme} />
    </div>
  );
};

export default App;
