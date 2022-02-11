import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Breakpoint } from 'constants/breakpoints';

interface IState {
  active: Breakpoint;
}

const initialState: IState = {
  active: 'Mobile',
};

export const breakpointsSlice = createSlice({
  name: 'breakpoints',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<Breakpoint>) => {
      state.active = action.payload;
    },
  },
});

export const { setActive } = breakpointsSlice.actions;

export default breakpointsSlice.reducer;
