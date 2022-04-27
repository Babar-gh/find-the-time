import classNames from 'classnames/bind';
import { uniqueId } from 'lodash';
import { cloneElement, ReactNode, useRef } from 'react';
import Text from 'components/Text';
import { InputElement } from 'ui-kit/Input';
import styles from './Item.module.scss';
import useLabelWidth from './hooks/useLabelWidth';

interface IProps {
  _formLayout?: 'vertical' | 'horizontal';
  _placement?: 'inColumn' | 'inRow' | 'firstInRow';
  label: string;
  isRequired?: boolean;
  errorMessage?: string;
  addons?: ReactNode;
  children: InputElement;
}

const cn = classNames.bind(styles);

const Item: React.VFC<IProps> = ({
  _formLayout,
  _placement,
  label,
  isRequired,
  errorMessage,
  addons,
  children: child,
}) => {
  const { current: id } = useRef(uniqueId());
  const { ref, width } = useLabelWidth();

  const validationStatus = errorMessage ? 'error' : undefined;

  const requiresAdjustment =
    _formLayout === 'horizontal' && _placement === 'firstInRow';

  return (
    <div
      className={cn(
        'Root',
        `Root_${_formLayout}`,
        `Root_${_formLayout}_${_placement}`
      )}
      style={requiresAdjustment ? { marginLeft: `-${width}px` } : undefined}
    >
      <label
        className={cn(
          'LabelContainer',
          `LabelContainer_${_formLayout}`,
          `LabelContainer_${_formLayout}_${_placement}`
        )}
        ref={requiresAdjustment ? ref : null}
        htmlFor={id}
      >
        <span>
          {isRequired && <Text color="error">*&nbsp;</Text>}
          <Text>{label}</Text>
        </span>
      </label>
      <div
        className={cn(
          'InputContainer',
          `InputContainer_${_formLayout}`,
          `InputContainer_${_formLayout}_${_placement}`
        )}
      >
        {cloneElement(child, { validationStatus, id })}
        {errorMessage && (
          <p className={styles['ErrorMessage']}>
            <Text color="error" font="primary" size="small">
              {errorMessage}
            </Text>
          </p>
        )}
      </div>
      {addons}
    </div>
  );
};

export default Item;
