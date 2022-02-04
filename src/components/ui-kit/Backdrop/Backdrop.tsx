import ReactDOM from 'react-dom';
import { MouseEvent } from 'react';

import styles from './Backdrop.module.scss';

const modalRoot = document.getElementById('modal-root')!;

interface IProps {
  isOpen: boolean;
  onBackdropClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Backdrop: React.FC<IProps> = ({ isOpen, onBackdropClick, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles['Content']}>{children}</div>
      <div className={styles['Backdrop']} onClick={onBackdropClick}></div>
    </>,
    modalRoot
  );
};

export default Backdrop;
