import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../contexts/store';

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
