import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HTTP_RESPONSE_STATUS_CODES as STATUS_CODES } from 'api/constants/httpResponseStatusCodes';

const DEFAULT_ERROR_CODE = STATUS_CODES['Internal Server Error'];

interface IState {
  success: string[];
  error: string[];
}

const initialState: IState = {
  success: [],
  error: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notifyOnSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.success = [...state.success, action.payload.message];
    },

    notifyOnError: (
      state,
      action: PayloadAction<{ message: string; error: unknown }>
    ) => {
      const code =
        axios.isAxiosError(action.payload.error) &&
        action.payload.error.response?.status
          ? action.payload.error.response.status
          : DEFAULT_ERROR_CODE;

      const errorTypeMessage =
        STATUS_CODES[code] || STATUS_CODES[DEFAULT_ERROR_CODE];

      state.error = [
        ...state.error,
        `${action.payload.message} (${errorTypeMessage})`,
      ];
    },
  },
});

export const { reducer, actions } = notificationsSlice;
