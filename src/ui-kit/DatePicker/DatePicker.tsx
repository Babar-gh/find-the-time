import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import { useState } from 'react';
import Input from 'ui-kit/Input';

type NotExposedProps = 'open' | 'onOpen' | 'onClose' | 'renderInput';
interface IProps extends Omit<DateTimePickerProps, NotExposedProps> {}

const DatePicker: React.VFC<IProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <DateTimePicker
      {...props}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderInput={(props) => {
        return (
          <div ref={props.ref} onClick={() => setOpen(true)}>
            <Input ref={props.inputRef} {...props.inputProps} readOnly />
          </div>
        );
      }}
    />
  );
};

export default DatePicker;
