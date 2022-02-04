import ReactDOM from 'react-dom';

import styles from './Backdrop.module.scss';

const modalRoot = document.getElementById('modal-root')!;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const Backdrop: React.FC<IProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles['Content']}>{children}</div>
      <div className={styles['Backdrop']} onClick={onClose}></div>
    </>,
    modalRoot
  );
};

export default Backdrop;
