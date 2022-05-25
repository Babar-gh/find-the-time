import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { getDisplayName } from 'helpers/users';
import { getStatus, getStatusIcon } from 'helpers/events';
import { IEvent } from 'types/events';
import styles from './EventTile.module.scss';

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
  const status = getStatus(chosenInterval);

  return (
    <article className={styles['Root']}>
      <h3 className={styles['Heading']}>
        <Text clamp={1} font="primaryBold" color="secondary">
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
          {comment !== '' ? (
            <Text clamp={3}>{comment}</Text>
          ) : (
            <Text font="primaryItalic">No description</Text>
          )}
        </ListItem>
        <ListItem icon="Timelapse">
          <Text>{`Will last ${dayjs
            .duration(duration, 'minutes')
            .humanize()}`}</Text>
        </ListItem>
        <ListItem icon={getStatusIcon(status)}>
          {status === 'notYetScheduled' && <Text>Not scheduled yet</Text>}
          {status === 'pending' && (
            <Text>
              Scheduled for {dayjs(chosenInterval?.start).format('MMM D, YYYY')}
            </Text>
          )}
          {status === 'past' && (
            <Text>Ended {dayjs(chosenInterval?.end).fromNow()}</Text>
          )}
        </ListItem>
      </ul>
    </article>
  );
};

export default EventTile;
