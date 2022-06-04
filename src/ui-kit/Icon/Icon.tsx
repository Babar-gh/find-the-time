import icons from 'assets/icons';
import styles from './Icon.module.scss';

interface IProps extends React.SVGProps<SVGSVGElement> {
  type: keyof typeof icons;
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
