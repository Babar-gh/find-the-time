import { useCallback, useEffect } from 'react';
import { Breakpoint, BREAKPOINT_QUERIES } from 'constants/breakpoints';
import { useAppDispatch } from 'store/hooks';
import { setActive } from './breakpointsSlice';

const useBreakpointsUpdate = () => {
  const dispatch = useAppDispatch();

  const dispatchActiveBreakpoint = useCallback(
    (query: MediaQueryList | MediaQueryListEvent, name: Breakpoint) => {
      if (query.matches) {
        dispatch(setActive(name));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    Object.entries(BREAKPOINT_QUERIES).forEach(([name, queryString]) => {
      const query = window.matchMedia(queryString);

      dispatchActiveBreakpoint(query, name as Breakpoint);

      query.addEventListener('change', (event) =>
        dispatchActiveBreakpoint(event, name as Breakpoint)
      );
    });
  }, [dispatchActiveBreakpoint]);
};

export default useBreakpointsUpdate;
