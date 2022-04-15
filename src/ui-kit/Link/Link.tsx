import { HTMLProps } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  NavLink,
  NavLinkProps,
} from 'react-router-dom';
import styles from './Link.module.scss';

interface ISharedProps {
  theme?: 'wrapper' | 'primary';
}

type TypeSpecificProps =
  | ({ type: 'RouterLink' } & RouterLinkProps)
  | ({ type: 'RouterNavLink' } & NavLinkProps)
  | ({ type: 'HTMLAnchor' } & HTMLProps<HTMLAnchorElement>);

type IProps = ISharedProps & TypeSpecificProps;

const Link: React.FC<IProps> = ({
  theme = 'primary',
  type,
  children,
  ...rest
}) => {
  const className = styles[`Root_theme_${theme}`];

  switch (type) {
    case 'RouterLink':
      return (
        <RouterLink className={className} {...(rest as RouterLinkProps)}>
          {children}
        </RouterLink>
      );

    case 'RouterNavLink':
      return (
        <NavLink className={className} {...(rest as NavLinkProps)}>
          {children}
        </NavLink>
      );

    case 'HTMLAnchor':
      return (
        <a className={className} {...(rest as HTMLProps<HTMLAnchorElement>)}>
          {children}
        </a>
      );
  }
};

export default Link;
