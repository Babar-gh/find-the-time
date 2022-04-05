import { forwardRef } from 'react';
import Text from 'components/Text';
import { IEvent } from 'api/types/events';
import TileTemplate from '../TileTemplate';
import styles from './EventTile.module.scss';

interface IProps extends Omit<IEvent, 'subscriptions'> {}

const EventTile = forwardRef<HTMLElement, IProps>(
  ({ title, created, location, comment, duration, chosenInterval }, ref) => {
    return (
      <TileTemplate>
        <article className={styles['Root']} ref={ref}>
          <h3>
            <Text>{title}</Text>
          </h3>
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
      </TileTemplate>
    );
  }
);

export default EventTile;
