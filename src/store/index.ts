import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import breakpoints from './slices/breakpoints';
import account from './slices/account';

export const store = configureStore({
  reducer: {
    breakpoints,
    account,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
