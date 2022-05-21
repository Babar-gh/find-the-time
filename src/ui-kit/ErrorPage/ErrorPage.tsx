import { To } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from 'ui-kit/Button';
import ErrorDisplay from 'ui-kit/ErrorDisplay';
import Page from 'ui-kit/Page';
import styles from './ErrorPage.module.scss';

interface IProps {
  title: string;
  message: string;
  returnUrl: To;
  returnButtonText: string;
}

const ErrorPage: React.VFC<IProps> = ({
  title,
  message,
  returnUrl,
  returnButtonText,
}) => {
  const [messageIsShown, setMessageIsShown] = useState(false);

  useEffect(() => setMessageIsShown(true), []);

  return (
    <Page title={title} navigateBackTo={returnUrl}>
      <div className={styles['Container']}>
        <ErrorDisplay isShown={messageIsShown}>{message}</ErrorDisplay>
        <Button
          element="Link"
          elementProps={{ type: 'RouterLink', to: returnUrl }}
        >
          {returnButtonText}
        </Button>
      </div>
    </Page>
  );
};

export default ErrorPage;
