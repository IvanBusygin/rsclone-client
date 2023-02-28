import { LS_ACCESS_TOKEN, LS_USER_ID, LS_USER_IS_AUTH } from './constants';
import { useTypedDispatch } from '../redux/hooks';
import { resetAuth } from '../redux/slices/authSlice';

export default function useResetAuth() {
  const dispatch = useTypedDispatch();

  return () => {
    const USER_ID = localStorage.getItem(LS_USER_IS_AUTH) ?? '';
    if (!USER_ID) {
      localStorage.setItem(LS_ACCESS_TOKEN, '');
      localStorage.setItem(LS_USER_ID, '');
      dispatch(resetAuth());
    }
  };
}
