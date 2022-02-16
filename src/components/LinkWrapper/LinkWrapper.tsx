import { HTMLProps } from 'react';
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

interface IAnchorProps extends HTMLProps<HTMLAnchorElement> {
  type: 'Anchor';
}

type Props = IRouterLinkProps | IRouterNavLinkProps | IAnchorProps;

const LinkWrapper: React.FC<Props> = ({ type, ...rest }) => {
  switch (type) {
    case 'RouterLink':
      return <RouterLink {...(rest as RouterLinkProps)} />;
    case 'RouterNavLink':
      return <RouterNavLink {...(rest as RouterNavLinkProps)} />;
    case 'Anchor':
      // To do: ESLint warning
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a {...(rest as HTMLProps<HTMLAnchorElement>)} />;
  }
};

export default LinkWrapper;
