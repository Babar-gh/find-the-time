import Text from 'components/Text';
import { getDisplayName } from 'helpers/users/getDisplayName';
import { IEvent } from 'types/events';
import Interval from './components/Interval';
import { addIntersections, getConstraintText } from './helpers';
import styles from './Subscriptions.module.scss';

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
      {list[0].availability.map(({ start: min, end: max }) => (
        <div
          className={styles['IntervalList']}
          style={{ flexGrow: max.diff(min, 'minutes') }}
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
                      start.isSameOrAfter(min) && end.isSameOrBefore(max)
                  )
                  .map((interval) => (
                    <Interval
                      interval={interval}
                      column={{ start: min, end: max }}
                      color={isLastRow ? 'all' : 'user'}
                    />
                  ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Subscriptions;
