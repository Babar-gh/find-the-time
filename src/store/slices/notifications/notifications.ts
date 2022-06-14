import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INotificationConfig {
  message: string;
  variant: 'success' | 'error';
}

const initialState: INotificationConfig[] = [];

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notify: (state, action: PayloadAction<INotificationConfig>) => {
      state = [...state, action.payload];
    },

    notifyOnSuccess: (state, action: PayloadAction<string>) => {
      state = [...state, { message: action.payload, variant: 'success' }];
    },
  },
});

export const { reducer, actions } = notificationsSlice;
