import { ComponentProps, MouseEventHandler, useEffect } from 'react';
import Backdrop from 'ui-kit/Backdrop';
import Button from 'ui-kit/Button';
import Heading from 'ui-kit/Heading';
import IconButton from 'ui-kit/IconButton';
import Scroll from 'ui-kit/Scroll';
import styles from './Modal.module.scss';

interface IProps
  extends Pick<ComponentProps<typeof Backdrop>, 'isOpen' | 'onBackdropClick'> {
  title: string;
  onCloseClick: MouseEventHandler;
  onOkClick: MouseEventHandler;
  okText?: string;
  okProps?: ComponentProps<typeof Button>;
  onCancelClick: MouseEventHandler;
  cancelText?: string;
  cancelProps?: ComponentProps<typeof Button>;
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

const Modal: React.FC<IProps> = ({
  isOpen,
  onBackdropClick,
  title,
  onCloseClick,
  onOkClick,
  okText = 'OK',
  okProps = {},
  onCancelClick,
  cancelText = 'Cancel',
  cancelProps = {},
  children,
}) => {
  populateButtonProps(okProps, onOkClick, okText, 'primary');
  populateButtonProps(cancelProps, onCancelClick, cancelText, 'secondary');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <Backdrop {...{ isOpen, onBackdropClick }}>
      <div className={styles['Root']}>
        <div className={styles['Header']}>
          <Heading>{title}</Heading>
          <IconButton icon="Close" elementProps={{ onClick: onCloseClick }} />
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
