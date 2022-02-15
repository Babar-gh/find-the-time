import { ReactElement } from 'react';
import { To } from 'react-router-dom';
import LinkWrapper from 'components/LinkWrapper';

// import styles from './MenuItem.module.scss';

interface ISharedProps {
  icon?: ReactElement;
}

interface IRouterNavLinkProps extends ISharedProps {
  type: 'RouterNavLink';
  to: To;
}

interface IButtonProps extends ISharedProps {
  type: 'Button';
  onClick: React.MouseEventHandler;
}

type IProps = IRouterNavLinkProps | IButtonProps;

const MenuItem: React.FC<IProps> = (props) => {
  const { type, children, icon } = props;

  return (
    <li>
      {type === 'RouterNavLink' && (
        <LinkWrapper
          type="RouterNavLink"
          to={props.to}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <span>{icon}</span>
          <span>{children}</span>
        </LinkWrapper>
      )}
      {type === 'Button' && (
        <button onClick={props.onClick}>
          <span>{icon}</span>
          <span>{children}</span>
        </button>
      )}
    </li>
  );
};

export default MenuItem;
