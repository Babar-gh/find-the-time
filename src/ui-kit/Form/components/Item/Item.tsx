import classNames from 'classnames/bind';
import { cloneElement, ComponentProps, ReactElement } from 'react';
import Input from 'ui-kit/Input';
import Text from 'components/Text';
import styles from './Item.module.scss';

interface IProps {
  _id?: string;
  _formLayout?: 'vertical' | 'horizontal';
  label: string;
  isRequired?: boolean;
  errorMessage?: string;
  children: ReactElement<ComponentProps<typeof Input>>;
}

const cn = classNames.bind(styles);

const Item: React.VFC<IProps> = ({
  _id,
  _formLayout,
  label,
  isRequired,
  errorMessage,
  children: child,
}) => {
  const validationStatus = errorMessage ? 'error' : undefined;

  return (
    <div className={cn('Root', `Root_layout_${_formLayout}`)}>
      <label
        htmlFor={_id}
        className={cn('LabelContainer', `LabelContainer_layout_${_formLayout}`)}
      >
        <span>
          {isRequired && <Text color="error">*&nbsp;</Text>}
          <Text>{label}</Text>
        </span>
      </label>
      <div
        className={cn('InputContainer', `InputContainer_layout_${_formLayout}`)}
      >
        {cloneElement(child, { id: _id, validationStatus })}
        {errorMessage && (
          <p className={styles['ErrorMessage']}>
            <Text color="error" font="primary" size="small">
              {errorMessage}
            </Text>
          </p>
        )}
      </div>
    </div>
  );
};

export default Item;
