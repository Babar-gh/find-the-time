import dayjs from 'dayjs';
import { IEvent } from 'types/events';
import { IApiTimeInterval, IEventDetailsResponse } from 'api/types/events';
import { TimeInterval } from 'types/common';

export const convertToTimeInterval = ({
  start,
  end,
}: IApiTimeInterval): TimeInterval => ({
  start: dayjs(start),
  end: dayjs(end),
});

export const convertToIEvent = (toConvert: IEventDetailsResponse): IEvent => {
  const {
    subscriptions: subscriptionsRaw,
    chosenInterval: chosenIntervalRaw,
    ...rest
  } = toConvert;

  const subscriptions = subscriptionsRaw.map(
    ({ user, availability: availabilityRaw }) => {
      const availability = availabilityRaw.map((intervalRaw) =>
        convertToTimeInterval(intervalRaw)
      );

      return { user, availability };
    }
  );

  const chosenInterval = chosenIntervalRaw
    ? convertToTimeInterval(chosenIntervalRaw)
    : null;

  return { subscriptions, chosenInterval, ...rest };
};
