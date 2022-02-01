import classNames from 'classnames/bind';
import Layout from 'components/Layout';
import useTheme from './hooks/useTheme';
import styles from './App.module.scss';

const cn = classNames.bind(styles);

const App: React.FC = () => {
  const [theme, switchTheme] = useTheme();

  return (
    <div className={cn('Root', `Root_theme_${theme}`)}>
      <Layout onThemeSwitch={switchTheme} />
    </div>
  );
};

export default App;
