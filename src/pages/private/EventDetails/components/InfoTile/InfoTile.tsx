import { ComponentProps } from 'react';
import Icon from 'components/Icon';
import Text from 'components/Text';
import styles from './InfoTile.module.scss';

interface IProps {
  icon: ComponentProps<typeof Icon>['type'];
  heading: string;
}

const InfoTile: React.FC<IProps> = ({ icon, heading, children }) => {
  return (
    <div className={styles['Root']}>
      <div className={styles['Header']}>
        <div className={styles['HeaderIcon']}>
          <Icon type={icon} />
        </div>
        <Text font="primaryBold" color="secondary" clamp={1}>
          {heading}
        </Text>
      </div>
      <div className={styles['Content']}>{children}</div>
    </div>
  );
};

export default InfoTile;
