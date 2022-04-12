import classNames from 'classnames/bind';
import { cloneElement, isValidElement, ReactNode, useState } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import styles from './Dropdown.module.scss';

interface IProps {
  trigger: ReactNode;
  width?: 'narrow' | 'default' | 'wide';
  align?: 'left' | 'center' | 'right';
  closeOnClick?: boolean;
}

const cn = classNames.bind(styles);

const Dropdown: React.FC<IProps> = ({
  trigger,
  width = 'default',
  align = 'center',
  closeOnClick = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentClassName = cn(
    'Content',
    `Content_align_${align}`,
    `Content_width_${width}`
  );

  const handleClick = () => setIsOpen((current) => !current);

  return (
    <div>
      <div onClick={handleClick}>
        {isValidElement(trigger)
          ? cloneElement(trigger, { isPressed: isOpen })
          : trigger}
      </div>
      <Backdrop
        isOpen={isOpen}
        theme="transparent"
        withoutPortal
        onBackdropClick={handleClick}
      >
        <div
          onClick={closeOnClick ? handleClick : undefined}
          className={contentClassName}
        >
          {children}
        </div>
      </Backdrop>
    </div>
  );
};

export default Dropdown;
