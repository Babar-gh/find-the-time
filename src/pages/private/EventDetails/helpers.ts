import dayjs from 'dayjs';
import { IEvent } from 'types/events';
import { IEventDetailsResponse } from 'api/types/events';

export const convertToIEvent = (toConvert: IEventDetailsResponse): IEvent => {
  const { subscriptions: subscriptionsRaw, ...rest } = toConvert;

  const subscriptions = subscriptionsRaw.map(
    ({ user, availability: availabilityRaw }) => {
      const availability = availabilityRaw.map(
        ({ start: startRaw, end: endRaw }) => {
          const start = dayjs(startRaw);
          const end = dayjs(endRaw);

          return { start, end };
        }
      );

      return { user, availability };
    }
  );

  return { subscriptions, ...rest };
};
