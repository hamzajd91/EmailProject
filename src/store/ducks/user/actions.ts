import { action } from 'typesafe-actions';
import { UserActionsTypes } from './types';

export const getCurrentUser = () => action(UserActionsTypes.GET_CURRENT_USER);
export const setCurrentUser = (user: any) => action(UserActionsTypes.SET_CURRENT_USER, user);
