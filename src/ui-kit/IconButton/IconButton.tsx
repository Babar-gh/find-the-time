import { ComponentProps, HTMLAttributes } from 'react';
import Icon from 'components/Icon';
import styles from './IconButton.module.scss';

interface IProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'className'> {
  icon: ComponentProps<typeof Icon>['type'];
}

const IconButton: React.VFC<IProps> = ({ icon, ...rest }) => {
  return (
    <button className={styles['Root']} {...rest}>
      <Icon type={icon}></Icon>
    </button>
  );
};

export default IconButton;
