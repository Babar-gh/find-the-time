import classNames from 'classnames/bind';
import Icon from 'components/Icon';
import LinkWrapper from 'components/LinkWrapper';
import Text from 'components/Text';
import styles from './Button.module.scss';

type IconType = React.ComponentProps<typeof Icon>['type'];

interface ISharedProps {
  linkConfig?: React.ComponentProps<typeof LinkWrapper>;
  // TODO: Add 'secondary' and 'tertiary' theme styles.
  theme?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  width?: 'fitContent' | 'block';
  leftIcon?: IconType;
  rightIcon?: IconType;
  children: string;
}

type ILinkVariantProps = {
  linkConfig: React.ComponentProps<typeof LinkWrapper>;
  onClick?: React.MouseEventHandler;
};

type IButtonVariantProps = {
  onClick: React.MouseEventHandler;
};

type IProps = ISharedProps & (ILinkVariantProps | IButtonVariantProps);

const cn = classNames.bind(styles);

const getIconWithContainer = (type: IconType) => {
  return (
    <span className={styles['IconContainer']}>
      <Icon type={type} />
    </span>
  );
};

const Button: React.FC<IProps> = ({
  linkConfig,
  onClick,
  theme = 'primary',
  width = 'fitContent',
  leftIcon,
  rightIcon,
  children,
}) => {
  const content = (
    <div className={cn('Container', `Container_theme_${theme}`)}>
      {leftIcon && getIconWithContainer(leftIcon)}
      <span className={styles['TextContainer']}>
        <Text color="inherit" size="small">
          {children}
        </Text>
      </span>
      {rightIcon && getIconWithContainer(rightIcon)}
    </div>
  );
  return (
    <div className={styles[`Root_width_${width}`]}>
      {linkConfig ? (
        <LinkWrapper
          onClick={onClick}
          className={styles['Link']}
          {...linkConfig}
        >
          {content}
        </LinkWrapper>
      ) : (
        <button onClick={onClick} className={styles['Button']}>
          {content}
        </button>
      )}
    </div>
  );
};

export default Button;
