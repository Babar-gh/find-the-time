import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useAppSelector } from 'store/hooks';

const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { success, error } = useAppSelector((store) => store.notifications);

  useEffect(() => {
    if (success.at(-1)) {
      enqueueSnackbar(success.at(-1), { variant: 'success' });
    }
  }, [success, enqueueSnackbar]);

  useEffect(() => {
    if (error.at(-1)) {
      enqueueSnackbar(error.at(-1), { variant: 'error' });
    }
  }, [error, enqueueSnackbar]);
};

export default useNotifications;
