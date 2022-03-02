import classNames from 'classnames/bind';
import { HTMLAttributes } from 'react';
import Icon from 'components/Icon';
import LinkWrapper from 'components/LinkWrapper';
import Text from 'components/Text';
import styles from './Button.module.scss';

type IconType = React.ComponentProps<typeof Icon>['type'];

interface ISharedProps {
  // TODO: Add 'secondary' and 'tertiary' theme styles.
  theme?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  width?: 'fitContent' | 'block';
  leftIcon?: IconType;
  rightIcon?: IconType;
  children: string;
}

type LinkProps = React.ComponentProps<typeof LinkWrapper>;
type ButtonProps = HTMLAttributes<HTMLButtonElement>;

type IProps = ISharedProps &
(
  | {
    element?: 'HTMLButton';
    elementProps: ButtonProps;
  }
  | {
    element: 'LinkWrapper';
    elementProps: LinkProps;
  }
);

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
