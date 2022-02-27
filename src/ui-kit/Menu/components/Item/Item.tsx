import classNames from 'classnames/bind';
import Icon from 'components/Icon';
import LinkWrapper from 'components/LinkWrapper';
import Text from 'components/Text';
import styles from './Item.module.scss';

interface ISharedProps {
  id: string;
  linkConfig?: React.ComponentProps<typeof LinkWrapper>;
  icon?: React.ComponentProps<typeof Icon>['type'];
  isSelected?: boolean;
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

const Item: React.FC<IProps> = ({
  linkConfig,
  onClick,
  icon,
  isSelected,
  children,
}) => {
  const content = (
    <div className={cn('Container', { Container_selected: isSelected })}>
      <span className={styles['IconContainer']}>
        {icon && <Icon type={icon} />}
      </span>
      <Text color="inherit">{children}</Text>
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

export default Item;
