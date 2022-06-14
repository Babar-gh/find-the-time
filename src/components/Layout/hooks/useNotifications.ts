import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useAppSelector } from 'store/hooks';

const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notifications = useAppSelector((store) => store.notifications);
  const last = [...notifications].pop();

  useEffect(() => {
    last && enqueueSnackbar(last.message, { variant: last.variant });
  }, [last, enqueueSnackbar]);
};

export default useNotifications;
