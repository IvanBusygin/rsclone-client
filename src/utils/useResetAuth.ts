import { LS_USER_ID } from './constants';
import { useTypedDispatch } from '../redux/hooks';
import { resetAuth } from '../redux/slices/authSlice';

export default function useResetAuth() {
  const dispatch = useTypedDispatch();

  return () => {
    const USER_ID = localStorage.getItem(LS_USER_ID) ?? '';
    if (!USER_ID) {
      dispatch(resetAuth());
    }
  };
}
