/**
 * User Action Types
 */

export const ADVERTISEMENT_REQUEST = "ADVERTISEMENT_REQUEST";
export const ADVERTISEMENT_SUCCESS = "ADVERTISEMENT_SUCCESST";
export const ADVERTISEMENT_FAIL = "ADVERTISEMENT_FAIL";

export const ADD_ADVERTISEMENT_REQUEST = "ADD_ADVERTISEMENT_REQUEST";
export const ADD_ADVERTISEMENT_SUCCESS = "ADD_ADVERTISEMENT_SUCCESST";
export const ADD_ADVERTISEMENT_FAIL = "ADD_ADVERTISEMENT_FAIL";

export const SUBSCRIPTION_REQUEST = "SUBSCRIPTION_REQUEST";
export const SUBSCRIPTION_SUCCESS = "SUBSCRIPTION_SUCCESST";
export const SUBSCRIPTION_FAIL = "SUBSCRIPTION_FAIL";


export const CHANGE_SUBSCRIPTION_REQUEST = "CHANGE_SUBSCRIPTION_REQUEST";
export const CHANGE_SUBSCRIPTION_SUCCESS = "CHANGE_SUBSCRIPTION_SUCCESST";
export const CHANGE_SUBSCRIPTION_FAIL = "CHANGE_SUBSCRIPTION_FAIL";

export const CHANGE_ANALYTICS_REQUEST = "CHANGE_ANALYTICS_REQUEST";
export const CHANGE_ANALYTICS_SUCCESS = "CHANGE_ANALYTICS_SUCCESST";
export const CHANGE_ANALYTICS_FAIL = "CHANGE_ANALYTICS_FAIL";

export const GET_COMPANIES_REQUEST = "GET_COMPANIES_REQUEST";
export const GET_COMPANIES_SUCCESS = "GET_COMPANIES_SUCCESST";
export const GET_COMPANIES_FAIL = "GET_COMPANIES_FAIL";

export interface AdvertisementState {
  loading: boolean;
  getAdvertisements: any;
  getSubscription: any;
  getChangeSubscription: any;
  getChangeAnalytics: any;
  getCompanies: any;
  addAdvertisements: any;
  error: any;
}
