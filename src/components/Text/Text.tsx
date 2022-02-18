import classNames from 'classnames/bind';
import styles from './Text.module.scss';

interface ISharedProps {
  type?: 'Sans-serif' | 'Serif' | 'Brand';
  color?: 'Primary' | 'Secondary' | 'Inherit';
  size?: 'Small' | 'Normal' | 'Big';
  children: string;
}

interface INormalSansProps {
  type?: 'Sans-serif';
  style?: 'Normal';
  weight?: 'Normal' | 'Bold';
}

interface IItalicSansProps {
  type?: 'Sans-serif';
  style?: 'Italic';
  weight?: 'Light';
}

interface ISerifProps {
  type?: 'Serif';
  style?: 'Normal';
  weight?: 'Normal';
}

interface IBrand {
  type?: 'Brand';
  style?: 'Normal';
  weight?: 'Light';
}

type IProps = ISharedProps &
(INormalSansProps | IItalicSansProps | ISerifProps | IBrand);

const cn = classNames.bind(styles);

const Text: React.FC<IProps> = ({
  type = 'Sans-serif',
  color = 'Inherit',
  size = 'Normal',
  style = 'Normal',
  weight,
  children,
}) => {
  if (weight === undefined) {
    weight =
      type === 'Brand' || (type === 'Sans-serif' && style === 'Italic')
        ? 'Light'
        : 'Normal';
  }

  const className = cn({
    Root_type_sans: type === 'Sans-serif',
    Root_type_serif: type === 'Serif',
    Root_type_brand: type === 'Brand',

    Root_color_primary: color === 'Primary',
    Root_color_secondary: color === 'Secondary',
    Root_color_inherit: color === 'Inherit',

    Root_size_small: size === 'Small',
    Root_size_normal: size === 'Normal',
    Root_size_big: size === 'Big',

    Root_style_normal: style === 'Normal',
    Root_style_italic: style === 'Italic',

    Root_weight_light: weight === 'Light',
    Root_weight_normal: weight === 'Normal',
    Root_weight_bold: weight === 'Bold',
  });

  return <span className={className}>{children}</span>;
};

export default Text;
