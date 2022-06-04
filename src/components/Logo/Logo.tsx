import Text from 'components/Text';
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
      <Text font="brand" size="big" color="inherit" clamp={1}>
        Find the Time
      </Text>
    </div>
  );
};

export default Logo;
