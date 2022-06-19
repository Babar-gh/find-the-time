import IconButton from 'ui-kit/IconButton';
import { IUser } from 'types/users';
import { IEvent, Subscription } from 'types/events';
import { TimeInterval } from 'types/common';
import { useAppSelector } from 'store/hooks';
import Interval from './components/Interval';
import styles from './Subscriptions.module.scss';
import User from './components/User';
import {
  addIntersections,
  addScheduledFor,
  getConstraintText,
} from './helpers';
import { ALL_PARTICIPANTS_ID } from './constants';

interface IProps {
  participants: Subscription[];
  scheduledFor: IEvent['chosenInterval'];
  visitor?: Subscription;
  onUserRemoval?: (user: IUser) => void;
  onIntervalChoice?: (interval: TimeInterval) => void;
  onAvailabilityPick?: (constrains: TimeInterval) => void;
}

const Subscriptions: React.VFC<IProps> = ({
  participants,
  scheduledFor,
  visitor,
  onUserRemoval,
  onIntervalChoice,
  onAvailabilityPick,
}) => {
  const account = useAppSelector((store) => store.account);

  const withIntersections = addIntersections(participants, visitor);
  const list = addScheduledFor(withIntersections, scheduledFor);

  return (
    <div className={styles['Root']}>
      <div className={styles['UserList']}>
        {list.map(({ user }, userIndex) => (
          <User
            key={userIndex}
            user={user}
            isCurrent={user.id === account.id}
            isOrganizer={user.id === list[0].user.id}
            isAllParticipants={user.id === ALL_PARTICIPANTS_ID}
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
                    isCurrentUser={list[rowIndex].user.id === account.id}
                    isAllParticipants={
                      list[rowIndex].user.id === ALL_PARTICIPANTS_ID
                    }
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
