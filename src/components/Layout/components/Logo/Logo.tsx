import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from 'assets/icons/event_available.svg';
import styles from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <Link to="/" className={styles['Root']}>
      <LogoIcon className={styles['Icon']} />
      <span className={styles['Text']}>Find the Time</span>
    </Link>
  );
};

export default Logo;
