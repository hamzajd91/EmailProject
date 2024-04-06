import { ADD_ADVERTISEMENT_FAIL, ADD_ADVERTISEMENT_REQUEST, ADD_ADVERTISEMENT_SUCCESS, ADVERTISEMENT_FAIL, ADVERTISEMENT_REQUEST, ADVERTISEMENT_SUCCESS, CHANGE_ANALYTICS_FAIL, CHANGE_ANALYTICS_REQUEST, CHANGE_ANALYTICS_SUCCESS, CHANGE_SUBSCRIPTION_FAIL, CHANGE_SUBSCRIPTION_REQUEST, CHANGE_SUBSCRIPTION_SUCCESS, GET_COMPANIES_FAIL, GET_COMPANIES_REQUEST, GET_COMPANIES_SUCCESS, SUBSCRIPTION_FAIL, SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS } from './types';


// add Advertisements 
export const addAdvertisements = (data:any,history:any) => ({
  type: ADD_ADVERTISEMENT_REQUEST,
  payload:{data,history},
});

export const addAdvertisementsSuccess = (events: any) => ({
  type: ADD_ADVERTISEMENT_SUCCESS,
  payload: events,
});

export const addAdvertisementsFail = (error: any) => ({
  type: ADD_ADVERTISEMENT_FAIL,
  payload: error,
});

// getCompanies
export const getCompanies = (text: any) => ({
  type: GET_COMPANIES_REQUEST,
  payload: text,
});

export const getCompaniesSuccess = (events: any) => ({
  type: GET_COMPANIES_SUCCESS,
  payload: events,
});

export const getCompaniesFail = (error: any) => ({
  type: GET_COMPANIES_FAIL,
  payload: error,
});

// getAdvertisements
export const getAdvertisements = (page: any) => ({
         type: ADVERTISEMENT_REQUEST,
         payload: {page, history},
       });

export const advertisementsSuccess = (events: any) => ({
         type: ADVERTISEMENT_SUCCESS,
         payload: events,
       });

export const advertisementsFail = (error: any) => ({
         type: ADVERTISEMENT_FAIL,
         payload: error,
       });


// getSubscription
export const getSubscription = () => ({
         type: SUBSCRIPTION_REQUEST,
       });

export const subscriptionSuccess = (events: any) => ({
         type: SUBSCRIPTION_SUCCESS,
         payload: events,
       });

export const subscriptionFail = (error: any) => ({
         type: SUBSCRIPTION_FAIL,
         payload: error,
       });

// post change Subscription
export const changeSubscription = (data: any) => ({
         type: CHANGE_SUBSCRIPTION_REQUEST,
         payload: data,
       });

export const changeSubscriptionSuccess = (events: any) => ({
         type: CHANGE_SUBSCRIPTION_SUCCESS,
         payload: events,
       });

export const changeSubscriptionFail = (error: any) => ({
         type: CHANGE_SUBSCRIPTION_FAIL,
         payload: error,
       });

// post change Analytics
export const changeAnalytics = (data: any) => ({
         type: CHANGE_ANALYTICS_REQUEST,
         payload: data,
       });

export const changeAnalyticsSuccess = (events: any) => ({
         type: CHANGE_ANALYTICS_SUCCESS,
         payload: events,
       });

export const changeAnalyticsFail = (error: any) => ({
         type: CHANGE_ANALYTICS_FAIL,
         payload: error,
       });
