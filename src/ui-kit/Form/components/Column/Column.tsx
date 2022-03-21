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
  _id?: number;
  _formLayout?: 'vertical' | 'horizontal';
  children: Child | Child[];
}

const cn = classNames.bind(styles);

const Column: React.VFC<IProps> = ({ _id, _formLayout, children }) => {
  return (
    <div className={styles['Root']}>
      {Children.map(children, (child, index) => {
        switch (child.type) {
          default:
            throw new Error(
              'Only <Form.Item> or <Button> can be used as a child of <Form.Column>'
            );

          case Item:
            return cloneElement(child as ItemElement, {
              _id: `column-${_id}-item-${index}`,
              _formLayout,
            });

          case Button:
            return (
              <div
                className={cn(
                  'ButtonContainer',
                  `ButtonContainer_layout_${_formLayout}`
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
