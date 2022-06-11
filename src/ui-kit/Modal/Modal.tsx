import { ComponentProps, MouseEventHandler, useEffect } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import Button from 'ui-kit/Button';
import Heading from 'ui-kit/Heading';
import IconButton from 'ui-kit/IconButton';
import Scroll from 'ui-kit/Scroll';
import styles from './Modal.module.scss';

interface IProps
  extends Pick<ComponentProps<typeof Backdrop>, 'onBackdropClick'> {
  title: string;
  onOkClick: MouseEventHandler;
  okText?: string;
  okProps?: ComponentProps<typeof Button>;
  onCancelClick: MouseEventHandler;
  cancelText?: string;
  cancelProps?: ComponentProps<typeof Button>;
  onCloseClick?: MouseEventHandler;
}

const populateButtonProps = (
  allProps: ComponentProps<typeof Button>,
  onClick: MouseEventHandler,
  text: string,
  fallbackTheme: ComponentProps<typeof Button>['theme']
) => {
  allProps.elementProps ??= {};
  allProps.elementProps.onClick = onClick;
  allProps.children = text;
  allProps.theme ??= fallbackTheme;
};

const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableBodyScroll = () => {
  document.body.style.overflow = 'visible';
};

const Modal: React.FC<IProps> = ({
  title,
  onOkClick,
  okText = 'OK',
  okProps = {},
  onCancelClick,
  cancelText = 'Cancel',
  cancelProps = {},
  onCloseClick,
  onBackdropClick,
  children,
}) => {
  populateButtonProps(okProps, onOkClick, okText, 'primary');
  populateButtonProps(cancelProps, onCancelClick, cancelText, 'secondary');

  const handleCloseClick = onCloseClick || onCancelClick;
  const handleBackdropClick = onBackdropClick || onCancelClick;

  useEffect(() => {
    disableBodyScroll();

    return () => enableBodyScroll();
  }, []);

  return (
    <Backdrop onBackdropClick={handleBackdropClick} isOpen>
      <div className={styles['Root']}>
        <div className={styles['Header']}>
          <Heading>{title}</Heading>
          <IconButton
            icon="Close"
            elementProps={{ onClick: handleCloseClick }}
          />
        </div>
        <Scroll>
          <div className={styles['Content']}>{children}</div>
        </Scroll>
        <div className={styles['Buttons']}>
          <Button {...okProps} />
          <Button {...cancelProps} />
        </div>
      </div>
    </Backdrop>
  );
};

export default Modal;
