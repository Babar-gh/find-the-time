import classNames from 'classnames/bind';
import ReactDOM from 'react-dom';
import { MouseEventHandler } from 'react';
import styles from './Backdrop.module.scss';

const modalRoot = document.getElementById('modal-root')!;

interface IProps {
  isOpen: boolean;
  theme?: 'shaded' | 'transparent';
  onBackdropClick?: MouseEventHandler;
  withoutPortal?: boolean;
}

const cn = classNames.bind(styles);

const Backdrop: React.FC<IProps> = ({
  isOpen,
  theme = 'shaded',
  onBackdropClick,
  withoutPortal,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  const component = (
    <>
      <div className={styles['Content']}>{children}</div>
      <div
        className={cn('Backdrop', `Backdrop_theme_${theme}`)}
        onClick={onBackdropClick}
      />
    </>
  );

  return withoutPortal
    ? component
    : ReactDOM.createPortal(component, modalRoot);
};

export default Backdrop;
