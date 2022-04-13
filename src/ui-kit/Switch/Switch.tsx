import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import styles from './Switch.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const cn = classNames.bind(styles);

const Switch: React.VFC<IProps> = ({ checked, ...rest }) => {
  return (
    <label className={styles['Root']}>
      <div className={cn('Track', { Track_checked: checked })}>
        <input
          className={styles['Input']}
          type="checkbox"
          checked={checked}
          {...rest}
        />
      </div>
    </label>
  );
};

export default Switch;
