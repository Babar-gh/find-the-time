import { Breakpoint } from 'constants/breakpoints';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store';

const useBreakpointCheck = () => {
  const active = useAppSelector((store: RootState) => store.breakpoints.active);

  return (...breakpointsToCheck: Breakpoint[]) =>
    breakpointsToCheck.some((breakpoint) => breakpoint === active);
};

export default useBreakpointCheck;
