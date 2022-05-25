import dayjs from 'dayjs';
import { DATETIME_DEFAULT } from 'constants/formats';
import { IApiTimeInterval, IEventDetailsResponse } from 'api/types/events';
import { IEvent } from 'types/events';
import { TimeInterval } from 'types/common';

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

export const convertToIApiTimeIntervalArray = (
  toConvert: TimeInterval[]
): IApiTimeInterval[] =>
  toConvert.map(({ start, end }) => ({
    start: start.format(DATETIME_DEFAULT),
    end: end.format(DATETIME_DEFAULT),
  }));
