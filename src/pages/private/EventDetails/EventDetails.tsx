import { Dayjs } from 'dayjs';
import { To, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Button from 'ui-kit/Button';
import Page from 'ui-kit/Page';
import Scroll from 'ui-kit/Scroll';
import Subscriptions from 'components/Subscriptions';
import { DATETIME_DEFAULT } from 'constants/formats';
import { getStatus, getUserRole } from 'helpers/events';
import { Guid, TimeInterval } from 'types/common';
import { IEvent } from 'types/events';
import { IUser } from 'types/users';
import { PARAM, PRIVATE } from 'constants/routes';
import { useAppSelector } from 'store/hooks';
import {
  chooseEventInterval,
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
import IntervalChoiceModal from './components/IntervalChoiceModal';
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

  const [intervalChoiceModalIsOpen, setIntervalChoiceModalIsOpen] =
    useState(false);
  const [intervalChoiceConstraints, setIntervalChoiceConstraints] =
    useState<TimeInterval>();

  const [eventStart, setEventStart] = useState<Dayjs | null>(null);
  const eventEnd =
    details && eventStart ? eventStart.add(details.duration, 'minutes') : null;

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
    try {
      await removeEvent(eventId as Guid);

      navigate(PRIVATE.Events);
    } catch {
      // TODO: Replace with a proper error handling
    }
  };

  const handleUserRemoval = async (user: IUser) => {
    try {
      await removeUserFromEvent(eventId as Guid, user.id);

      fetchDetails();
    } catch {
      // TODO: Replace with a proper error handling
    }
  };

  const handleIntervalChoice = ({ start, end }: TimeInterval) => {
    if (!details) {
      return;
    }

    const constraints = {
      start,
      end: end.subtract(details.duration, 'minutes'),
    };

    setIntervalChoiceConstraints(constraints);
    setEventStart(constraints.start);

    setIntervalChoiceModalIsOpen(true);
  };

  const handleIntervalChoiceModalConfirm = async () => {
    if (!eventStart || !eventEnd) {
      return;
    }

    const chosenInterval = {
      start: eventStart.format(DATETIME_DEFAULT),
      end: eventEnd.format(DATETIME_DEFAULT),
    };

    try {
      await chooseEventInterval(eventId as Guid, { chosenInterval });

      setIntervalChoiceModalIsOpen(false);
      fetchDetails();
    } catch {
      // TODO: Replace with a proper error handling
    }
  };

  const handleUnsubscribeButtonClick = async () => {
    try {
      await unsubscribeFromEvent(eventId as Guid);

      fetchDetails();
    } catch {
      // TODO: Replace with a proper error handling
    }
  };

  return (
    <Page title={details?.title || ''} {...{ isLoading, navigateBackTo }}>
      {details && role && status && (
        <>
          <div className={styles['Tiles']}>
            <OrganizedBy
              organizedBy={details.organizedBy}
              isThisUser={role === 'organizer'}
            />
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
                  onIntervalChoice={
                    role === 'organizer' && status === 'notYetScheduled'
                      ? handleIntervalChoice
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
          <IntervalChoiceModal
            isOpen={intervalChoiceModalIsOpen}
            onConfirm={handleIntervalChoiceModalConfirm}
            onCancel={() => setIntervalChoiceModalIsOpen(false)}
            pickerProps={{
              value: eventStart,
              onChange: (value) => setEventStart(value),
              constraints: intervalChoiceConstraints,
            }}
            eventEnd={eventEnd}
          />
        </>
      )}
    </Page>
  );
};

export default EventDetails;
