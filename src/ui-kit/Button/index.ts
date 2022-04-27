import { ComponentProps, ReactElement } from 'react';
import Button from './Button';

export { default } from './Button';

export type ButtonElement = ReactElement<ComponentProps<typeof Button>>;
