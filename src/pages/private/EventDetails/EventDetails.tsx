import dayjs from 'dayjs';
import { To, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Page from 'ui-kit/Page';
import Separator from 'ui-kit/Separator';
import Subscriptions from 'components/Subscriptions';
import Text from 'components/Text';
import { getEventDetails } from 'api/events';
import { getStatus, getStatusIcon } from 'helpers/events';
import { Guid } from 'types/common';
import { IEvent } from 'types/events';
import { PARAM } from 'constants/routes';
import { useAppSelector } from 'store/hooks';
import { convertToIEvent } from './helpers';
import styles from './EventDetails.module.scss';
import OrganizedBy from './components/OrganizedBy';
import InfoTile from './components/InfoTile';

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
    const status = getStatus(details.chosenInterval);

    return (
      <Page title={details.title} navigateBackTo={navigateBackTo}>
        <div className={styles['Tiles']}>
          <OrganizedBy
            organizedBy={details.organizedBy}
            isOrganizer={isOrganizer}
          />
          <InfoTile heading="Location" icon="LocationOn">
            <Text>{details.location}</Text>
          </InfoTile>
          <InfoTile heading="Duration" icon="Timelapse">
            <Text>
              {dayjs.duration(details.duration, 'minutes').humanize()}
            </Text>
          </InfoTile>
          <InfoTile heading="Status" icon={getStatusIcon(status)}>
            {status === 'notYetScheduled' && (
              <>
                <Text>Not scheduled yet</Text>
                <Separator context="menu" />
                <Text font="primaryItalic" size="small">
                  {isOrganizer
                    ? 'You can pick the time when everyone is subscribed!'
                    : 'The event organizer will pick the time when everyone is subscribed!'}
                </Text>
              </>
            )}
            {status === 'pending' && (
              <>
                <Text>
                  Scheduled for{' '}
                  {dayjs(details.chosenInterval?.start).format('MMM D, YYYY')}
                </Text>
                <Separator context="menu" />
                <Text font="primaryItalic" size="small">
                  Will start in {dayjs(details.chosenInterval?.start).toNow()}
                </Text>
              </>
            )}
            {status === 'past' && (
              <>
                <Text>
                  Was scheduled for{' '}
                  {dayjs(details.chosenInterval?.start).format('MMM D, YYYY')}
                </Text>
                <Separator context="menu" />
                <Text font="primaryItalic" size="small">
                  Ended {dayjs(details.chosenInterval?.end).fromNow()} ago
                </Text>
              </>
            )}
          </InfoTile>
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
