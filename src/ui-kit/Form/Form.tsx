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
import CustomItem from './components/CustomItem';
import Item from './components/Item';
import Row from './components/Row';
import styles from './Form.module.scss';

type RowComponent = typeof Row;
type ItemComponent = typeof Item;
type CustomItemComponent = typeof CustomItem;

type ColumnComponent = typeof Column;
type ColumnElement = ReactElement<ComponentProps<ColumnComponent>>;

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  defaultPreventedOnSubmission: boolean;
  layout?: 'vertical' | 'horizontal' | 'responsive';
  children:
  | ColumnElement
  | [ColumnElement, ColumnElement]
  | [ColumnElement, ColumnElement, ColumnElement];
}

type FormComponent = React.VFC<IProps> & {
  Item: ItemComponent;
  CustomItem: CustomItemComponent;
  Column: ColumnComponent;
  Row: RowComponent;
};

const Form: FormComponent = ({
  defaultPreventedOnSubmission,
  layout = 'vertical',
  children,
  onSubmit,
  ...rest
}) => {
  const bp = useBreakpointCheck();

  const _formLayout =
    layout !== 'responsive' ? layout : bp('Mobile') ? 'vertical' : 'horizontal';

  const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
    if (defaultPreventedOnSubmission) {
      event.preventDefault();
    }

    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <form className={styles['Root']} onSubmit={handleSubmission} {...rest}>
      {Children.map(children, (column) => {
        if (column.type !== Column) {
          throw new Error(
            'Only <Form.Column> can be used as a child of <Form>'
          );
        }

        return cloneElement(column, { _formLayout });
      })}
    </form>
  );
};

Form.Item = Item;
Form.CustomItem = CustomItem;
Form.Column = Column;
Form.Row = Row;

export default Form;
