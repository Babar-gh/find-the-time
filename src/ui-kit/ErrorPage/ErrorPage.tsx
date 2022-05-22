import { To } from 'react-router-dom';
import Button from 'ui-kit/Button';
import ErrorDisplay from 'ui-kit/ErrorDisplay';
import Page from 'ui-kit/Page';
import styles from './ErrorPage.module.scss';

interface IProps {
  title?: string;
  message?: string;
  returnUrl?: To;
  returnButtonText?: string;
}

const ErrorPage: React.VFC<IProps> = ({
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred! Sorry about that.',
  returnUrl = '/',
  returnButtonText = 'Go home',
}) => (
  <Page title={title} navigateBackTo={returnUrl}>
    <div className={styles['Container']}>
      <ErrorDisplay isShown>{message}</ErrorDisplay>
      <Button
        element="Link"
        elementProps={{ type: 'RouterLink', to: returnUrl }}
      >
        {returnButtonText}
      </Button>
    </div>
  </Page>
);

export default ErrorPage;
