import { IApiEvent, IApiUser } from 'api/types/events';
import { TimeInterval } from './common';

export interface IEvent extends Omit<IApiEvent, 'subscriptions'> {
  subscriptions: {
    user: IApiUser;
    availability: TimeInterval[];
  }[];
}

export type Status = 'notYetScheduled' | 'pending' | 'past';

export type Role = 'organizer' | 'subscriber' | 'visitor';
