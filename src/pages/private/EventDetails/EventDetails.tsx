import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from 'ui-kit/Page';
import Subscriptions from 'components/Subscriptions';
import { getEventDetails } from 'api/events';
import { Guid } from 'types/common';
import { IEvent } from 'types/events';
import styles from './EventDetails.module.scss';
import { parseDatetimes } from './helpers';

const EventDetails: React.VFC = () => {
  const { eventId } = useParams();

  const [details, setDetails] = useState<IEvent>();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getEventDetails(eventId as Guid);
      const parsed = parseDatetimes(response.data);

      setDetails(parsed);
    };

    fetchDetails();
  }, [eventId]);

  return (
    <Page title={details?.title || ''}>
      {details?.subscriptions && (
        <div className={styles['Subscriptions']}>
          <Subscriptions subscriptions={details.subscriptions} />
        </div>
      )}
    </Page>
  );
};

export default EventDetails;
