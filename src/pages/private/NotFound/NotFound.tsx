import { useLocation } from 'react-router-dom';
import { LocationState } from 'types/location';
import ErrorPage from 'ui-kit/ErrorPage';

const NotFound: React.VFC = () => {
  const config = useLocation().state as LocationState;

  const errorPageProps = {
    title: config?.title || 'Page Not Found',
    message: config?.message || 'This page isn’t available. Sorry about that.',
    returnUrl: config?.returnUrl || '/',
    returnButtonText: config?.returnButtonText || 'Go home',
  };

  return <ErrorPage {...errorPageProps} />;
};

export default NotFound;
