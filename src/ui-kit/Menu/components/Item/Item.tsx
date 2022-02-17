import { ReactElement } from 'react';
import classNames from 'classnames/bind';
import LinkWrapper from 'components/LinkWrapper';

import styles from './Item.module.scss';

interface ISharedProps {
  type: 'Anchor' | 'RouterLink' | 'Button';
  id: string;
  icon?: ReactElement;
  isSelected?: boolean;
}

interface ILinkProps {
  type: 'Anchor' | 'RouterLink';
  to: string;
}

interface IButtonProps {
  type: 'Button';
  onClick: React.MouseEventHandler;
}

type IProps = ISharedProps & (ILinkProps | IButtonProps);

const cn = classNames.bind(styles);

const Item: React.FC<IProps> = (props) => {
  const { type, icon, isSelected, children } = props;

  const content = (
    <div className={cn('Container', { Container_selected: isSelected })}>
      <span className={styles['IconContainer']}>{icon}</span>
      <span>{children}</span>
    </div>
  );

  return (
    <>
      {(type === 'Anchor' || type === 'RouterLink') && (
        <LinkWrapper type={type} to={props.to} className={styles['Link']}>
          {content}
        </LinkWrapper>
      )}

      {type === 'Button' && (
        <button onClick={props.onClick} className={styles['Button']}>
          {content}
        </button>
      )}
    </>
  );
};

export default Item;
