import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import LinkWrapper from 'components/LinkWrapper';
import styles from './Item.module.scss';

interface ISharedProps {
  type: 'Anchor' | 'RouterLink' | 'Button';
  id: string;
  icon?: ReactElement;
  isSelected?: boolean;
}

interface ILinkProps {
  type: 'Anchor' | 'RouterLink';
  to: string;
}

interface IButtonProps {
  type: 'Button';
  onClick: React.MouseEventHandler;
}

type IProps = ISharedProps & (ILinkProps | IButtonProps);

const cn = classNames.bind(styles);

const Item: React.FC<IProps> = (props) => {
  const { type, icon, isSelected, children } = props;

  // { type, icon, isSelected, children, ...rest } syntax would be preferable,
  // however as of version 4.5.5, TypeScript can't narrow down the type of
  // “rest” based on “type” value.

  // Consider:

  // const { type, icon, isSelected, children, ...rest } = props;
  //
  // if (type === 'Anchor') {
  //   <LinkWrapper type={type} to={rest.to} />;
  // }

  // Error:
  // Property 'to' does not exist on type '{ id: string; to: string; } | { id: string; onClick: MouseEventHandler<Element>; }'.
  // Property 'to' does not exist on type '{ id: string; onClick: MouseEventHandler<Element>; }'.ts(2339)

  // const { type, icon, isSelected, children } = props;
  //
  // if (type === 'Anchor') {
  //   <LinkWrapper type={type} to={props.to} />;
  // }

  // Behaves as expected:
  // props.to type is correctly narrowed to “(property) ILinkProps.to: string”

  const content = (
    <div className={cn('Container', { Container_selected: isSelected })}>
      <span className={styles['IconContainer']}>{icon}</span>
      <span>{children}</span>
    </div>
  );

  return (
    <>
      {(type === 'Anchor' || type === 'RouterLink') && (
        <LinkWrapper type={type} to={props.to} className={styles['Link']}>
          {content}
        </LinkWrapper>
      )}

      {type === 'Button' && (
        <button onClick={props.onClick} className={styles['Button']}>
          {content}
        </button>
      )}
    </>
  );
};

export default Item;
