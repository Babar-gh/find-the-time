import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root')!;

interface IProps {
  onBackdropClick: () => void;
}

const Modal: React.FC<IProps> = ({ onBackdropClick, children }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles['Content']}>{children}</div>
      <div className={styles['Backdrop']} onClick={onBackdropClick}></div>
    </>,
    modalRoot
  );
};

export default Modal;
