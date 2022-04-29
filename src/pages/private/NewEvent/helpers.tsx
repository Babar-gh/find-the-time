import validate from 'validate.js';
import { Dayjs } from 'dayjs';
import DatePicker from 'ui-kit/DatePicker';
import RangePickerButtons from './components/RangePickerButtons/RangePickerButtons';
import { Interval } from './types';

export const parsePositiveInt = (input: string) => Math.abs(parseInt(input));

export const treatNaNAsZero = (number: number) => (isNaN(number) ? 0 : number);
export const treatNaNAsEmptyString = (number: number) =>
  isNaN(number) ? '' : number;

export const getRangePickers = (
  index: number,
  intervals: Interval[],
  duration: number,
  someIntervalsAreInvalid: React.MutableRefObject<boolean>,
  getAddIntervalHandler: (index: number) => () => void,
  getRemoveIntervalHandler: (index: number) => () => void,
  getStartPickerChangeHandler: (index: number) => (value: Dayjs | null) => void,
  getEndPickerChangeHandler: (index: number) => (value: Dayjs | null) => void
) => {
  const startError: string | undefined = validate.single(intervals[index], {
    startIsBeforeEnd: true,
  });

  const endError: string | undefined = validate.single(intervals[index], {
    longerThan: { duration },
  });

  someIntervalsAreInvalid.current = Boolean(startError || endError);

  const startPicker = (
    <DatePicker
      value={intervals[index].start}
      onChange={getStartPickerChangeHandler(index)}
    />
  );

  const endPicker = (
    <DatePicker
      value={intervals[index].end}
      onChange={getEndPickerChangeHandler(index)}
    />
  );

  return [
    {
      formItemProps: {
        label: 'Start',
        errorMessage: startError,
        isRequired: true,
        addons: null,
      },
      picker: startPicker,
    },
    {
      formItemProps: {
        label: 'End',
        errorMessage: endError,
        isRequired: true,
        addons: (
          <RangePickerButtons
            intervals={intervals}
            onAddInterval={getAddIntervalHandler(index)}
            onRemoveInterval={getRemoveIntervalHandler(index)}
            index={index}
          />
        ),
      },
      picker: endPicker,
    },
  ];
};
