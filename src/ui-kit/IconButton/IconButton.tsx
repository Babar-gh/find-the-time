import classNames from 'classnames/bind';
import { ComponentProps, HTMLAttributes } from 'react';
import Icon from 'components/Icon';
import styles from './IconButton.module.scss';

interface IProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'className'> {
  icon: ComponentProps<typeof Icon>['type'];
  isPressed?: boolean;
}

const cn = classNames.bind(styles);

const IconButton: React.VFC<IProps> = ({ icon, isPressed, ...rest }) => {
  return (
    <button className={cn('Root', { Root_pressed: isPressed })} {...rest}>
      <Icon type={icon}></Icon>
    </button>
  );
};

export default IconButton;
