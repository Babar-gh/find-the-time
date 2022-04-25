import classNames from 'classnames/bind';
import { Children, cloneElement, ComponentProps, ReactElement } from 'react';
import Button from 'ui-kit/Button';
import CustomItem from '../CustomItem';
import Item from '../Item';
import Row from '../Row';
import styles from './Column.module.scss';

type RowComponent = typeof Row;
type RowElement = ReactElement<ComponentProps<RowComponent>>;

type ItemComponent = typeof Item;
type ItemElement = ReactElement<ComponentProps<ItemComponent>>;

type CustomItemComponent = typeof CustomItem;
type CustomItemElement = ReactElement<ComponentProps<CustomItemComponent>>;

type ButtonComponent = typeof Button;
type ButtonElement = ReactElement<ComponentProps<ButtonComponent>>;

type Child =
  | RowElement
  | RowElement[]
  | ItemElement
  | ItemElement[]
  | CustomItemElement
  | CustomItemElement[]
  | ButtonElement
  | ButtonElement[];

interface IProps {
  _formLayout?: 'vertical' | 'horizontal';
  children: Child | Child[];
}

const cn = classNames.bind(styles);

const Column: React.VFC<IProps> = ({ _formLayout, children }) => {
  return (
    <div className={styles['Root']}>
      {Children.map(children, (childNode) => {
        const elements = Array.isArray(childNode) ? childNode : [childNode];

        const validated = elements.map((element) => {
          switch (element.type) {
            default:
              throw new Error(
                'Only <Form.Row>, <Form.Item>, <Form.CustomItem> or <Button> can be used as a child of <Form.Column>'
              );

            case Row:
              return cloneElement(element as RowElement, { _formLayout });

            case Item:
              return cloneElement(element as ItemElement, {
                _formLayout,
                _placement: 'inColumn',
              });

            case CustomItem:
              return cloneElement(element as CustomItemElement);

            case Button:
              return (
                <div
                  className={cn(
                    'ButtonContainer',
                    `ButtonContainer_layout_${_formLayout}`
                  )}
                >
                  {cloneElement(element as ButtonElement)}
                </div>
              );
          }
        });

        return validated;
      })}
    </div>
  );
};

export default Column;
