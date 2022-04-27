import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { uniqueId } from 'lodash';
import IconButton from 'ui-kit/IconButton';
import { Interval } from '../../types';
import styles from './RangePickerButtons.module.scss';

interface IProps {
  intervalsState: [Interval[], Dispatch<SetStateAction<Interval[]>>];
  index: number;
}

const RangePickerButtons: React.VFC<IProps> = ({ intervalsState, index }) => {
  const [intervals, setIntervals] = intervalsState;

  return (
    <div className={styles['Root']}>
      {intervals.length > 1 && (
        <IconButton
          icon="Remove"
          elementProps={{
            onClick: () =>
              setIntervals((current) => {
                const updated = [...current];
                updated.splice(index, 1);

                return updated;
              }),
          }}
        />
      )}
      {index === intervals.length - 1 && (
        <IconButton
          icon="Add"
          elementProps={{
            onClick: () =>
              setIntervals((current) => {
                const updated = [...current];
                updated.push({
                  start: dayjs(current[index].start).add(1, 'day'),
                  end: dayjs(current[index].end).add(1, 'day'),
                  key: uniqueId(),
                });

                return updated;
              }),
          }}
        />
      )}
    </div>
  );
};

export default RangePickerButtons;
