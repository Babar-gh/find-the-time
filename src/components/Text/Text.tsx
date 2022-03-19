import classNames from 'classnames/bind';
import styles from './Text.module.scss';

interface IProps {
  font?: 'primary' | 'primaryItalic' | 'primaryBold' | 'secondary' | 'brand';
  color?: 'primary' | 'secondary' | 'error' | 'inherit';
  size?: 'small' | 'regular' | 'big';
  children: string;
}

const cn = classNames.bind(styles);

const Text: React.FC<IProps> = ({
  font = 'primary',
  color = 'primary',
  size = 'regular',
  children,
}) => {
  const className = cn(
    `Root_font_${font}`,
    `Root_color_${color}`,
    `Root_size_${size}`
  );

  return <span className={className}>{children}</span>;
};

export default Text;
