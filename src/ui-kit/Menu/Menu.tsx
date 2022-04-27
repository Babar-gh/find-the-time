import { Children, cloneElement } from 'react';
import Item from './components/Item';
import styles from './Menu.module.scss';
import { ItemElement } from '.';

interface IProps {
  selectedId?: string;
  children: ItemElement | ItemElement[];
}

type MenuComponent = React.VFC<IProps> & { Item: typeof Item };

const Menu: MenuComponent = ({ selectedId, children }) => {
  return (
    <ul className={styles['Root']}>
      {Children.map(children, (item) => {
        if (item.type !== Item) {
          throw new Error('Only <Menu.Item> can be used as a child of <Menu>');
        }

        const isSelected = item.props.id === selectedId;

        return (
          <li className={styles['Item']}>
            {cloneElement(item, { isSelected })}
          </li>
        );
      })}
    </ul>
  );
};

Menu.Item = Item;

export default Menu;
