import { ComponentProps, ReactElement } from 'react';

const CustomItem: React.FC = ({ children }) => {
  return <>{children}</>;
};

export default CustomItem;

export type CustomItemElement = ReactElement<ComponentProps<typeof CustomItem>>;
