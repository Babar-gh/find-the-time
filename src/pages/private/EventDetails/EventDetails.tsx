import { To, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Page from 'ui-kit/Page';
import Subscriptions from 'components/Subscriptions';
import Text from 'components/Text';
import { getEventDetails } from 'api/events';
import { Guid } from 'types/common';
import { IEvent } from 'types/events';
import { PARAM } from 'constants/routes';
import { useAppSelector } from 'store/hooks';
import Duration from './components/Duration';
import InfoTile from './components/InfoTile';
import Location from './components/Location';
import OrganizedBy from './components/OrganizedBy';
import Status from './components/Status';
import styles from './EventDetails.module.scss';
import { convertToIEvent } from './helpers';

interface IProps {
  navigateBackTo: To;
}

const EventDetails: React.VFC<IProps> = ({ navigateBackTo }) => {
  const { eventId } = useParams<PARAM.EventId>();

  const [details, setDetails] = useState<IEvent>();

  const account = useAppSelector((store) => store.account);
  const isOrganizer = details?.organizedBy.id === account.id;

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

  if (details) {
    return (
      <Page title={details.title} navigateBackTo={navigateBackTo}>
        <div className={styles['Tiles']}>
          <OrganizedBy
            organizedBy={details.organizedBy}
            isOrganizer={isOrganizer}
          />
          <Location location={details.location} />
          <Duration duration={details.duration} />
          <Status
            chosenInterval={details.chosenInterval}
            isOrganizer={isOrganizer}
          />
          <InfoTile heading="Comment" icon="Description">
            <Text>{details.comment}</Text>
          </InfoTile>
        </div>
        <div className={styles['Subscriptions']}>
          <Subscriptions subscriptions={details.subscriptions} />
        </div>
      </Page>
    );
  } else {
    return <Page title="" isLoading />;
  }
};

export default EventDetails;
