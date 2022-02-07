import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { breakpointsReducer as breakpoints } from 'hooks/breakpoints';

export const store = configureStore({
  reducer: {
    breakpoints,
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
