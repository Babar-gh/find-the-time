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
  subscribeToEvent,
  unsubscribeFromEvent,
} from 'api/events';
import { LocationState } from '../NotFound';
import Comment from './components/Comment';
import Duration from './components/Duration';
import InfoTile from './components/InfoTile';
import IntervalChoiceModal from './components/IntervalChoiceModal';
import Location from './components/Location';
import OrganizedBy from './components/OrganizedBy';
import Status from './components/Status';
import styles from './EventDetails.module.scss';
import VisitorAvailabilityModal from './components/VisitorAvailabilityModal/VisitorAvailabilityModal';
import { convertToIApiTimeIntervalArray } from './helpers';
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

  const [intervalChoiceModalIsOpen, setIntervalChoiceModalIsOpen] =
    useState(false);
  const [intervalChoiceConstraints, setIntervalChoiceConstraints] =
    useState<TimeInterval>();
  const [eventStart, setEventStart] = useState<Dayjs | null>(null);
  const eventEnd =
    details && eventStart ? eventStart.add(details.duration, 'minutes') : null;

  const [visitorAvailabilityModalIsOpen, setVisitorAvailabilityModalIsOpen] =
    useState(false);
  const [visitorAvailabilityConstraints, setVisitorAvailabilityConstraints] =
    useState<TimeInterval>();
  const [visitorAvailabilities, setVisitorAvailabilities] = useState<
  TimeInterval[]
  >([]);

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
    setIsLoading(true);

    try {
      await removeEvent(eventId as Guid);

      setIsLoading(false);

      navigate(PRIVATE.Events);
    } catch {
      setIsLoading(false);
      // TODO: Add a proper error handling
    }
  };

  const handleUserRemoval = async (user: IUser) => {
    setIsLoading(true);

    try {
      await removeUserFromEvent(eventId as Guid, user.id);

      fetchDetails();
    } catch {
      // TODO: Add a proper error handling
    } finally {
      setIsLoading(false);
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

    setIsLoading(true);

    try {
      await chooseEventInterval(eventId as Guid, { chosenInterval });

      setIntervalChoiceModalIsOpen(false);

      fetchDetails();
    } catch {
      // TODO: Add a proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribeButtonClick = async () => {
    setIsLoading(true);

    try {
      await unsubscribeFromEvent(eventId as Guid);

      fetchDetails();
    } catch {
      // TODO: Add a proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisitorAvailabilityModalConfirm = (availabile: TimeInterval) => {
    setVisitorAvailabilityModalIsOpen(false);
    setVisitorAvailabilities((current) => [...current, availabile]);
  };

  const handleSubscribeButtonClick = async () => {
    const availableAt = convertToIApiTimeIntervalArray(visitorAvailabilities);

    setIsLoading(true);

    try {
      await subscribeToEvent(eventId as Guid, { availableAt });

      setVisitorAvailabilities([]);

      fetchDetails();
    } catch {
      // TODO: Add a proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvailabilityPick = (constrains: TimeInterval) => {
    setVisitorAvailabilityConstraints(constrains);
    setVisitorAvailabilityModalIsOpen(true);
  };

  const handleClearSelectionButtonClick = () => {
    setVisitorAvailabilities([]);
  };

  const subscribeButtonIsShown =
    role === 'visitor' &&
    status === 'notYetScheduled' &&
    Boolean(visitorAvailabilities.length);

  const clearSelectionButtonIsShown = subscribeButtonIsShown;

  const unsubscribeButtonIsShown =
    role === 'subscriber' && status === 'notYetScheduled';

  const deleteButtonIsShown = role === 'organizer' && status !== 'past';

  return (
    <Page title={details?.title || ''} {...{ isLoading, navigateBackTo }}>
      {details && role && status && (
        <>
          <div className={styles['Tiles']}>
            <OrganizedBy
              organizedBy={details.organizedBy}
              isCurrentUser={role === 'organizer'}
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
                  participants={details.subscriptions}
                  visitor={{
                    user: account,
                    availability: visitorAvailabilities,
                  }}
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
                  onAvailabilityPick={
                    role === 'visitor' && status === 'notYetScheduled'
                      ? handleAvailabilityPick
                      : undefined
                  }
                />
              </Scroll>
            </InfoTile>
          </div>
          <div>
            {subscribeButtonIsShown && (
              <Button elementProps={{ onClick: handleSubscribeButtonClick }}>
                Subscribe
              </Button>
            )}
            {clearSelectionButtonIsShown && (
              <Button
                elementProps={{ onClick: handleClearSelectionButtonClick }}
                theme="secondary"
              >
                Clear selected
              </Button>
            )}
            {unsubscribeButtonIsShown && (
              <Button
                theme="danger"
                elementProps={{ onClick: handleUnsubscribeButtonClick }}
              >
                Unsubscribe
              </Button>
            )}
            {deleteButtonIsShown && (
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
          {visitorAvailabilityConstraints && (
            <VisitorAvailabilityModal
              isOpen={visitorAvailabilityModalIsOpen}
              onConfirm={handleVisitorAvailabilityModalConfirm}
              onCancel={() => setVisitorAvailabilityModalIsOpen(false)}
              currentAvailabilities={visitorAvailabilities}
              constraints={visitorAvailabilityConstraints}
              duration={details.duration}
            />
          )}
        </>
      )}
    </Page>
  );
};

export default EventDetails;
