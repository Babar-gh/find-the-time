import { IEventSearchRequest, IEventSearchResponse } from 'api/types/events';
import { IEvent } from 'types/events';

export interface IState extends IEventSearchRequest {
  items: Omit<IEvent, 'subscriptions'>[];
  totalItems: IEventSearchResponse['totalItems'] | null;
  pageSize: number;
  isLoading: boolean;
}

export type Action =
  | { type: 'pickNextPage' }
  | { type: 'applyFilter'; payload: Partial<IState['filter']> }
  | { type: 'applySorter'; payload: Partial<IState['sorter']> }
  | { type: 'parseResponse'; payload: IEventSearchResponse }
  | { type: 'setIsLoading'; payload: IState['isLoading'] };

export type Payload<T extends Action['type']> = Extract<
Action,
{ type: T; payload: any }
>['payload'];
