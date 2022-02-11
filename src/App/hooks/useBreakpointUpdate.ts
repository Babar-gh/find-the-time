import { useCallback, useEffect } from 'react';
import { Breakpoint, BREAKPOINT_QUERIES } from 'constants/breakpoints';
import { useAppDispatch } from 'store/hooks';
import { setActive } from 'store/slices/breakpoints';

const useBreakpointUpdate = () => {
  const dispatch = useAppDispatch();

  const dispatchActiveBreakpoint = useCallback(
    (query: MediaQueryList | MediaQueryListEvent, breakpoint: Breakpoint) => {
      if (query.matches) {
        dispatch(setActive(breakpoint));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    Object.entries(BREAKPOINT_QUERIES).forEach(([breakpoint, queryString]) => {
      const query = window.matchMedia(queryString);

      dispatchActiveBreakpoint(query, breakpoint as Breakpoint);

      query.addEventListener('change', (event) =>
        dispatchActiveBreakpoint(event, breakpoint as Breakpoint)
      );
    });
  }, [dispatchActiveBreakpoint]);
};

export default useBreakpointUpdate;
