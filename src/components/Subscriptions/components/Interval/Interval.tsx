import classNames from 'classnames/bind';
import { useState } from 'react';
import { getConstraintText } from 'components/Subscriptions/helpers';
import { TimeInterval } from 'types/common';
import styles from './Interval.module.scss';

interface IProps {
  interval: TimeInterval;
  column: TimeInterval;
  color: 'user' | 'all';
}

const cn = classNames.bind(styles);

const Interval: React.VFC<IProps> = ({ interval, column, color }) => {
  const [isPicked, setIsPicked] = useState(false);

  const { start, end } = interval;
  const { start: min, end: max } = column;

  const minToMaxDuration = max.diff(min);

  const beforePercent = (start.diff(min) / minToMaxDuration) * 100;
  const durationPercent = (end.diff(start) / minToMaxDuration) * 100;

  return (
    <div
      className={cn('Root', `Root_color_${color}`, { Root_picked: isPicked })}
      style={{
        left: `${beforePercent}%`,
        width: `${durationPercent}%`,
      }}
      onMouseEnter={() => setIsPicked(true)}
      onMouseLeave={() => setIsPicked(false)}
    >
      <div className={cn('Details', { Details_shown: isPicked })}>
        <div className={styles['Start']}>{getConstraintText(start, true)}</div>
        <div className={styles['End']}>{getConstraintText(end, true)}</div>
      </div>
    </div>
  );
};

export default Interval;
