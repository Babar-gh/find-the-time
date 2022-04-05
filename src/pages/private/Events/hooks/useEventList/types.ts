import { IEventSearchRequest, IEventSearchResponse } from 'api/types/events';

export interface IState
  extends IEventSearchRequest,
  Pick<IEventSearchResponse, 'items'> {
  totalItems: IEventSearchResponse['totalItems'] | null;
  pageSize: number;
  isLoading: boolean;
}

export type Action =
  | { type: 'pickNextPage' }
  | { type: 'applyFilter'; payload: IState['filter'] }
  | { type: 'applySorter'; payload: IState['sorter'] }
  | { type: 'parseResponse'; payload: IEventSearchResponse }
  | { type: 'setIsLoading'; payload: IState['isLoading'] };

export type Payload<T extends Action['type']> = Extract<
Action,
{ type: T; payload: any }
>['payload'];
