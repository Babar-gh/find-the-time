import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { lazy, Suspense } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AuthLayout from 'components/AuthLayout';
import ErrorBoundary from 'components/ErrorBoundary';
import GeneralError from 'pages/private/GeneralError';
import Layout from 'components/Layout';
import Login from 'pages/auth/Login';
import NotFound from 'pages/private/NotFound';
import Page from 'ui-kit/Page';
import Registration from 'pages/auth/Registration';
import Text from 'components/Text';
import { AUTH, PARAM, PRIVATE } from 'constants/routes';
import PrivateRoute from './components/PrivateRoute';
import useBreakpointUpdate from './hooks/useBreakpointUpdate';
import useTheme from './hooks/useTheme';
import AuthRoute from './components/AuthRoute';

const Events = lazy(() => import('pages/private/Events'));
const NewEvent = lazy(() => import('pages/private/NewEvent'));
const EventDetails = lazy(() => import('pages/private/EventDetails'));
const DummyPage = lazy(() => import('pages/private/DummyPage'));

const dummyAuthPage = <Text size="big">TBD</Text>;

const App: React.VFC = () => {
  const theme = useTheme();

  useBreakpointUpdate();

  const authOutlet = (
    <AuthLayout theme={theme}>
      <AuthRoute />
    </AuthLayout>
  );

  const privateOutlet = (
    <ThemeProvider theme={theme.muiCurrent}>
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="en-gb">
        <Layout theme={theme}>
          <Suspense fallback={<Page title="" isLoading />}>
            <PrivateRoute />
          </Suspense>
        </Layout>
      </LocalizationProvider>
    </ThemeProvider>
  );

  /* TODO: Replace stubs with proper:
    - password recovery page
    - about page
    - account details page
    - settings page */

  return (
    <ErrorBoundary>
      <Routes>
        <Route element={authOutlet}>
          <Route path={AUTH.Login} element={<Login />} />
          <Route path={AUTH.Registration} element={<Registration />} />
          <Route path={AUTH.ResetPassword} element={dummyAuthPage} />
        </Route>
        <Route element={privateOutlet}>
          <Route path={PRIVATE.About} element={<DummyPage />} />
          <Route path={PRIVATE.Account} element={<DummyPage />} />
          <Route path={PRIVATE.Events} element={<Events />}>
            <Route path={PRIVATE.CreateEvent} element={<NewEvent />} />
          </Route>
          <Route
            path={`${PRIVATE.Events}/:${PARAM.EventId}`}
            element={<EventDetails navigateBackTo={PRIVATE.Events} />}
          />
          <Route path={PRIVATE.Settings} element={<DummyPage />} />
          <Route path={PRIVATE.Error} element={<GeneralError />} />
          <Route path={PRIVATE.NotFound} element={<NotFound />} />
        </Route>
        <Route path="/" element={<Navigate to={PRIVATE.Events} />} />
        <Route path="*" element={<Navigate to={PRIVATE.NotFound} />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
