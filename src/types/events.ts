import { IApiEvent } from 'api/types/events';
import { IUser } from './users';
import { TimeInterval } from './common';

export type Subscription = {
  user: IUser;
  availability: TimeInterval[];
};

export interface IEvent extends Omit<IApiEvent, 'subscriptions'> {
  subscriptions: Subscription[];
}

export type Status = 'notYetScheduled' | 'pending' | 'past';

export type Role = 'organizer' | 'subscriber' | 'visitor';
