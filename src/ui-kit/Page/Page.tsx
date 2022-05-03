import { ReactNode } from 'react';
import Heading from 'ui-kit/Heading';
import styles from './Page.module.scss';

interface IProps {
  title: string;
  headerAddon?: ReactNode;
}

const Page: React.FC<IProps> = ({ title, headerAddon, children }) => {
  return (
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        <Heading>{title}</Heading>
        {headerAddon}
      </header>
      <section className={styles['Content']}>{children}</section>
    </div>
  );
};

export default Page;
