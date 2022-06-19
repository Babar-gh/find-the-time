import { Dayjs } from 'dayjs';
import { To, useNavigate, useParams } from 'react-router-dom';
import { ComponentProps, useCallback, useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifyOnNetworkError } from 'store/slices/notifications';
import {
  chooseEventInterval,
  getEventDetails,
  removeEvent,
  removeUserFromEvent,
  subscribeToEvent,
  unsubscribeFromEvent,
} from 'api/events';
import ConfirmationModal from 'components/ConfirmationModal';
import InfoTile from 'components/InfoTile';
import { convertToIEvent } from 'types/converters/toClientTypes';
import { convertToIApiTimeInterval } from 'types/converters/toApiTypes';
import { LocationState } from '../NotFound';
import Comment from './components/Comment';
import Duration from './components/Duration';
import IntervalChoiceModal from './components/IntervalChoiceModal';
import Location from './components/Location';
import OrganizedBy from './components/OrganizedBy';
import ShareModal from './components/ShareModal';
import Status from './components/Status';
import styles from './EventDetails.module.scss';
import VisitorAvailabilityModal from './components/VisitorAvailabilityModal/VisitorAvailabilityModal';

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
  const dispatch = useAppDispatch();

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

  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ComponentProps<typeof ConfirmationModal> | null>(null);

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

  const handleDeleteConfirmation = async () => {
    setConfirmationModalProps(null);
    setIsLoading(true);

    try {
      await removeEvent(eventId as Guid);

      setIsLoading(false);

      navigate(PRIVATE.Events);
    } catch (error) {
      setIsLoading(false);

      dispatch(notifyOnNetworkError('delete the event', error));
    }
  };

  const handleDeleteButtonClick = () =>
    setConfirmationModalProps({
      title: 'Remove Event',
      action: 'remove this event',
      onConfirm: handleDeleteConfirmation,
      onCancel: () => setConfirmationModalProps(null),
    });

  const removeUser = async (user: IUser) => {
    setConfirmationModalProps(null);
    setIsLoading(true);

    try {
      await removeUserFromEvent(eventId as Guid, user.id);

      fetchDetails();
    } catch (error) {
      dispatch(notifyOnNetworkError('remove this user', error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserRemoval = (user: IUser) =>
    setConfirmationModalProps({
      title: 'Remove Participant',
      action: 'remove this user from participation in the event',
      onConfirm: () => removeUser(user),
      onCancel: () => setConfirmationModalProps(null),
    });

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
    } catch (error) {
      dispatch(notifyOnNetworkError('schedule the event', error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribeConfirmation = async () => {
    setConfirmationModalProps(null);
    setIsLoading(true);

    try {
      await unsubscribeFromEvent(eventId as Guid);

      fetchDetails();
    } catch (error) {
      dispatch(notifyOnNetworkError('unsubscribe you', error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribeButtonClick = () =>
    setConfirmationModalProps({
      title: 'Unsubscribe',
      action: 'revoke your participation in this event',
      onConfirm: handleUnsubscribeConfirmation,
      onCancel: () => setConfirmationModalProps(null),
    });

  const handleVisitorAvailabilityModalConfirm = (availabile: TimeInterval) => {
    setVisitorAvailabilityModalIsOpen(false);
    setVisitorAvailabilities((current) => [...current, availabile]);
  };

  const handleSubscribeButtonClick = async () => {
    const availableAt = visitorAvailabilities.map((interval) =>
      convertToIApiTimeInterval(interval)
    );

    setIsLoading(true);

    try {
      await subscribeToEvent(eventId as Guid, { availableAt });

      setVisitorAvailabilities([]);

      fetchDetails();
    } catch (error) {
      dispatch(notifyOnNetworkError('subscribe you', error));
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

  const handleShareButtonClick = () => setShareModalIsOpen(true);

  const subscribeButtonIsShown =
    role === 'visitor' &&
    status === 'notYetScheduled' &&
    Boolean(visitorAvailabilities.length);

  const clearSelectionButtonIsShown = subscribeButtonIsShown;

  const unsubscribeButtonIsShown =
    role === 'subscriber' && status === 'notYetScheduled';

  const deleteButtonIsShown =
    role === 'organizer' && status === 'notYetScheduled';

  return (
    <Page
      title={details?.title || ''}
      isLoading={isLoading}
      navigateBackTo={navigateBackTo}
      headerAddon={
        <Button
          leftIcon="Share"
          elementProps={{ onClick: handleShareButtonClick }}
        >
          Share
        </Button>
      }
    >
      {details && role && status && (
        <>
          {intervalChoiceModalIsOpen && (
            <IntervalChoiceModal
              onConfirm={handleIntervalChoiceModalConfirm}
              onCancel={() => setIntervalChoiceModalIsOpen(false)}
              pickerProps={{
                value: eventStart,
                onChange: (value) => setEventStart(value),
                constraints: intervalChoiceConstraints,
              }}
              eventEnd={eventEnd}
            />
          )}
          {visitorAvailabilityConstraints && visitorAvailabilityModalIsOpen && (
            <VisitorAvailabilityModal
              onConfirm={handleVisitorAvailabilityModalConfirm}
              onCancel={() => setVisitorAvailabilityModalIsOpen(false)}
              currentAvailabilities={visitorAvailabilities}
              constraints={visitorAvailabilityConstraints}
              duration={details.duration}
            />
          )}
          {shareModalIsOpen && (
            <ShareModal
              onCopy={() => setShareModalIsOpen(false)}
              onCancel={() => setShareModalIsOpen(false)}
            />
          )}
          {confirmationModalProps && (
            <ConfirmationModal {...confirmationModalProps} isDangerous />
          )}
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
                  scheduledFor={details.chosenInterval}
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
          <div className={styles['Buttons']}>
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
        </>
      )}
    </Page>
  );
};

export default EventDetails;
