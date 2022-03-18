import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface IProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  validationStatus?: 'error' | 'warning'; // TODO: Add CSS for 'warning' theme.
}

const cn = classNames.bind(styles);

const Input: React.VFC<IProps> = ({ validationStatus, ...rest }) => {
  const className = cn('Root', {
    [`Root_validation_${validationStatus}`]: validationStatus,
  });

  return <input className={className} {...rest} />;
};

export default Input;
