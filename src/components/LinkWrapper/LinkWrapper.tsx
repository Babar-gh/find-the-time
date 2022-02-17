import { HTMLProps } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  NavLink as RouterNavLink,
  NavLinkProps as RouterNavLinkProps,
} from 'react-router-dom';

interface ISharedProps {
  type: 'RouterLink' | 'RouterNavLink' | 'Anchor';
  to: string;
}

interface IRouterLinkProps extends Omit<RouterLinkProps, 'to'> {
  type: 'RouterLink';
}

interface IRouterNavLinkProps extends Omit<RouterNavLinkProps, 'to'> {
  type: 'RouterNavLink';
}

interface IAnchorProps extends Omit<HTMLProps<HTMLAnchorElement>, 'href'> {
  type: 'Anchor';
}

type Props = ISharedProps &
(IRouterLinkProps | IRouterNavLinkProps | IAnchorProps);

const LinkWrapper: React.FC<Props> = ({ type, to, ...rest }) => {
  switch (type) {
    case 'RouterLink':
      return (
        <RouterLink to={to} {...(rest as Omit<IRouterLinkProps, 'type'>)} />
      );

    case 'RouterNavLink':
      return (
        <RouterNavLink
          to={to}
          {...(rest as Omit<IRouterNavLinkProps, 'type'>)}
        />
      );

    case 'Anchor':
      return (
        // To do: ESLint warning
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a href={to} {...(rest as Omit<IAnchorProps, 'type'>)} />
      );
  }
};

export default LinkWrapper;
