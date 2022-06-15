import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { lazy, Suspense } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SnackbarProvider as NotificationProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import Account from 'pages/private/Account';
import AuthLayout from 'components/AuthLayout';
import ErrorBoundary from 'components/ErrorBoundary';
import GeneralError from 'pages/private/GeneralError';
import Layout from 'components/Layout';
import Login from 'pages/auth/Login';
import NotFound from 'pages/private/NotFound';
import About from 'pages/private/About';
import Page from 'ui-kit/Page';
import Registration from 'pages/auth/Registration';
import Text from 'components/Text';
import { AUTH, PARAM, PRIVATE } from 'constants/routes';
import NotificationSpawner from './components/NotificationSpawner/NotificationSpawner';
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

  const wrapWithProviders = (elementToWrap: JSX.Element) => (
    <ErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="en-gb">
        <ThemeProvider theme={theme.muiCurrent}>
          <NotificationProvider>
            <NotificationSpawner>{elementToWrap}</NotificationSpawner>
          </NotificationProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  );

  const authOutlet = (
    <AuthLayout theme={theme}>
      <AuthRoute />
    </AuthLayout>
  );

  const privateOutlet = (
    <Layout theme={theme}>
      <Suspense fallback={<Page title="" isLoading />}>
        <PrivateRoute />
      </Suspense>
    </Layout>
  );

  /* TODO: Replace stubs with proper:
    - password recovery page */

  return wrapWithProviders(
    <Routes>
      <Route element={authOutlet}>
        <Route path={AUTH.Login} element={<Login />} />
        <Route path={AUTH.Registration} element={<Registration />} />
        <Route path={AUTH.ResetPassword} element={dummyAuthPage} />
      </Route>
      <Route element={privateOutlet}>
        <Route path={PRIVATE.About} element={<About />} />
        <Route path={PRIVATE.Account} element={<Account />} />
        <Route path={PRIVATE.Events} element={<Events />}>
          <Route path={PRIVATE.CreateEvent} element={<NewEvent />} />
        </Route>
        <Route
          path={`${PRIVATE.Events}/:${PARAM.EventId}`}
          element={<EventDetails navigateBackTo={PRIVATE.Events} />}
        />
        <Route path={PRIVATE.Error} element={<GeneralError />} />
        <Route path={PRIVATE.NotFound} element={<NotFound />} />
      </Route>
      <Route path="/" element={<Navigate to={PRIVATE.Events} />} />
      <Route path="*" element={<Navigate to={PRIVATE.NotFound} />} />
    </Routes>
  );
};

export default App;
