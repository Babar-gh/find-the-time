import classNames from 'classnames/bind';
import { Children, cloneElement, ComponentProps, ReactElement } from 'react';
import Button from 'ui-kit/Button';
import Item from '../Item';
import styles from './Column.module.scss';

type ItemComponent = typeof Item;
type ItemElement = ReactElement<ComponentProps<ItemComponent>>;

type ButtonComponent = typeof Button;
type ButtonElement = ReactElement<ComponentProps<ButtonComponent>>;

type Child = ItemElement | ButtonElement;

interface IProps {
  id?: string;
  formLayout?: 'vertical' | 'horizontal';
  children: Child | Child[];
}

const cn = classNames.bind(styles);

const Column: React.VFC<IProps> = ({ id, children, formLayout }) => {
  let itemId = 0;

  return (
    <div className={styles['Root']}>
      {Children.map(children, (child) => {
        switch (child.type) {
          default:
            throw new Error(
              'Only <Form.Item> or <Button> can be used as a child of <Form.Column>'
            );
          case Item:
            return cloneElement(child as ItemElement, {
              id: `column-${id}-item-${itemId++}`,
              formLayout,
            });

          case Button:
            return (
              <div
                className={cn(
                  'ButtonContainer',
                  `ButtonContainer_layout_${formLayout}`
                )}
              >
                {cloneElement(child as ButtonElement)}
              </div>
            );
        }
      })}
    </div>
  );
};

export default Column;
