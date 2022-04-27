import { ComponentProps, ReactElement } from 'react';
import Item from './components/Item';

export { default } from './Menu';

export type ItemElement = ReactElement<ComponentProps<typeof Item>>;
