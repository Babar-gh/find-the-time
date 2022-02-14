import { HTMLAttributes } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  NavLink as RouterNavLink,
  NavLinkProps as RouterNavLinkProps,
} from 'react-router-dom';

interface IRouterLinkProps extends RouterLinkProps {
  type: 'RouterLink';
}

interface IRouterNavLinkProps extends RouterNavLinkProps {
  type: 'RouterNavLink';
}

interface IAnchorProps extends HTMLAttributes<HTMLAnchorElement> {
  type: 'Anchor';
}

type Props = IRouterLinkProps | IRouterNavLinkProps | IAnchorProps;

const Link: React.FC<Props> = ({ type, ...rest }) => {
  switch (type) {
    case 'RouterLink':
      return <RouterLink {...(rest as RouterLinkProps)} />;
    case 'RouterNavLink':
      return <RouterNavLink {...(rest as RouterNavLinkProps)} />;
    case 'Anchor':
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a {...(rest as HTMLAttributes<HTMLAnchorElement>)} />;
  }
};

export default Link;
