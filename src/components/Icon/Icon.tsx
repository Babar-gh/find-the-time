import icons from './iconsAsReactComponents';
import styles from './Icon.module.scss';

type SVGProps = React.SVGProps<SVGSVGElement>;
type IconName = 'EventAvailable' | 'Menu';

interface IProps extends SVGProps {
  type: IconName;
  isCentered?: boolean;
}

const Icon: React.FC<IProps> = ({ type, isCentered = true, ...rest }) => {
  const PickedIcon = icons[type];

  return isCentered ? (
    <div className={styles['Container']}>
      <PickedIcon {...rest} />
    </div>
  ) : (
    <PickedIcon {...rest} />
  );
};

export default Icon;
