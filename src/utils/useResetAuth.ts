import { LS_ACCESS_TOKEN, LS_USER_ID, LS_USER_IS_AUTH } from './constants';
import { useTypedDispatch } from '../redux/hooks';
import { resetAuth } from '../redux/slices/authSlice';

export default function useResetAuth() {
  const dispatch = useTypedDispatch();

  return () => {
    const isAuth = localStorage.getItem(LS_USER_IS_AUTH) === 'true';

    if (!isAuth) {
      localStorage.setItem(LS_ACCESS_TOKEN, '');
      localStorage.setItem(LS_USER_ID, '');
      dispatch(resetAuth());
    }
  };
}
