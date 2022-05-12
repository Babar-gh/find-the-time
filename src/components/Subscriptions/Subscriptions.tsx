import dayjs from 'dayjs';
import Text from 'components/Text';
import { getDisplayName } from 'helpers/users/getDisplayName';
import { IEvent } from 'api/types/events';
import styles from './Subscriptions.module.scss';
import { getConstraintText, addIntersections } from './helpers';

interface IProps extends Pick<IEvent, 'subscriptions'> {}

const Subscriptions: React.VFC<IProps> = ({ subscriptions }) => {
  const list = addIntersections(subscriptions);

  return (
    <div className={styles['Root']}>
      <div className={styles['UserList']}>
        {list.map(({ user }) => (
          <div className={styles['UserName']}>
            <Text font="primaryBold">{getDisplayName(user)}</Text>
          </div>
        ))}
      </div>
      {list[0].availability.map(({ start: min, end: max }) => {
        const minToMaxDuration = dayjs(max).diff(min);

        return (
          <div
            className={styles['IntervalList']}
            style={{ flexGrow: dayjs(max).diff(min, 'minutes') }}
          >
            <div className={styles['IntervalHeader']}>
              <div className={styles['Min']}>{getConstraintText(min)}</div>
              <div className={styles['Max']}>{getConstraintText(max)}</div>
            </div>
            {list.map(({ availability }) => (
              <div className={styles['UserIntervals']}>
                {availability
                  .filter(
                    ({ start, end }) =>
                      dayjs(start).isSameOrAfter(min) &&
                      dayjs(end).isSameOrBefore(max)
                  )
                  .map(({ start, end }) => {
                    const beforePercent =
                      (dayjs(start).diff(min) / minToMaxDuration) * 100;

                    const intervalPercent =
                      (dayjs(end).diff(start) / minToMaxDuration) * 100;

                    return (
                      <div
                        className={styles['Interval']}
                        style={{
                          left: `${beforePercent}%`,
                          width: `${intervalPercent}%`,
                        }}
                      />
                    );
                  })}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Subscriptions;
