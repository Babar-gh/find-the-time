import { Breakpoint } from 'constants/breakpoints';
import { RootState } from 'store';
import { useAppSelector } from 'store/hooks';

const useBreakpointCheck = () => {
  const active = useAppSelector((store: RootState) => store.breakpoints.active);

  return (...breakpointsToCheck: Breakpoint[]) =>
    breakpointsToCheck.some((breakpoint) => breakpoint === active);
};

export default useBreakpointCheck;
