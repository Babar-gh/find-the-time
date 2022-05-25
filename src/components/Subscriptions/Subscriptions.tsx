import IconButton from 'ui-kit/IconButton';
import { IUser } from 'types/users';
import { Subscription } from 'types/events';
import { TimeInterval } from 'types/common';
import Interval from './components/Interval';
import styles from './Subscriptions.module.scss';
import User from './components/User';
import { addIntersections, getConstraintText } from './helpers';

interface IProps {
  participants: Subscription[];
  visitor?: Subscription;
  onUserRemoval?: (user: IUser) => void;
  onIntervalChoice?: (interval: TimeInterval) => void;
  onAvailabilityPick?: (constrains: TimeInterval) => void;
}

const Subscriptions: React.VFC<IProps> = ({
  participants,
  visitor,
  onUserRemoval,
  onIntervalChoice,
  onAvailabilityPick,
}) => {
  const list = addIntersections(participants, visitor);

  return (
    <div className={styles['Root']}>
      <div className={styles['UserList']}>
        {list.map(({ user }, userIndex) => (
          <User
            key={userIndex}
            user={user}
            rows={{ current: userIndex, total: list.length }}
            onRemoval={onUserRemoval}
          />
        ))}
      </div>
      {list[0].availability.map(({ start: min, end: max }, columnIndex) => (
        <div
          className={styles['IntervalList']}
          style={{ flexGrow: max.diff(min, 'minutes') }}
          key={columnIndex}
        >
          <div className={styles['IntervalHeader']}>
            <div className={styles['Min']}>{getConstraintText(min)}</div>
            <div className={styles['Max']}>{getConstraintText(max)}</div>
          </div>
          {list.map(({ availability }, rowIndex) => (
            <div className={styles['UserIntervals']} key={rowIndex}>
              {availability
                .filter(
                  ({ start, end }) =>
                    start.isSameOrAfter(min) && end.isSameOrBefore(max)
                )
                .map((interval, intervalIndex) => (
                  <Interval
                    key={intervalIndex}
                    interval={interval}
                    column={{ start: min, end: max }}
                    rows={{ current: rowIndex, total: list.length }}
                    onIntervalChoice={onIntervalChoice}
                  />
                ))}
            </div>
          ))}
          {onAvailabilityPick && (
            <div className={styles['AvailabilityPickButtonContainer']}>
              <IconButton
                icon="Add"
                elementProps={{
                  onClick: () => onAvailabilityPick({ start: min, end: max }),
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Subscriptions;
