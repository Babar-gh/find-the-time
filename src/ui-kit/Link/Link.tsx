import { AnchorHTMLAttributes, ReactNode } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  NavLink,
  NavLinkProps,
} from 'react-router-dom';
import Text from 'components/Text';
import { OmitChildren } from 'types/utility';
import styles from './Link.module.scss';

type SharedProps =
  | { isWrapper: true; theme?: never; children: ReactNode }
  | { isWrapper?: false; theme?: 'primary' | 'danger'; children: string };

type RouterLinkTypeProps = OmitChildren<RouterLinkProps>;
type NavLinkTypeProps = OmitChildren<NavLinkProps>;
type AnchorTypeProps = OmitChildren<AnchorHTMLAttributes<HTMLAnchorElement>>;

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
