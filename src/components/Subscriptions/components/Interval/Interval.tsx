import classNames from 'classnames/bind';
import { useState } from 'react';
import IconButton from 'ui-kit/IconButton';
import { getConstraintText, isLastRow } from 'components/Subscriptions/helpers';
import { TimeInterval } from 'types/common';
import { Rows } from '../../types';
import styles from './Interval.module.scss';

interface IProps {
  interval: TimeInterval;
  column: TimeInterval;
  rows: Rows;
  isCurrentUser: boolean;
  onIntervalChoice?: (interval: TimeInterval) => void;
}

const ROW_HEIGHT = 58;

const cn = classNames.bind(styles);

const Interval: React.VFC<IProps> = ({
  interval,
  column,
  rows,
  isCurrentUser,
  onIntervalChoice,
}) => {
  const [isPicked, setIsPicked] = useState(false);

  const { start, end } = interval;
  const { start: min, end: max } = column;

  const minToMaxDuration = max.diff(min);

  const beforePercent = (start.diff(min) / minToMaxDuration) * 100;
  const durationPercent = (end.diff(start) / minToMaxDuration) * 100;

  const isAllParticipants = isLastRow(rows);

  return (
    <div
      className={cn('Root', {
        Root_picked: isPicked,
        Root_color_user: !isCurrentUser && !isAllParticipants,
        Root_color_current: isCurrentUser,
        Root_color_all: isAllParticipants,
      })}
      style={{
        left: `${beforePercent}%`,
        width: `${durationPercent}%`,
      }}
      onMouseEnter={() => setIsPicked(true)}
      onMouseLeave={() => setIsPicked(false)}
    >
      {isAllParticipants && onIntervalChoice && (
        <div className={styles['IntervalChoiceButtonContainer']}>
          <IconButton
            icon="EditCalendar"
            elementProps={{ onClick: () => onIntervalChoice(interval) }}
          />
        </div>
      )}
      <div className={cn('Details', { Details_shown: isPicked })}>
        <div className={styles['Start']}>{getConstraintText(start, true)}</div>
        <div className={styles['End']}>{getConstraintText(end, true)}</div>
      </div>
      <div
        className={cn('RangeHighlight', { RangeHighlight_shown: isPicked })}
        style={{
          top: `-${ROW_HEIGHT * (rows.current + 1)}px`,
          height: `${ROW_HEIGHT * (rows.total + 1)}px`,
        }}
      />
    </div>
  );
};

export default Interval;
