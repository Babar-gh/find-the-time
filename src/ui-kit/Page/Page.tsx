import { ReactNode } from 'react';
import { To } from 'react-router-dom';
import Heading from 'ui-kit/Heading';
import IconButton from 'ui-kit/IconButton';
import Loader from 'ui-kit/Loader';
import styles from './Page.module.scss';

interface IProps {
  title: string;
  isLoading?: boolean;
  navigateBackTo?: To;
  headerAddon?: ReactNode;
}

const Page: React.FC<IProps> = ({
  title,
  isLoading = false,
  navigateBackTo,
  headerAddon,
  children,
}) => (
  <Loader isShown={isLoading}>
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        {navigateBackTo && (
          <IconButton
            icon="ArrowBack"
            element="Link"
            elementProps={{ type: 'RouterLink', to: navigateBackTo }}
          />
        )}
        <Heading>{title}</Heading>
        <div className={styles['HeaderAddon']}>{headerAddon}</div>
      </header>
      <section className={styles['Content']}>{children}</section>
    </div>
  </Loader>
);

export default Page;
