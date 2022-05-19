import { To, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Page from 'ui-kit/Page';
import Subscriptions from 'components/Subscriptions';
import { getEventDetails } from 'api/events';
import { Guid } from 'types/common';
import { IEvent } from 'types/events';
import { PARAM } from 'constants/routes';
import { convertToIEvent } from './helpers';
import styles from './EventDetails.module.scss';

interface IProps {
  navigateBackTo: To;
}

const EventDetails: React.VFC<IProps> = ({ navigateBackTo }) => {
  const { eventId } = useParams<PARAM.EventId>();

  const [details, setDetails] = useState<IEvent>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getEventDetails(eventId as Guid);
        const parsed = convertToIEvent(response.data);

        setDetails(parsed);
      } catch {
        // TODO: Replace with a proper error handling
      }
    };

    fetchDetails();
  }, [eventId]);

  return details ? (
    <Page title={details.title} navigateBackTo={navigateBackTo}>
      <div className={styles['Subscriptions']}>
        <Subscriptions subscriptions={details.subscriptions} />
      </div>
    </Page>
  ) : (
    <Page title="" isLoading />
  );
};

export default EventDetails;
