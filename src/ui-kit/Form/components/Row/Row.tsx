import classNames from 'classnames/bind';
import { Children, cloneElement } from 'react';
import Button, { ButtonElement } from 'ui-kit/Button';
import { CustomItemElement, ItemElement } from 'ui-kit/Form';
import CustomItem from '../CustomItem';
import Item from '../Item';
import styles from './Row.module.scss';

type Child =
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

const Row: React.VFC<IProps> = ({ _formLayout, children }) => {
  return (
    <div className={cn('Root', `Root_layout_${_formLayout}`)}>
      {Children.map(children, (childNode, nodeIndex) => {
        const elements = Array.isArray(childNode) ? childNode : [childNode];

        const validated = elements.map((element, elementIndex) => {
          const isFirst = nodeIndex === 0 && elementIndex === 0;

          switch (element.type) {
            default:
              throw new Error(
                'Only <Form.Row>, <Form.Item>, <Form.CustomItem> or <Button> can be used as a child of <Form.Column>'
              );

            case Item:
              return cloneElement(element as ItemElement, {
                _formLayout,
                _placement: isFirst ? 'firstInRow' : 'inRow',
              });

            case CustomItem:
              return cloneElement(element as CustomItemElement);

            case Button:
              return cloneElement(element as ButtonElement);
          }
        });

        return validated;
      })}
    </div>
  );
};

export default Row;
