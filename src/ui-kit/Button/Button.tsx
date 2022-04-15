import classNames from 'classnames/bind';
import { HTMLAttributes } from 'react';
import Icon from 'components/Icon';
import Link from 'ui-kit/Link';
import Text from 'components/Text';
import { LinkTypeSpecificProps } from 'ui-kit/Link/Link';
import styles from './Button.module.scss';

type IconType = React.ComponentProps<typeof Icon>['type'];

interface ISharedProps {
  // TODO: Add 'tertiary' theme style.
  theme?: 'primary' | 'secondary' | 'secondaryInverted' | 'tertiary' | 'danger';
  width?: 'fitContent' | 'block' | 'square';
  leftIcon?: IconType;
  rightIcon?: IconType;
  isPressed?: boolean;
  children?: string;
}

type LinkProps = LinkTypeSpecificProps;
type ButtonProps = Omit<HTMLAttributes<HTMLButtonElement>, 'children'>;

export type ButtonElementSpecificProps =
  | { element?: 'HTMLButton'; elementProps?: ButtonProps }
  | { element: 'Link'; elementProps?: LinkProps };

type IProps = ISharedProps & ButtonElementSpecificProps;

const cn = classNames.bind(styles);

const getIconWithContainer = (type: IconType) => {
  return (
    <span className={styles['IconContainer']}>
      <Icon type={type} />
    </span>
  );
};

const Button: React.FC<IProps> = ({
  element = 'HTMLButton',
  elementProps,
  theme = 'primary',
  width = 'fitContent',
  leftIcon,
  rightIcon,
  isPressed,
  children,
}) => {
  const content = (
    <div
      className={cn('Container', `Container_theme_${theme}`, {
        [`Container_theme_${theme}Pressed`]: isPressed,
      })}
    >
      {leftIcon && getIconWithContainer(leftIcon)}
      {children && (
        <span className={styles['TextContainer']}>
          <Text color="inherit" size="small">
            {children}
          </Text>
        </span>
      )}
      {rightIcon && getIconWithContainer(rightIcon)}
    </div>
  );

  return (
    <div className={styles[`Root_width_${width}`]}>
      {element === 'HTMLButton' ? (
        <button className={styles['Button']} {...(elementProps as ButtonProps)}>
          {content}
        </button>
      ) : (
        <Link {...(elementProps as LinkProps)} theme="wrapper">
          {content}
        </Link>
      )}
    </div>
  );
};

export default Button;
