import styles from './TileTemplate.module.scss';

const TileTemplate: React.FC = ({ children }) => (
  <div className={styles['Root']}>{children}</div>
);

export default TileTemplate;
