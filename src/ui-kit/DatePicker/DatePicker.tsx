import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { TimeInterval } from 'types/common';
import Input from 'ui-kit/Input';

interface IProps {
  id?: string;
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  constraints?: TimeInterval;
}

const DatePicker: React.VFC<IProps> = ({
  id,
  value,
  onChange,
  constraints,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DateTimePicker
      value={value}
      onChange={onChange}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      minDateTime={constraints?.start}
      maxDateTime={constraints?.end}
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
