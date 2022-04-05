import { ComponentProps } from 'react';
import Loader from 'ui-kit/Loader';
import TileTemplate from '../TileTemplate';

interface IProps extends ComponentProps<typeof Loader> {}

const LoaderTile: React.VFC<IProps> = ({ isShown }) =>
  isShown ? (
    <Loader isShown={true}>
      <TileTemplate />
    </Loader>
  ) : null;

export default LoaderTile;
