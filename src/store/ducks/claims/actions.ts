import { action } from 'typesafe-actions';
import { GET_CLAIM_FAIL, GET_CLAIM_REQUEST, GET_CLAIM_SUCCESS } from './types';

// get TractionReport
export const getClaims = (date: any) => ({
  type: GET_CLAIM_REQUEST,
  payload: date,
});

export const getClaimsSuccess = (events: any) => ({
  type: GET_CLAIM_SUCCESS,
  payload: events,
});

export const getClaimsFail = (error: any) => ({
  type: GET_CLAIM_FAIL,
  payload: error,
});


