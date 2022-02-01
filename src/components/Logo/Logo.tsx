import { ReactComponent as LogoIcon } from 'assets/icons/event_available.svg';
import styles from './Logo.module.scss';

const Logo: React.VFC = () => {
  return (
    <div className={styles['Root']}>
      <LogoIcon className={styles['Icon']} />
      <span className={styles['Text']}>Find the Time</span>
    </div>
  );
};

export default Logo;
