import dayjs from 'dayjs';
import Text from 'components/Text';
import { getDisplayName } from 'helpers/users/getDisplayName';
import { IEvent } from 'api/types/events';
import styles from './Subscriptions.module.scss';
import { getConstraintText } from './helpers';

interface IProps extends Pick<IEvent, 'subscriptions'> {}

const Subscriptions: React.VFC<IProps> = ({ subscriptions }) => {
  return (
    <div className={styles['Root']}>
      <div className={styles['UserList']}>
        {subscriptions.map(({ user }) => (
          <div className={styles['UserName']}>
            <Text font="primaryBold">{getDisplayName(user)}</Text>
          </div>
        ))}
      </div>
      {subscriptions[0].availability.map(({ start: min, end: max }) => {
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
            {subscriptions.map(({ availability }) => (
              <div className={styles['UserIntervals']}>
                {availability
                  .filter(
                    ({ start, end }) =>
                      dayjs(start).isSameOrAfter(min) &&
                      dayjs(end).isSameOrBefore(max)
                  )
                  .map(({ start, end }) => {
                    const beforeIntersection =
                      dayjs(start).diff(min) / minToMaxDuration;

                    const intersection =
                      dayjs(end).diff(start) / minToMaxDuration;

                    return (
                      <div
                        className={styles['Interval']}
                        style={{
                          left: `${beforeIntersection * 100}%`,
                          width: `${intersection * 100}%`,
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
