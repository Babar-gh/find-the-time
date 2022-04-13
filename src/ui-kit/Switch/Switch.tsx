import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import Text from 'components/Text';
import styles from './Switch.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  labelPosition?: 'left' | 'right';
}

const cn = classNames.bind(styles);

const Switch: React.VFC<IProps> = ({
  label,
  labelPosition = 'left',
  checked,
  ...rest
}) => {
  const component = (
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

  return label ? (
    <label className={styles['Container']}>
      {labelPosition === 'left' && <Text color="inherit">{label}</Text>}
      {component}
      {labelPosition === 'right' && <Text color="inherit">{label}</Text>}
    </label>
  ) : (
    component
  );
};

export default Switch;
