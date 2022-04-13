import classNames from 'classnames/bind';
import styles from './Separator.module.scss';

interface IProps {
  context: 'dropdown' | 'menu';
}

const cn = classNames.bind(styles);

const Separator: React.VFC<IProps> = ({ context }) => (
  <hr className={cn('Root', `Root_context_${context}`)} />
);

export default Separator;
