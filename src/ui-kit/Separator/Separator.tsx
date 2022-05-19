import classNames from 'classnames/bind';
import styles from './Separator.module.scss';

interface IProps {
  theme?: 'default' | 'dropdown';
}

const cn = classNames.bind(styles);

const Separator: React.VFC<IProps> = ({ theme = 'default' }) => (
  <hr className={cn('Root', `Root_theme_${theme}`)} />
);

export default Separator;
