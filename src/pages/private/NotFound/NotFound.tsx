import { useLocation } from 'react-router-dom';
import { LocationState } from 'types/location';
import ErrorPage from 'ui-kit/ErrorPage';

const NotFound: React.VFC = () => {
  const {
    title = 'Page Not Found',
    message = 'This page isn’t available. Sorry about that.',
    returnUrl,
    returnButtonText,
  } = (useLocation().state as LocationState) || {};

  return <ErrorPage {...{ title, message, returnUrl, returnButtonText }} />;
};

export default NotFound;
