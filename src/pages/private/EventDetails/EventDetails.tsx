import { To, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Page from 'ui-kit/Page';
import Subscriptions from 'components/Subscriptions';
import { getEventDetails } from 'api/events';
import { Guid } from 'types/common';
import { IEvent } from 'types/events';
import { LocationState } from 'types/location';
import { PARAM, PRIVATE } from 'constants/routes';
import { useAppSelector } from 'store/hooks';
import Comment from './components/Comment';
import Duration from './components/Duration';
import Location from './components/Location';
import OrganizedBy from './components/OrganizedBy';
import Status from './components/Status';
import styles from './EventDetails.module.scss';
import { convertToIEvent } from './helpers';

interface IProps {
  navigateBackTo: To;
}

const notFoundPageConfig: LocationState = {
  title: 'Event Not Found',
  message: 'We couldn’t find this event. Sorry about that.',
  returnUrl: PRIVATE.Events,
  returnButtonText: 'Go to events',
};

const EventDetails: React.VFC<IProps> = ({ navigateBackTo }) => {
  const navigate = useNavigate();

  const { eventId } = useParams<PARAM.EventId>();

  const [details, setDetails] = useState<IEvent>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const account = useAppSelector((store) => store.account);
  const isOrganizer = details?.organizedBy.id === account.id;

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);

      try {
        const response = await getEventDetails(eventId as Guid);
        const parsed = convertToIEvent(response.data);

        setDetails(parsed);

        setIsLoading(false);
      } catch {
        setIsLoading(false);

        navigate(PRIVATE.NotFound, { state: notFoundPageConfig });
      }
    };

    fetchDetails();
  }, [eventId, navigate]);

  return (
    <Page title={details?.title || ''} {...{ isLoading, navigateBackTo }}>
      {details && (
        <>
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
            <Comment comment={details.comment} />
          </div>
          <div className={styles['Subscriptions']}>
            <Subscriptions subscriptions={details.subscriptions} />
          </div>
        </>
      )}
    </Page>
  );
};

export default EventDetails;
