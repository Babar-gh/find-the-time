import { ReactNode } from 'react';
import Heading from 'ui-kit/Heading';
import Loader from 'ui-kit/Loader';
import styles from './Page.module.scss';

interface IProps {
  title: string;
  isLoading?: boolean;
  headerAddon?: ReactNode;
}

const Page: React.FC<IProps> = ({
  title,
  isLoading = false,
  headerAddon,
  children,
}) => (
  <Loader isShown={isLoading}>
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        <Heading>{title}</Heading>
        {headerAddon}
      </header>
      <section className={styles['Content']}>{children}</section>
    </div>
  </Loader>
);

export default Page;
