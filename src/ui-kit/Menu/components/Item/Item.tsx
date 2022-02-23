import classNames from 'classnames/bind';
import Icon from 'components/Icon';
import LinkWrapper from 'components/LinkWrapper';
import Text from 'components/Text';
import styles from './Item.module.scss';

interface ISharedProps {
  id: string;
  icon?: React.ComponentProps<typeof Icon>['type'];
  isSelected?: boolean;
  children: string;
}

type ILinkVariantProps = {
  isButton?: false;
  linkConfig: React.ComponentProps<typeof LinkWrapper>['config'];
};

type IButtonVariantProps = {
  isButton: true;
  onClick: React.MouseEventHandler;
};

type IProps = ISharedProps & (ILinkVariantProps | IButtonVariantProps);

const cn = classNames.bind(styles);

const Item: React.FC<IProps> = (props) => {
  const { icon, isButton, isSelected, children } = props;

  const content = (
    <div className={cn('Container', { Container_selected: isSelected })}>
      <span className={styles['IconContainer']}>
        {icon !== undefined && <Icon type={icon}></Icon>}
      </span>
      <Text color="inherit">{children}</Text>
    </div>
  );

  if (isButton) {
    const { onClick } = props;

    return (
      <button onClick={onClick} className={styles['Button']}>
        {content}
      </button>
    );
  } else {
    const { linkConfig } = props;

    linkConfig.className = styles['Link'];

    return <LinkWrapper config={linkConfig}>{content}</LinkWrapper>;
  }
};

export default Item;
