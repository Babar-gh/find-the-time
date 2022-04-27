import { Children, cloneElement, FormEvent, FormHTMLAttributes } from 'react';
import useBreakpointCheck from 'hooks/useBreakpointCheck';
import Column from './components/Column';
import CustomItem from './components/CustomItem';
import Item from './components/Item';
import Row from './components/Row';
import styles from './Form.module.scss';
import { ColumnElement } from '.';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  defaultPreventedOnSubmission: boolean;
  layout?: 'vertical' | 'horizontal' | 'responsive';
  children:
  | ColumnElement
  | [ColumnElement, ColumnElement]
  | [ColumnElement, ColumnElement, ColumnElement];
}

type FormComponent = React.VFC<IProps> & {
  Item: typeof Item;
  CustomItem: typeof CustomItem;
  Column: typeof Column;
  Row: typeof Row;
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
