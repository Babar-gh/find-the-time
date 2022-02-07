import { useEffect } from 'react';
import { Breakpoint, BREAKPOINTS } from 'constants/breakpoints';
import { useAppDispatch } from 'store/hooks';
import { setActive } from './breakpointsSlice';

const useBreakpointsUpdate = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(BREAKPOINTS).forEach(([name, query]) => {
      window.matchMedia(query).addEventListener('change', (e) => {
        if (e.matches) {
          dispatch(setActive(name as Breakpoint));
        }
      });
    });
  }, [dispatch]);
};

export default useBreakpointsUpdate;
