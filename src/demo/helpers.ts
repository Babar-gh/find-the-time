import dayjs from 'dayjs';
import { sample, shuffle } from 'lodash';
import { v4 as getUuid } from 'uuid';
import { DATETIME_DEFAULT } from 'constants/formats';
import { Guid } from 'types/common';
import { IApiUser } from 'api/types/events';
import { adjectives, names } from './templates/users';
import { EVENTS_QUANTITY, PARTICIPANTS_MAX } from './constants';
import { IDemoUserCreationRequest } from './api';
import { info, locations } from './templates/events';
import { schedules } from './templates/schedules';

export const getDemoUser = (): IApiUser => {
  const id = getUuid();

  return {
    id: id as Guid,
    email: `${id}@demo.com`,
    name: `${sample(adjectives)} ${sample(names)}`,
  };
};

export const getDemoEvent = (
  demoOwner: IApiUser,
  extras: IApiUser[],
  demoOwnerIsOrganizer: boolean,
  isScheduled: boolean
) => {
  const { subscriptions, chosenInterval, duration } =
    sample(schedules) || schedules[0];

  const participants = shuffle(extras).slice(0, subscriptions.length - 1);

  if (demoOwnerIsOrganizer) {
    participants.unshift(demoOwner);
  } else {
    participants.push(demoOwner);
  }

  const randomSchedule = {
    subscriptions: subscriptions.map(({ availability }, index) => ({
      user: participants[index],
      availability,
    })),
    organizedBy: participants[0],
    created: dayjs()
      .subtract(Math.random() * 10000, 'minutes')
      .format(DATETIME_DEFAULT),
    chosenInterval: isScheduled ? chosenInterval : null,
    duration,
  };

  const randomInfo = sample(info) || info[0];

  const randomLocation = sample(locations) || locations[0];

  return {
    ...randomSchedule,
    ...randomInfo,
    location: randomLocation,
  };
};

export const getDemoContent = (): IDemoUserCreationRequest => {
  const [loginUser, ...users] = [...new Array(PARTICIPANTS_MAX)].map(() =>
    getDemoUser()
  );

  const events = [...new Array(EVENTS_QUANTITY)].map((_, index, { length }) =>
    getDemoEvent(loginUser, users, index > length / 2, index % 2 === 0)
  );

  return {
    loginUser,
    users,
    events,
  };
};
