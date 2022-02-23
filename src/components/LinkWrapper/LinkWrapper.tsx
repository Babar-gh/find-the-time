import { HTMLProps } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  NavLink,
  NavLinkProps,
} from 'react-router-dom';

interface IProps {
  config:
  | ({ type: 'RouterLink' } & RouterLinkProps)
  | ({ type: 'RouterNavLink' } & NavLinkProps)
  | ({ type: 'HTMLAnchor' } & HTMLProps<HTMLAnchorElement>);
}

const LinkWrapper: React.FC<IProps> = ({ config, children }) => {
  const { type, ...rest } = config;

  switch (type) {
    case 'RouterLink':
      return <RouterLink {...(rest as RouterLinkProps)}>{children}</RouterLink>;

    case 'RouterNavLink':
      return <NavLink {...(rest as NavLinkProps)}>{children}</NavLink>;

    case 'HTMLAnchor':
      return <a {...(rest as HTMLProps<HTMLAnchorElement>)}>{children}</a>;
  }
};

export default LinkWrapper;
