import classNames from 'classnames/bind';
import { Children, cloneElement, ComponentProps, ReactElement } from 'react';
import Button from 'ui-kit/Button';
import Item from '../Item';
import styles from './Column.module.scss';

type ItemElement = ReactElement<ComponentProps<typeof Item>>;
type ButtonElement = ReactElement<ComponentProps<typeof Button>>;

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
