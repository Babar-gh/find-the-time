import classNames from 'classnames/bind';
import { ComponentProps, InputHTMLAttributes } from 'react';
import Icon from 'components/Icon';
import styles from './Input.module.scss';

interface IProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  icon?: ComponentProps<typeof Icon>['type'];
  theme?: 'default' | 'alternative';
  validationStatus?: 'error' | 'warning'; // TODO: Add CSS for 'warning' status.
}

const cn = classNames.bind(styles);

const Input: React.VFC<IProps> = ({
  icon,
  theme = 'default',
  validationStatus,
  ...rest
}) => {
  const inputClassName = cn('Input', `Input_theme_${theme}`, {
    [`Input_validation_${validationStatus}`]: validationStatus,
    Input_icon: icon,
  });

  return (
    <div className={styles['Root']}>
      <div className={styles['IconContainer']}>
        {icon && <Icon type={icon} />}
      </div>
      <input className={inputClassName} {...rest} />
    </div>
  );
};

export default Input;
