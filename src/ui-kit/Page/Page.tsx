import { ReactNode } from 'react';
import Text from 'components/Text';
import styles from './Page.module.scss';

interface IProps {
  title: string;
  headerAddon?: ReactNode;
}

const Page: React.FC<IProps> = ({ title, headerAddon, children }) => {
  return (
    <div className={styles['Root']}>
      <header className={styles['Header']}>
        <h2 className={styles['Title']}>
          <Text font="brand" size="big">
            {title}
          </Text>
        </h2>
        {headerAddon}
      </header>
      <section className={styles['Content']}>{children}</section>
    </div>
  );
};

export default Page;
