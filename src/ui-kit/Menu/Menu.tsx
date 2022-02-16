import { Children, cloneElement, isValidElement, ReactElement } from 'react';
import Item from './components/Item';

import styles from './Menu.module.scss';

interface IProps {
  selectedId: string;
  children: ReactElement<typeof Item> | ReactElement<typeof Item>[];
}

type MenuComponent = React.FC<IProps> & { Item: typeof Item };

const Menu: MenuComponent = ({ selectedId, children }) => {
  return (
    <ul className={styles['Root']}>
      {Children.map(children, (item) => {
        if (isValidElement(item)) {
          const isSelected = item.props.id === selectedId;

          return (
            <li className={styles['Item']}>
              {cloneElement(item, { isSelected })}
            </li>
          );
        }
      })}
    </ul>
  );
};

Menu.Item = Item;

export default Menu;
