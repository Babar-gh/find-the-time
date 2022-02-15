import { useEffect } from 'react';
import { Breakpoint, BREAKPOINT_QUERIES } from 'constants/breakpoints';
import { useAppDispatch } from 'store/hooks';
import { setActive } from 'store/slices/breakpoints';

type ActiveBreakpointDispatch = (
  query: MediaQueryList | MediaQueryListEvent
) => void;

const useBreakpointUpdate = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listenersToCleanUp: [MediaQueryList, ActiveBreakpointDispatch][] = [];

    Object.entries(BREAKPOINT_QUERIES).forEach(([breakpoint, queryString]) => {
      const query = window.matchMedia(queryString);

      const dispatchActiveBreakpoint: ActiveBreakpointDispatch = (query) => {
        if (query.matches) {
          dispatch(setActive(breakpoint as Breakpoint));
        }
      };

      dispatchActiveBreakpoint(query);
      query.addEventListener('change', dispatchActiveBreakpoint);

      listenersToCleanUp.push([query, dispatchActiveBreakpoint]);
    });

    return () =>
      listenersToCleanUp.forEach(([query, handler]) =>
        query.removeEventListener('change', handler)
      );
  }, [dispatch]);
};

export default useBreakpointUpdate;
