/**
 * User Action Types
 */
export const GET_CLAIM_REQUEST = 'GET_CLAIM_REQUEST';
export const GET_CLAIM_SUCCESS = 'GET_CLAIM_SUCCESS';
export const GET_CLAIM_FAIL = 'GET_CLAIM_FAIL';

export interface ClaimState {
  loading: boolean;
  getClaim: any;
  error: any;
}
