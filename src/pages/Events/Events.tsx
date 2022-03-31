import Page from 'ui-kit/Page';
import EventTile from './components/EventTile';
import { DUMMY_RESPONSE_DATA } from './dummyResponseData';
import styles from './Events.module.scss';

const Events: React.VFC = () => {
  return (
    <Page title="Events">
      <div className={styles['EventList']}>
        {DUMMY_RESPONSE_DATA.items.map(({ id, ...rest }) => {
          return <EventTile key={id} id={id} {...rest} />;
        })}
      </div>
    </Page>
  );
};

export default Events;
