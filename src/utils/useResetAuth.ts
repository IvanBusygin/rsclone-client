import { LS_USER_IS_AUTH } from './constants';
import { useTypedDispatch } from '../redux/hooks';
import { resetAuth } from '../redux/slices/authSlice';

export default function useResetAuth() {
  const dispatch = useTypedDispatch();

  return () => {
    const USER_ID = localStorage.getItem(LS_USER_IS_AUTH) ?? '';
    if (!USER_ID) {
      dispatch(resetAuth());
    }
  };
}
