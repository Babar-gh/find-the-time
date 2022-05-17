import dayjs from 'dayjs';
import { IEventDetailsResponse } from 'api/types/events';

export const parseDatetimes = (detailsRaw: IEventDetailsResponse) => {
  const { subscriptions: subscriptionsRaw, ...rest } = detailsRaw;

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
