import ErrorPage from 'ui-kit/ErrorPage';

const GeneralError: React.VFC = () => (
  <ErrorPage
    title="Something Went Wrong"
    message="An unexpected error occurred! Sorry about that."
    returnUrl="/"
    returnButtonText="Go home"
  />
);

export default GeneralError;
