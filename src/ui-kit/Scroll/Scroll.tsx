import styles from './Scroll.module.scss';

const Scroll: React.FC = ({ children }) => (
  <div className={styles['Root']}>{children}</div>
);
export default Scroll;
