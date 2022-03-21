import {
  Children,
  cloneElement,
  ComponentProps,
  FormEvent,
  FormHTMLAttributes,
  ReactElement,
} from 'react';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import Column from './components/Column';
import Item from './components/Item';
import styles from './Form.module.scss';

type ItemComponent = typeof Item;

type ColumnComponent = typeof Column;
type ColumnElement = ReactElement<ComponentProps<ColumnComponent>>;

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  layout?: 'vertical' | 'horizontal';
  children:
  | ColumnElement
  | [ColumnElement, ColumnElement]
  | [ColumnElement, ColumnElement, ColumnElement];
}

type FormComponent = React.VFC<IProps> & {
  Item: ItemComponent;
  Column: ColumnComponent;
};

const Form: FormComponent = ({
  layout = 'vertical',
  children,
  onSubmit,
  ...rest
}) => {
  let columnId = 0;
  const bp = useBreakpointCheck();

  const formLayout = bp('Mobile') ? 'vertical' : layout;
  const onSubmitWithPreventedDefault = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <form
      className={styles['Root']}
      onSubmit={onSubmitWithPreventedDefault}
      {...rest}
    >
      {Children.map(children, (column) => {
        if (column.type !== Column) {
          throw new Error(
            'Only <Form.Column> can be used as a child of <Form>'
          );
        }

        return cloneElement(column, {
          id: `${columnId++}`,
          formLayout,
        });
      })}
    </form>
  );
};

Form.Item = Item;
Form.Column = Column;

export default Form;
