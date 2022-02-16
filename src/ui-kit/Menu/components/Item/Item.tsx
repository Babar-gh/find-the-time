import { ReactElement } from 'react';
import { To } from 'react-router-dom';
import LinkWrapper from 'components/LinkWrapper';

// import styles from './Item.module.scss';

interface ISharedProps {
  type: 'Anchor' | 'RouterLink' | 'Button';
  id: string;
  icon?: ReactElement;
  isActive?: boolean;
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

const Item: React.FC<IProps> = (props) => {
  const { type, icon, isActive, children } = props;

  const content = (
    <>
      <span>{icon}</span>
      <span>{children}</span>
    </>
  );

  return (
    <>
      {type === 'Anchor' && (
        <LinkWrapper
          type={type}
          href={props.href}
          className={`${isActive ? 'active' : ' '}`}
        >
          {content}
        </LinkWrapper>
      )}

      {type === 'RouterLink' && (
        <LinkWrapper
          type={type}
          to={props.to}
          className={`${isActive ? 'active' : ' '}`}
        >
          {content}
        </LinkWrapper>
      )}

      {type === 'Button' && (
        <button
          onClick={props.onClick}
          className={`${isActive ? 'active' : ' '}`}
        >
          {content}
        </button>
      )}
    </>
  );
};

export default Item;
