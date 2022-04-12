import classNames from 'classnames/bind';
import { cloneElement, isValidElement, ReactNode, useState } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import styles from './Dropdown.module.scss';

interface IProps {
  trigger: ReactNode;
  width?: 'narrow' | 'default' | 'wide';
  align?: 'left' | 'center' | 'right';
}

const cn = classNames.bind(styles);

const Dropdown: React.FC<IProps> = ({
  trigger,
  width = 'default',
  align = 'center',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentClassName = cn(
    'Content',
    `Content_align_${align}`,
    `Content_width_${width}`
  );

  return (
    <div onClick={() => setIsOpen((current) => !current)}>
      {isValidElement(trigger)
        ? cloneElement(trigger, { isPressed: isOpen })
        : trigger}
      <Backdrop isOpen={isOpen} theme="transparent" withoutPortal>
        <div className={contentClassName}>{children}</div>
      </Backdrop>
    </div>
  );
};

export default Dropdown;
