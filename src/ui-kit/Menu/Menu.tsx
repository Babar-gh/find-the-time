import MenuItem from './MenuItem';

//import styles from './Menu.module.scss';

type MenuComponent = React.FC & { Item: typeof MenuItem };

const Menu: MenuComponent = ({ children }) => {
  return <ul>{children}</ul>;
};

Menu.Item = MenuItem;

export default Menu;
