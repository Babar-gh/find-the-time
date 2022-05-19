import { To, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Page from 'ui-kit/Page';
import Subscriptions from 'components/Subscriptions';
import { getEventDetails } from 'api/events';
import { Guid } from 'types/common';
import { IEvent } from 'types/events';
import { PARAM } from 'constants/routes';
import styles from './EventDetails.module.scss';
import { parseDatetimes } from './helpers';

interface IProps {
  navigateBackTo: To;
}

const EventDetails: React.VFC<IProps> = ({ navigateBackTo }) => {
  const { eventId } = useParams<PARAM.EventId>();

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
    <Page title={details?.title || ''} navigateBackTo={navigateBackTo}>
      {details?.subscriptions && (
        <div className={styles['Subscriptions']}>
          <Subscriptions subscriptions={details.subscriptions} />
        </div>
      )}
    </Page>
  );
};

export default EventDetails;
