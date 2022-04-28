import { ComponentProps, MouseEventHandler } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import Button from 'ui-kit/Button';
import Scroll from 'ui-kit/Scroll';
import styles from './Modal.module.scss';

interface IProps
  extends Pick<ComponentProps<typeof Backdrop>, 'isOpen' | 'onBackdropClick'> {
  onOkButtonClick: MouseEventHandler;
  okButtonText?: string;
  okButtonProps?: ComponentProps<typeof Button>;
  onCancelButtonClick: MouseEventHandler;
  cancelButtonText?: string;
  cancelButtonProps?: ComponentProps<typeof Button>;
}

const Modal: React.FC<IProps> = ({
  isOpen,
  onBackdropClick,
  onOkButtonClick,
  okButtonText = 'OK',
  okButtonProps = {},
  onCancelButtonClick,
  cancelButtonText = 'Cancel',
  cancelButtonProps = {},
  children,
}) => {
  okButtonProps.elementProps ??= {};
  okButtonProps.elementProps.onClick = onOkButtonClick;
  okButtonProps.children = okButtonText;

  cancelButtonProps.elementProps ??= {};
  cancelButtonProps.elementProps.onClick = onCancelButtonClick;
  cancelButtonProps.children = cancelButtonText;

  return (
    <Backdrop {...{ isOpen, onBackdropClick }}>
      <div className={styles['Root']}>
        <Scroll>
          <div className={styles['Container']}>
            <div className={styles['Content']}>{children}</div>
            <div className={styles['Buttons']}>
              <Button {...okButtonProps} />
              <Button {...cancelButtonProps} />
            </div>
          </div>
        </Scroll>
      </div>
    </Backdrop>
  );
};

export default Modal;
