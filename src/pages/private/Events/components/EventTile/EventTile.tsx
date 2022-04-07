import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { getDisplayName } from 'helpers/users/getDisplayName';
import { IEvent } from 'api/types/events';
import styles from './EventTile.module.scss';

dayjs.extend(duration);
dayjs.extend(relativeTime);

type Status = 'notYetScheduled' | 'pending' | 'past';

interface IProps extends Omit<IEvent, 'subscriptions'> {}

const EventTile: React.VFC<IProps> = ({
  title,
  organizedBy,
  created,
  location,
  comment,
  duration,
  chosenInterval,
}) => {
  const status: Status =
    chosenInterval === null
      ? 'notYetScheduled'
      : dayjs(chosenInterval.end).isAfter(dayjs())
        ? 'pending'
        : 'past';

  return (
    <article className={styles['Root']}>
      <h3 className={styles['Heading']}>
        <Text font="primaryBold" color="secondary">
          {title}
        </Text>
      </h3>
      <ul className={styles['List']}>
        <li className={styles['ListItem']}>
          <div className={styles['ListItemIconContainer']}>
            <Icon isCentered={false} type="Person" />
          </div>
          <p className={styles['ListItemTextContainer']}>
            <Text>{getDisplayName(organizedBy)}</Text>
            <br />
            <Text font="primaryItalic" size="small">
              created {dayjs(created).fromNow()}
            </Text>
          </p>
        </li>
        <li className={styles['ListItem']}>
          <div className={styles['ListItemIconContainer']}>
            <Icon isCentered={false} type="LocationOn" />
          </div>
          <p className={styles['ListItemTextContainer']}>
            <Text>{location}</Text>
          </p>
        </li>
        <li className={styles['ListItem']}>
          <div className={styles['ListItemIconContainer']}>
            <Icon isCentered={false} type="Description" />
          </div>
          <p className={styles['ListItemTextContainer']}>
            <Text>{comment}</Text>
          </p>
        </li>
        <li className={styles['ListItem']}>
          <div className={styles['ListItemIconContainer']}>
            <Icon isCentered={false} type="Timelapse" />
          </div>
          <p className={styles['ListItemTextContainer']}>
            <Text>{`Will last ${dayjs
              .duration(duration, 'minutes')
              .asHours()} hours`}</Text>
          </p>
        </li>
        <li className={styles['ListItem']}>
          <div className={styles['ListItemIconContainer']}>
            {status === 'notYetScheduled' && (
              <Icon isCentered={false} type="EditCalendar" />
            )}
            {status === 'pending' && <Icon isCentered={false} type="Event" />}
            {status === 'past' && (
              <Icon isCentered={false} type="EventAvailable" />
            )}
          </div>
          <p className={styles['ListItemTextContainer']}>
            {status === 'notYetScheduled' && <Text>Not scheduled yet</Text>}
            {status === 'pending' && (
              <Text>{`Scheduled for ${dayjs(chosenInterval?.start).format(
                'MMM D, YYYY'
              )}`}</Text>
            )}
            {status === 'past' && (
              <Text>{`Ended for ${dayjs(chosenInterval?.end).fromNow()}`}</Text>
            )}
          </p>
        </li>
      </ul>
    </article>
  );
};

export default EventTile;
