import Text from 'components/Text';
import { getDisplayName } from 'helpers/users';
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
        {list.map(({ user }, userIndex) => (
          <div className={styles['UserName']} key={userIndex}>
            <Text font="primaryBold">{getDisplayName(user)}</Text>
          </div>
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
          {list.map(({ availability }, rowIndex) => {
            const rowsTotal = list.length;
            const isLastRow = rowIndex + 1 === rowsTotal;

            return (
              <div className={styles['UserIntervals']} key={rowIndex}>
                {availability
                  .filter(
                    ({ start, end }) =>
                      start.isSameOrAfter(min) && end.isSameOrBefore(max)
                  )
                  .map((interval, intervalIndex) => (
                    <div key={intervalIndex}>
                      <Interval
                        interval={interval}
                        column={{ start: min, end: max }}
                        rows={{ current: rowIndex, total: rowsTotal }}
                        color={isLastRow ? 'all' : 'user'}
                      />
                    </div>
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
