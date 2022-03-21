import classNames from 'classnames/bind';
import { cloneElement, ComponentProps, ReactElement } from 'react';
import Input from 'ui-kit/Input';
import Text from 'components/Text';
import styles from './Item.module.scss';

interface IProps {
  id?: string;
  formLayout?: 'vertical' | 'horizontal';
  label: string;
  isRequired?: boolean;
  validationMessage?: string;
  children: ReactElement<ComponentProps<typeof Input>>;
}

const cn = classNames.bind(styles);

const Item: React.VFC<IProps> = ({
  id,
  formLayout,
  label,
  isRequired,
  validationMessage,
  children: child,
}) => {
  const validationStatus = validationMessage ? 'error' : undefined;

  return (
    <div className={cn('Root', `Root_layout_${formLayout}`)}>
      <label
        htmlFor={id}
        className={cn('LabelContainer', `LabelContainer_layout_${formLayout}`)}
      >
        <span>
          {isRequired && <Text color="error">*&nbsp;</Text>}
          <Text>{label}</Text>
        </span>
      </label>
      <div
        className={cn('InputContainer', `InputContainer_layout_${formLayout}`)}
      >
        {cloneElement(child, { id, validationStatus })}
        {validationMessage && (
          <Text color="error" font="primaryItalic" size="small">
            {validationMessage}
          </Text>
        )}
      </div>
    </div>
  );
};

export default Item;
