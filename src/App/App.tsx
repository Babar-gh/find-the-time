import styles from './App.module.scss';
import useTheme from './hooks/useTheme';

const App: React.FC = () => {
  const [theme, switchTheme] = useTheme();

  return <div className={styles[`Root_theme_${theme}`]}></div>;
};

export default App;
