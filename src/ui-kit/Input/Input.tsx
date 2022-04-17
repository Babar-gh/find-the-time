import classNames from 'classnames/bind';
import { ComponentProps, forwardRef, InputHTMLAttributes } from 'react';
import Icon from 'components/Icon';
import styles from './Input.module.scss';

interface IProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  icon?: ComponentProps<typeof Icon>['type'];
  theme?: 'default' | 'alternative';
  validationStatus?: 'error' | 'warning'; // TODO: Add CSS for 'warning' status.
}

const cn = classNames.bind(styles);

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ icon, theme = 'default', validationStatus, ...rest }, ref) => {
    const inputClassName = cn('Input', `Input_theme_${theme}`, {
      [`Input_validation_${validationStatus}`]: validationStatus,
      Input_icon: icon,
    });

    return (
      <div className={styles['Root']}>
        <div className={styles['IconContainer']}>
          {icon && <Icon type={icon} />}
        </div>
        <input ref={ref} {...rest} className={inputClassName} />
      </div>
    );
  }
);

export default Input;
