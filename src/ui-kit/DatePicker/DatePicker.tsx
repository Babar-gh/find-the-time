import { useState } from 'react';
import {
  DateTimePicker,
  DateTimePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Input from 'ui-kit/Input';
import 'dayjs/locale/en-gb';
import type {} from '@mui/lab/themeAugmentation';

type NotExposedProps = 'open' | 'onOpen' | 'onClose' | 'renderInput';
interface IProps extends Omit<DateTimePickerProps, NotExposedProps> {}

const DatePicker: React.VFC<IProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="en-gb">
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
    </LocalizationProvider>
  );
};

export default DatePicker;
