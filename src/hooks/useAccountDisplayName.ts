import { useAppSelector } from 'store/hooks';

const useAccountDisplayName = () => {
  const name = useAppSelector((state) => state.account.name);
  const email = useAppSelector((state) => state.account.email);

  return name !== '' ? name : email;
};

export default useAccountDisplayName;
