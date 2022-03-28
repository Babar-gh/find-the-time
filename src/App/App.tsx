import { useEffect, useState } from 'react';
import Button from 'ui-kit/Button';
import Layout from 'components/Layout';
import Loader from 'ui-kit/Loader';
import Login from 'components/Login';
import bodyStyles from './Body.module.scss';
import useBreakpointUpdate from './hooks/useBreakpointUpdate';
import useTheme from './hooks/useTheme';

const App: React.VFC = () => {
  const [theme, switchTheme] = useTheme();
  const [loaderIsShown, setLoaderIsShown] = useState(false);

  useEffect(() => {
    document.body.className = bodyStyles[`Root_theme_${theme}`];
  }, [theme]);

  useBreakpointUpdate();

  return (
    <div>
      <Layout onThemeSwitch={switchTheme}>
        <Button
          elementProps={{
            onClick: () => setLoaderIsShown((current) => !current),
          }}
        >
          Show loader
        </Button>
        <Loader isShown={loaderIsShown}>
          <Login />
        </Loader>
      </Layout>
    </div>
  );
};

export default App;
