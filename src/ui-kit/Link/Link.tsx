import { HTMLAttributes, ReactNode } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  NavLink,
  NavLinkProps,
} from 'react-router-dom';
import Text from 'components/Text';
import styles from './Link.module.scss';

type SharedProps =
  | { isWrapper: true; theme?: never; children: ReactNode }
  | { isWrapper?: false; theme?: 'primary' | 'danger'; children: string };

type RouterLinkTypeProps = Omit<RouterLinkProps, 'children'>;
type NavLinkTypeProps = Omit<NavLinkProps, 'children'>;
type AnchorTypeProps = Omit<HTMLAttributes<HTMLAnchorElement>, 'children'>;

export type LinkTypeSpecificProps =
  | ({ type: 'RouterLink' } & RouterLinkTypeProps)
  | ({ type: 'RouterNavLink' } & NavLinkTypeProps)
  | ({ type: 'HTMLAnchor' } & AnchorTypeProps);

type IProps = SharedProps & LinkTypeSpecificProps;

const Link: React.VFC<IProps> = ({
  isWrapper,
  theme = 'primary',
  type,
  children,
  ...rest
}) => {
  const className = styles[`Root_theme_${isWrapper ? 'wrapper' : theme}`];

  const content = isWrapper ? (
    children
  ) : (
    <Text color="inherit">{children as string}</Text>
  );

  switch (type) {
    case 'RouterLink':
      return (
        <RouterLink className={className} {...(rest as RouterLinkTypeProps)}>
          {content}
        </RouterLink>
      );

    case 'RouterNavLink':
      return (
        <NavLink className={className} {...(rest as NavLinkTypeProps)}>
          {content}
        </NavLink>
      );

    case 'HTMLAnchor':
      return (
        <a className={className} {...(rest as AnchorTypeProps)}>
          {content}
        </a>
      );
  }
};

export default Link;
