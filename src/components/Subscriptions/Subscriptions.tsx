import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import Text from 'components/Text';
import { getDisplayName } from 'helpers/users/getDisplayName';
import { IEvent } from 'types/events';
import { addIntersections, getConstraintText } from './helpers';
import styles from './Subscriptions.module.scss';

interface IProps extends Pick<IEvent, 'subscriptions'> {}

const cn = classNames.bind(styles);

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
            {list.map(({ availability }, rowIndex) => {
              const isLastRow = rowIndex === list.length - 1;

              return (
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

                      const durationPercent =
                        (dayjs(end).diff(start) / minToMaxDuration) * 100;

                      return (
                        <div
                          className={cn(
                            'Interval',
                            `Interval_color_${isLastRow ? 'all' : 'user'}`
                          )}
                          style={{
                            left: `${beforePercent}%`,
                            width: `${durationPercent}%`,
                          }}
                        />
                      );
                    })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Subscriptions;
