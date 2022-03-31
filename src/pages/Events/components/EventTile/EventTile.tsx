import { IEvent } from 'api/types/events';
import Text from 'components/Text';
import styles from './EventTile.module.scss';

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
  return (
    <article className={styles['Root']}>
      <h3>
        <Text>{title}</Text>
      </h3>
      <p>
        {/* TODO: Replace with a helper function for getting user display name */}
        <Text>{organizedBy.name}</Text>
      </p>
      <p>
        <Text>{`${created}, ${location}`}</Text>
      </p>
      <p>
        <Text>{comment}</Text>
      </p>
      <p>
        <Text>{duration.toString()}</Text>
      </p>
      {chosenInterval && (
        <p>
          <Text>{`From ${chosenInterval.start} to ${chosenInterval.end} `}</Text>
        </p>
      )}
    </article>
  );
};

export default EventTile;
