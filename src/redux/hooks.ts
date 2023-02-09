import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from './store';

export const useTypedDispatch = () => useDispatch<Dispatch>();
export const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
