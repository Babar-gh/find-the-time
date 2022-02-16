import { Children, cloneElement, isValidElement, ReactElement } from 'react';
import Item from './components/Item';
import MenuItem from './components/Item';

//import styles from './components/Menu.module.scss';

interface IProps {
  activeId: string;
  children: ReactElement<typeof Item> | ReactElement<typeof Item>[];
}

type MenuComponent = React.FC<IProps> & { Item: typeof MenuItem };

const Menu: MenuComponent = ({ activeId, children }) => {
  return (
    <ul>
      {Children.map(children, (item) => {
        if (isValidElement(item)) {
          const isActive = item.props.id === activeId;

          return <li>{cloneElement(item, { isActive })}</li>;
        }
      })}
    </ul>
  );
};

Menu.Item = MenuItem;

export default Menu;
