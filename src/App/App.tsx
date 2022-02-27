import { useEffect } from 'react';
import AuthLayout from 'components/AuthLayout';
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
      <AuthLayout onThemeSwitch={switchTheme} />
    </div>
  );
};

export default App;
