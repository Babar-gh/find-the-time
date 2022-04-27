import { ComponentProps, ReactElement } from 'react';
import Input from './Input';

export { default } from './Input';

export type InputElement = ReactElement<ComponentProps<typeof Input>>;
