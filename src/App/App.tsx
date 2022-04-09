import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from 'components/AuthLayout';
import Events from 'pages/private/Events';
import Layout from 'components/Layout';
import Loading from 'pages/private/Loading';
import Login from 'pages/auth/Login';
import Registration from 'pages/auth/Registration';
import Text from 'components/Text';
import { AUTH, PRIVATE } from 'constants/routes';
import PrivateRoute from './components/PrivateRoute';
import useBreakpointUpdate from './hooks/useBreakpointUpdate';
import useTheme from './hooks/useTheme';
import bodyStyles from './Body.module.scss';
import AuthRoute from './components/AuthRoute';

const DummyPage = lazy(() => import('pages/private/DummyPage'));

const dummyAuthPage = <Text size="big">TBD</Text>;

const App: React.VFC = () => {
  const [theme, switchTheme] = useTheme();

  useEffect(() => {
    document.body.className = bodyStyles[`Root_theme_${theme}`];
  }, [theme]);

  useBreakpointUpdate();

  const authOutlet = (
    <AuthLayout onThemeSwitch={switchTheme}>
      <AuthRoute />
    </AuthLayout>
  );

  const privateOutlet = (
    <Layout onThemeSwitch={switchTheme}>
      <Suspense fallback={<Loading />}>
        <PrivateRoute />
      </Suspense>
    </Layout>
  );

  /* TODO: Replace stubs with proper:
    - password recovery component.
    - account details page
    - settings page */

  return (
    <Routes>
      <Route element={authOutlet}>
        <Route path={AUTH.Login} element={<Login />} />
        <Route path={AUTH.Registration} element={<Registration />} />
        <Route path={AUTH.ResetPassword} element={dummyAuthPage} />
      </Route>
      <Route element={privateOutlet}>
        <Route path={PRIVATE.About} element={<DummyPage />} />
        <Route path={PRIVATE.Account} element={<DummyPage />} />
        <Route path={PRIVATE.Events} element={<Events />} />
        <Route path={PRIVATE.Settings} element={<DummyPage />} />
      </Route>
      <Route path="*" element={<Navigate to={PRIVATE.Events} />} />
    </Routes>
  );
};

export default App;
