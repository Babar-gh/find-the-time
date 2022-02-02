import { useEffect } from 'react';
import Layout from 'components/Layout';
import useTheme from './hooks/useTheme';
import bodyStyles from './Body.module.scss';

const App: React.VFC = () => {
  const [theme, switchTheme] = useTheme();

  useEffect(() => {
    document.body.className = bodyStyles[`Root_theme_${theme}`];
  }, [theme]);

  return (
    <div>
      <Layout onThemeSwitch={switchTheme} />
    </div>
  );
};

export default App;
