import classNames from 'classnames/bind';
import Icon from 'components/Icon';
import LinkWrapper from 'components/LinkWrapper';
import Text from 'components/Text';
import styles from './Button.module.scss';

interface IProps {
  linkConfig?: React.ComponentProps<typeof LinkWrapper>;
  onClick?: React.MouseEventHandler;
  //To do: 'secondary' and 'tertiary' theme styles are not yet ready
  theme?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  leftIcon?: React.ComponentProps<typeof Icon>['type'];
  rightIcon?: React.ComponentProps<typeof Icon>['type'];
  children: string;
}

const cn = classNames.bind(styles);

const Button: React.FC<IProps> = ({
  linkConfig,
  onClick,
  theme = 'primary',
  leftIcon,
  rightIcon,
  children,
}) => {
  const content = (
    <div className={cn('Container', `Container_theme_${theme}`)}>
      {leftIcon && (
        <span className={styles['IconContainer']}>
          <Icon type={leftIcon} />
        </span>
      )}
      <span className={styles['TextContainer']}>
        <Text color="inherit" size="small">
          {children}
        </Text>
      </span>
      {rightIcon && (
        <span className={styles['IconContainer']}>
          <Icon type={rightIcon} />
        </span>
      )}
    </div>
  );
  return linkConfig ? (
    <LinkWrapper onClick={onClick} className={styles['Link']} {...linkConfig}>
      {content}
    </LinkWrapper>
  ) : (
    <button onClick={onClick} className={styles['Button']}>
      {content}
    </button>
  );
};

export default Button;
