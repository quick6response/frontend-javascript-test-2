import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAction = <Actions extends ActionCreatorsMapObject>(
  actions: Actions,
) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
