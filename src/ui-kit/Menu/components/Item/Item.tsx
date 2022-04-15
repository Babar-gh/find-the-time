import classNames from 'classnames/bind';
import { HTMLAttributes } from 'react';
import Icon from 'components/Icon';
import Link from 'ui-kit/Link';
import Text from 'components/Text';
import styles from './Item.module.scss';

interface ISharedProps {
  id: string;
  icon?: React.ComponentProps<typeof Icon>['type'];
  iconIsShownOnlyIfSelected?: boolean;
  isSelected?: boolean;
  children: string;
}

type LinkProps = React.ComponentProps<typeof Link>;
type ButtonProps = HTMLAttributes<HTMLButtonElement>;

type ElementSpecificProps =
  | { element?: 'Link'; elementProps: LinkProps }
  | { element: 'HTMLButton'; elementProps: ButtonProps };

type IProps = ISharedProps & ElementSpecificProps;

const cn = classNames.bind(styles);

const Item: React.FC<IProps> = ({
  element = 'Link',
  elementProps,
  icon,
  iconIsShownOnlyIfSelected,
  isSelected,
  children,
}) => {
  const iconIsShown = iconIsShownOnlyIfSelected
    ? Boolean(icon) && isSelected
    : Boolean(icon);

  const content = (
    <div className={cn('Container', { Container_selected: isSelected })}>
      <span className={styles['IconContainer']}>
        {iconIsShown && <Icon type={icon!} />}
      </span>
      <Text color="inherit">{children}</Text>
    </div>
  );

  return element === 'Link' ? (
    <Link theme="wrapper" {...(elementProps as LinkProps)}>
      {content}
    </Link>
  ) : (
    <button className={styles['Button']} {...(elementProps as ButtonProps)}>
      {content}
    </button>
  );
};

export default Item;
