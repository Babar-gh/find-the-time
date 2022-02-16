import { ReactElement } from 'react';
import { To } from 'react-router-dom';
import classNames from 'classnames/bind';
import LinkWrapper from 'components/LinkWrapper';

import styles from './Item.module.scss';

interface ISharedProps {
  type: 'Anchor' | 'RouterLink' | 'Button';
  id: string;
  icon?: ReactElement;
  isSelected?: boolean;
}

interface IAnchorProps extends ISharedProps {
  type: 'Anchor';
  href: string;
}

interface IRouterLinkProps extends ISharedProps {
  type: 'RouterLink';
  to: To;
}

interface IButtonProps extends ISharedProps {
  type: 'Button';
  onClick: React.MouseEventHandler;
}

type IProps = IAnchorProps | IRouterLinkProps | IButtonProps;

const cn = classNames.bind(styles);

const Item: React.FC<IProps> = (props) => {
  const { type, icon, isSelected, children } = props;

  const content = (
    <>
      <span className={styles['IconContainer']}>{icon}</span>
      <span>{children}</span>
    </>
  );

  return (
    <>
      {type === 'Anchor' && (
        <LinkWrapper
          type={type}
          href={props.href}
          className={cn('Link', { Link_selected: isSelected })}
        >
          {content}
        </LinkWrapper>
      )}

      {type === 'RouterLink' && (
        <LinkWrapper
          type={type}
          to={props.to}
          className={cn('Link', { Link_selected: isSelected })}
        >
          {content}
        </LinkWrapper>
      )}

      {type === 'Button' && (
        <button
          onClick={props.onClick}
          className={cn('Button', { Button_selected: isSelected })}
        >
          {content}
        </button>
      )}
    </>
  );
};

export default Item;
