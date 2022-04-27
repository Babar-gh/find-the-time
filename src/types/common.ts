import { Dayjs } from 'dayjs';

export type Guid = string & { _type: 'Guid' };
export type Token = string & { _type: 'Token' };

export type TimeInterval = { start: Dayjs; end: Dayjs };
