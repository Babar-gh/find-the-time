import { ComponentProps, ReactElement } from 'react';
import Column from './components/Column';
import CustomItem from './components/CustomItem';
import Item from './components/Item';
import Row from './components/Row';

export { default } from './Form';

export type ColumnElement = ReactElement<ComponentProps<typeof Column>>;
export type CustomItemElement = ReactElement<ComponentProps<typeof CustomItem>>;
export type ItemElement = ReactElement<ComponentProps<typeof Item>>;
export type RowElement = ReactElement<ComponentProps<typeof Row>>;
