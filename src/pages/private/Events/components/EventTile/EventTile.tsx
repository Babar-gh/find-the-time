import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ComponentProps } from 'react';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { getDisplayName } from 'helpers/users/getDisplayName';
import { IEvent } from 'api/types/events';
import styles from './EventTile.module.scss';

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface IListItemProps {
  icon: ComponentProps<typeof Icon>['type'];
}

const ListItem: React.FC<IListItemProps> = ({ icon, children }) => {
  return (
    <li className={styles['ListItem']}>
      <div className={styles['ListItemIconContainer']}>
        <Icon isCentered={false} type={icon} />
      </div>
      <p className={styles['ListItemTextContainer']}>{children}</p>
    </li>
  );
};

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
        <ListItem icon="Person">
          <Text clamp={1}>{getDisplayName(organizedBy)}</Text>
          <br />
          <Text font="primaryItalic" size="small">
            created {dayjs(created).fromNow()}
          </Text>
        </ListItem>
        <ListItem icon="LocationOn">
          <Text clamp={1}>{location}</Text>
        </ListItem>
        <ListItem icon="Description">
          <Text clamp={3}>{comment}</Text>
        </ListItem>
        <ListItem icon="Timelapse">
          <Text>{`Will last ${dayjs
            .duration(duration, 'minutes')
            .humanize()}`}</Text>
        </ListItem>
        {status === 'notYetScheduled' && (
          <ListItem icon="EditCalendar">
            <Text>Not scheduled yet</Text>
          </ListItem>
        )}
        {status === 'pending' && (
          <ListItem icon="Event">
            <Text>{`Scheduled for ${dayjs(chosenInterval?.start).format(
              'MMM D, YYYY'
            )}`}</Text>
          </ListItem>
        )}
        {status === 'past' && (
          <ListItem icon="EventAvailable">
            <Text>{`Ended for ${dayjs(chosenInterval?.end).fromNow()}`}</Text>
          </ListItem>
        )}
      </ul>
    </article>
  );
};

export default EventTile;
