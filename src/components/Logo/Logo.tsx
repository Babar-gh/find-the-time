import Icon from 'ui-kit/Icon';
import styles from './Logo.module.scss';

const Logo: React.VFC = () => {
  return (
    <div className={styles['Root']}>
      <Icon
        type="EventAvailable"
        isCentered={false}
        className={styles['Icon']}
      />
      <span className={styles['Text']}>Find the Time</span>
    </div>
  );
};

export default Logo;
