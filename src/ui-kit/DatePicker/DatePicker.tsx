import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import Input from 'ui-kit/Input';

interface IProps {
  id?: string;
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
}

const DatePicker: React.VFC<IProps> = ({ id, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <DateTimePicker
      value={value}
      onChange={onChange}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderInput={({ inputRef, inputProps }) => {
        return (
          <Input
            id={id}
            onClick={() => setOpen(true)}
            ref={inputRef}
            {...inputProps}
            readOnly
          />
        );
      }}
    />
  );
};

export default DatePicker;
