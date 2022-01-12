import axios from 'axios';
import { Guid } from 'types/common';
import { API_ROOT_PATH } from './constants/path';
import {
  IEventSearchRequest,
  IEventSearchResponse,
  IEventDetailsResponse,
  IEventCreationRequest,
  IEventCreationResponse,
  IEventSubscriptionRequest,
  IEventIntervalsChoiceRequest,
} from './types/events';

const baseUrl = `${API_ROOT_PATH}/events`;

export const searchEvents = (config: IEventSearchRequest) =>
  axios.post<IEventSearchResponse>(`${baseUrl}`, config);

export const getEventDetails = (id: Guid) =>
  axios.get<IEventDetailsResponse>(`${baseUrl}`, {
    params: {
      event_id: id,
    },
  });

export const createEvent = (eventDetails: IEventCreationRequest) =>
  axios.post<IEventCreationResponse>(`${baseUrl}/new`, eventDetails);

export const subscribeToEvent = (
  id: Guid,
  intervals: IEventSubscriptionRequest
) =>
  axios.post(`${baseUrl}/subscribe`, intervals, {
    params: {
      event_id: id,
    },
  });

export const unsubscribeFromEvent = (id: Guid) =>
  axios.post(
    `${baseUrl}/unsubscribe`,
    {},
    {
      params: {
        event_id: id,
      },
    }
  );

export const chooseEventIntervals = (
  id: Guid,
  intervals: IEventIntervalsChoiceRequest
) =>
  axios.post(`${baseUrl}/choose-interval`, intervals, {
    params: {
      event_id: id,
    },
  });

export const removeUserFromEvent = (eventId: Guid, userId: Guid) =>
  axios.post(
    `${baseUrl}/remove-subscription`,
    {},
    {
      params: {
        event_id: eventId,
        user_id: userId,
      },
    }
  );

export const removeEvent = (id: Guid) =>
  axios.post(
    `${baseUrl}/remove`,
    {},
    {
      params: {
        event_id: id,
      },
    }
  );
