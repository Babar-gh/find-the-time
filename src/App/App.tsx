import { useEffect } from 'react';
import bodyStyles from './Body.module.scss';
import PrivateApp from './components/PrivateApp';
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
      <PrivateApp onThemeSwitch={switchTheme} />
    </div>
  );
};

export default App;
