import { Guid } from 'types/common';
import { IUser } from 'types/user';
import { ISearchConfig, ISearchResult, SortDirection } from './common';

interface ITimeInterval {
  start: string;
  end: string;
}

interface IEvent {
  id: Guid;
  title: string;
  duration: number;
  location: string;
  comment: string;
  created: string;
  organizedBy: IUser;
  subscriptions: {
    user: IUser;
    availability: ITimeInterval[];
  }[];
  chosenInterval: ITimeInterval | null;
}

type EventStatus = 'pending' | 'past';
type EventSortableBy = 'created' | 'chosenInterval' | 'initialIntervals';

interface IEventSearchFilter {
  isOrganizer: boolean | null;
  title: string | null;
  location: string | null;
  status: EventStatus[] | null;
}

interface IEventSearchSorter {
  sortBy: EventSortableBy;
  direction: SortDirection;
}

export interface IEventSearchRequest
  extends ISearchConfig<IEventSearchFilter, IEventSearchSorter> {}

export interface IEventSearchResponse
  extends ISearchResult<Omit<IEvent, 'subscriptions'>> {}

export interface IEventDetailsResponse extends IEvent {}

export interface IEventCreationRequest
  extends Pick<IEvent, 'title' | 'duration' | 'location' | 'comment'> {
  initialIntervals: ITimeInterval[];
}

export interface IEventCreationResponse {
  id: Guid;
}

export interface IEventSubscriptionRequest {
  availableAt: ITimeInterval[];
}

export interface IEventIntervalsChoiceRequest
  extends Pick<IEvent, 'chosenInterval'> {}
