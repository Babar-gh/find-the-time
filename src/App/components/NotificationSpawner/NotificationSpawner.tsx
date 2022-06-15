import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useAppSelector } from 'store/hooks';

const NotificationSpawner: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const notifications = useAppSelector((store) => store.notifications);
  const last = [...notifications].pop();

  useEffect(() => {
    last && enqueueSnackbar(last.message, { variant: last.variant });
  }, [last, enqueueSnackbar]);

  return <>{children}</>;
};

export default NotificationSpawner;
