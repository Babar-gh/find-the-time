import { IEventSearchRequest } from 'api/types/events';

export type Action =
  | { type: 'pickNextPage' }
  | { type: 'applyFilter'; payload: IEventSearchRequest['filter'] }
  | { type: 'applySorter'; payload: IEventSearchRequest['sorter'] };

export type Payload<T extends Action['type']> = Extract<
Action,
{ type: T; payload: any }
>['payload'];
