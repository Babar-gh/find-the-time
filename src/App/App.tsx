import classNames from 'classnames/bind';
import Layout from 'components/Layout';
import useTheme from './hooks/useTheme';
import styles from './App.module.scss';

const cn = classNames.bind(styles);

const App: React.FC = () => {
  const [theme, switchTheme] = useTheme();

  return (
    <div className={cn(styles['Root'], styles[`Root_theme_${theme}`])}>
      <Layout />
    </div>
  );
};

export default App;
