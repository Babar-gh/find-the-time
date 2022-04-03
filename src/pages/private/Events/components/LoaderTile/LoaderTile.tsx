import { ComponentProps } from 'react';
import Loader from 'ui-kit/Loader';
import styles from './LoaderTile.module.scss';

interface IProps extends ComponentProps<typeof Loader> {}

const LoaderTile: React.VFC<IProps> = (props) => {
  return (
    <Loader {...props}>
      <div className={styles['Root']} />
    </Loader>
  );
};

export default LoaderTile;
