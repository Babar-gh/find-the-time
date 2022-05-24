import { To, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Button from 'ui-kit/Button';
import Page from 'ui-kit/Page';
import Scroll from 'ui-kit/Scroll';
import Subscriptions from 'components/Subscriptions';
import { getStatus, getUserRole } from 'helpers/events';
import { Guid } from 'types/common';
import { IEvent } from 'types/events';
import { IUser } from 'types/users';
import { PARAM, PRIVATE } from 'constants/routes';
import { useAppSelector } from 'store/hooks';
import {
  getEventDetails,
  removeEvent,
  removeUserFromEvent,
  unsubscribeFromEvent,
} from 'api/events';
import { LocationState } from '../NotFound';
import { convertToIEvent } from './helpers';
import styles from './EventDetails.module.scss';
import Status from './components/Status';
import OrganizedBy from './components/OrganizedBy';
import Location from './components/Location';
import InfoTile from './components/InfoTile';
import Duration from './components/Duration';
import Comment from './components/Comment';

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

  const role = details ? getUserRole(details, account) : null;
  const status = details ? getStatus(details?.chosenInterval) : null;

  const fetchDetails = useCallback(async () => {
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
  }, [eventId, navigate]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleDeleteButtonClick = async () => {
    await removeEvent(eventId as Guid);

    navigate(PRIVATE.Events);
  };

  const handleUserRemoval = async (user: IUser) => {
    await removeUserFromEvent(eventId as Guid, user.id);

    fetchDetails();
  };

  const handleUnsubscribeButtonClick = async () => {
    await unsubscribeFromEvent(eventId as Guid);

    fetchDetails();
  };

  return (
    <Page title={details?.title || ''} {...{ isLoading, navigateBackTo }}>
      {details && role && status && (
        <>
          <div className={styles['Tiles']}>
            <OrganizedBy organizedBy={details.organizedBy} role={role} />
            <Location location={details.location} />
            <Duration duration={details.duration} />
            <Status
              chosenInterval={details.chosenInterval}
              role={role}
              status={status}
            />
            <Comment comment={details.comment} />
          </div>
          <div className={styles['Subscriptions']}>
            <InfoTile icon="People" heading="Participants">
              <Scroll axis="horizontal">
                <Subscriptions
                  subscriptions={details.subscriptions}
                  onUserRemoval={
                    role === 'organizer' && status !== 'past'
                      ? handleUserRemoval
                      : undefined
                  }
                />
              </Scroll>
            </InfoTile>
          </div>
          <div>
            {role === 'subscriber' && status === 'notYetScheduled' && (
              <Button
                theme="danger"
                elementProps={{ onClick: handleUnsubscribeButtonClick }}
              >
                Unsubscribe
              </Button>
            )}
            {role === 'organizer' && status !== 'past' && (
              <Button
                theme="danger"
                elementProps={{ onClick: handleDeleteButtonClick }}
              >
                Delete
              </Button>
            )}
          </div>
        </>
      )}
    </Page>
  );
};

export default EventDetails;
