import useLocalStorage from 'use-local-storage';
import { Theme } from 'types/theme';
import styles from './App.module.scss';

const App: React.FC = () => {
  const darkIsDefault = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const defaultTheme = darkIsDefault ? 'dark' : 'light';

  const [theme, setTheme] = useLocalStorage<Theme>('theme', defaultTheme);

  return <div className={styles[`Root_theme_${theme}`]}></div>;
};

export default App;
