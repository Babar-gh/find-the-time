import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import Text from 'components/Text';
import Icon from 'ui-kit/Icon';
import { getDisplayName } from 'helpers/users';
import { getStatus, getStatusIcon } from 'helpers/events';
import { IEvent, Status } from 'types/events';
import styles from './EventTile.module.scss';

const cn = classNames.bind(styles);

type Color = 'accentPrimary' | 'accentSecondary' | 'faded';
type MappedColors = { [Key in Status]: Color };

const colorsMappedToStatus: MappedColors = {
  notYetScheduled: 'accentPrimary',
  pending: 'accentSecondary',
  past: 'faded',
};

interface IListItemProps {
  icon: ComponentProps<typeof Icon>['type'];
  color?: 'default' | Color;
}

const ListItem: React.FC<IListItemProps> = ({
  icon,
  color = 'default',
  children,
}) => {
  return (
    <li className={cn('ListItem', `ListItem_color_${color}`)}>
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
          <Text>{`${status === 'past' ? 'Lasted' : 'Will last'} ${dayjs
            .duration(duration, 'minutes')
            .humanize()}`}</Text>
        </ListItem>
        <ListItem
          icon={getStatusIcon(status)}
          color={colorsMappedToStatus[status]}
        >
          {status === 'notYetScheduled' && (
            <Text color="inherit">Not scheduled yet</Text>
          )}
          {status === 'pending' && (
            <Text color="inherit">
              Scheduled for {dayjs(chosenInterval?.start).format('MMM D, YYYY')}
            </Text>
          )}
          {status === 'past' && (
            <Text color="inherit">
              Ended {dayjs(chosenInterval?.end).fromNow()}
            </Text>
          )}
        </ListItem>
      </ul>
    </article>
  );
};

export default EventTile;
