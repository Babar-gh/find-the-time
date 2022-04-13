import classNames from 'classnames/bind';
import { HTMLAttributes } from 'react';
import Icon from 'components/Icon';
import LinkWrapper from 'components/LinkWrapper';
import Text from 'components/Text';
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

type LinkProps = React.ComponentProps<typeof LinkWrapper>;
type ButtonProps = HTMLAttributes<HTMLButtonElement>;

export type ButtonElementSpecificProps =
  | { element?: 'HTMLButton'; elementProps?: ButtonProps }
  | { element: 'LinkWrapper'; elementProps?: LinkProps };

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
        <LinkWrapper
          className={styles['Link']}
          {...(elementProps as LinkProps)}
        >
          {content}
        </LinkWrapper>
      )}
    </div>
  );
};

export default Button;
