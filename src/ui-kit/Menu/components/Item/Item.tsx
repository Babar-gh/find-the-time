import classNames from 'classnames/bind';
import { HTMLAttributes } from 'react';
import Icon from 'components/Icon';
import LinkWrapper from 'components/LinkWrapper';
import Text from 'components/Text';
import styles from './Item.module.scss';

interface ISharedProps {
  id: string;
  icon?: React.ComponentProps<typeof Icon>['type'];
  iconIsShownOnlyIfSelected?: boolean;
  isSelected?: boolean;
  children: string;
}

type LinkProps = React.ComponentProps<typeof LinkWrapper>;
type ButtonProps = HTMLAttributes<HTMLButtonElement>;

type IProps = ISharedProps &
(
  | {
    element?: 'LinkWrapper';
    elementProps: LinkProps;
  }
  | {
    element: 'HTMLButton';
    elementProps: ButtonProps;
  }
);

const cn = classNames.bind(styles);

const Item: React.FC<IProps> = ({
  element = 'LinkWrapper',
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

  return element === 'LinkWrapper' ? (
    <LinkWrapper className={styles['Link']} {...(elementProps as LinkProps)}>
      {content}
    </LinkWrapper>
  ) : (
    <button className={styles['Button']} {...(elementProps as ButtonProps)}>
      {content}
    </button>
  );
};

export default Item;
