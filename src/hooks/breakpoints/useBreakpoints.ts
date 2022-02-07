import { Breakpoint } from 'constants/breakpoints';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';

const useBreakpoints = () => {
  const active = useAppSelector((store: RootState) => store.breakpoints.active);

  const applyTo = (...breakpoints: Breakpoint[]) => {
    return breakpoints.some((bp) => bp === active);
  };

  return applyTo;
};

export default useBreakpoints;
