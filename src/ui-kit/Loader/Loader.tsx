import loaders from 'assets/loaders';
import styles from './Loader.module.scss';

interface IProps {
  type?: keyof typeof loaders;
  isShown: boolean;
}

const Loader: React.FC<IProps> = ({ isShown, type = 'Circular', children }) => {
  const PickedLoader = loaders[type];

  return (
    <div className={styles['Root']}>
      {children}
      {isShown && (
        <div className={styles['Backdrop']}>
          <PickedLoader />
        </div>
      )}
    </div>
  );
};

export default Loader;
