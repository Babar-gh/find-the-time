import { Guid } from 'types/common';
import { ISearchConstraints, ISearchResult } from './common';

interface ITimeInterval {
  start: string;
  end: string;
}

export interface IApiUser {
  id: Guid;
  email: string;
  name: string;
}

export interface IApiEvent {
  id: Guid;
  title: string;
  duration: number;
  location: string;
  comment: string;
  created: string;
  organizedBy: IApiUser;
  subscriptions: {
    user: IApiUser;
    availability: ITimeInterval[];
  }[];
  chosenInterval: ITimeInterval | null;
}

type EventStatus = 'pending' | 'past';

interface IEventFilter {
  isOrganizer: boolean | null;
  title: string | null;
  location: string | null;
  status: EventStatus | null;
}

type EventSortableBy = 'created' | 'chosenInterval' | 'subscriptions';

export interface IEventSearchRequest
  extends ISearchConstraints<IEventFilter, EventSortableBy> {}

export interface IEventSearchResponse
  extends ISearchResult<Omit<IApiEvent, 'subscriptions'>> {}

export interface IEventDetailsResponse extends IApiEvent {}

export interface IEventCreationRequest
  extends Pick<IApiEvent, 'title' | 'duration' | 'location' | 'comment'> {
  initialIntervals: ITimeInterval[];
}

export interface IEventCreationResponse {
  id: Guid;
}

export interface IEventSubscriptionRequest {
  availableAt: ITimeInterval[];
}

export interface IEventIntervalsChoiceRequest
  extends Pick<IApiEvent, 'chosenInterval'> {}
