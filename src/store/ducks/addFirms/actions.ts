import { action } from 'typesafe-actions';
import {
  ADD_COMPANY_FAIL,
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  EXPORT_COMPANY_FAIL,
  EXPORT_COMPANY_REQUEST,
  EXPORT_COMPANY_SUCCESS,
  GET_COMPANY_FAIL,
  GET_COMPANY_REQUEST,
 GET_COMPANY_SUCCESS,
  GET_COUNTRY_FAIL, GET_COUNTRY_REQUEST, GET_COUNTRY_SUCCESS, GET_INDUSTRIES_FAIL, GET_INDUSTRIES_REQUEST, GET_INDUSTRIES_SUCCESS, GET_PROFICIENCIES_FAIL, GET_PROFICIENCIES_REQUEST, GET_PROFICIENCIES_SUCCESS,
  DELETE_COMPANY_REQUEST,DELETE_COMPANY_SUCCESS,DELETE_COMPANY_FAIL,SET_UPDATE_COMPANY, GET_COMPANY_DETAIL_SUCCESS,GET_COMPANY_DETAIL_REQUEST,GET_COMPANY_DETAIL_FAIL, UPDATE_ADMIN_COMPANY_REQUEST, UPDATE_ADMIN_COMPANY_FAIL, UPDATE_ADMIN_COMPANY_SUCCESS, GET_DASHBOARD_REQUEST, GET_DASHBOARD_SUCCESS, GET_DASHBOARD_FAIL
} from './types';


//add company

export const getDashboard = (data: any) => ({
  type: GET_DASHBOARD_REQUEST,
  payload: data,
});

export const getDashboardSuccess = (events: any) => ({
         type: GET_DASHBOARD_SUCCESS,
         payload: events,
       });

export const getDashboardFail = (error: any) => ({
         type: GET_DASHBOARD_FAIL,
         payload: error,
       });

//add company

export const addCompany = (data: any) => ({
  type: ADD_COMPANY_REQUEST,
  payload: data,
});

export const addCompanySuccess = (events: any) => ({
  type: ADD_COMPANY_SUCCESS,
  payload: events,
});

export const addCompanyFail = (error: any) => ({
  type: ADD_COMPANY_FAIL,
  payload: error,
});

// get All INDUSTRIES
export const getIndustries = () => ({
  type: GET_INDUSTRIES_REQUEST,
});

export const getIndustriesSuccess = (events: any) => ({
  type: GET_INDUSTRIES_SUCCESS,
  payload: events,
});

export const getIndustriesFail = (error: any) => ({
  type: GET_INDUSTRIES_FAIL,
  payload: error,
});


export const getCompany = (page: any, text : string) => ({
  type: GET_COMPANY_REQUEST,
  payload: {page, text},
});

export const getCompanySuccess = (events: any) => ({
  type: GET_COMPANY_SUCCESS,
  payload: events,
});

export const getCompanyFail = (error: any) => ({
  type: GET_COMPANY_FAIL,
  payload: error,
});


export const getCountry = () => ({
  type: GET_COUNTRY_REQUEST,
});

export const getCountrySuccess = (events: any) => ({
  type: GET_COUNTRY_SUCCESS,
  payload: events,
});

export const getCountryFail = (error: any) => ({
  type: GET_COUNTRY_FAIL,
  payload: error,
});

export const getProficiencies = () => ({
  type: GET_PROFICIENCIES_REQUEST,
});

export const getProficienciesSuccess = (events: any) => ({
  type: GET_PROFICIENCIES_SUCCESS,
  payload: events,
});

export const getProficienciesFail = (error: any) => ({
  type: GET_PROFICIENCIES_FAIL,
  payload: error,
});

export const getExportCompany = (
         startPoint: "",
         endPoint: "",
         proficiencies: "",
         subscription_type: "",
         address: "",
         date: "",
         dateClaimed: "",
         dateSubscribed: "",
         enddate: "",
         enddateClaimed: "",
         enddateSubscribed: ""
       ) => ({
         type: EXPORT_COMPANY_REQUEST,
         payload: {
           startPoint,
           endPoint,
           proficiencies,
           subscription_type,
           address,
           date,
           dateClaimed,
           dateSubscribed,
           enddate,
           enddateClaimed,
           enddateSubscribed,
         },
       });

export const getExportCompanySuccess = (events: any) => ({
  type: EXPORT_COMPANY_SUCCESS,
  payload: events,
});

export const getExportCompanyFail = (error: any) => ({
  type: EXPORT_COMPANY_FAIL,
  payload: error,
});

export const deleteCompany = (data: any) => ({
  type: DELETE_COMPANY_REQUEST,
  payload: data,
});

export const deleteCompanySuccess = (events: any) => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: events,
});

export const deleteCompanyFail = (error: any) => ({
  type: DELETE_COMPANY_FAIL,
  payload: error,
});

export const updateAdminCompany = (data: any) => ({
  type: UPDATE_ADMIN_COMPANY_REQUEST,
  payload: data,
});

export const setupdateCompany = () => ({
  type: SET_UPDATE_COMPANY,
  payload:{},
});

export const updateCompanySuccess = (events: any) => ({
  type: UPDATE_ADMIN_COMPANY_SUCCESS,
  payload: events,
});

export const updateCompanyFail = (error: any) => ({
  type:UPDATE_ADMIN_COMPANY_FAIL,
  payload: error,
});

export const getCompanyDetail = (data: any) => ({
  type: GET_COMPANY_DETAIL_REQUEST,
  payload:data,
});

export const getCompanyDetailSuccess = (events: any) => ({
  type: GET_COMPANY_DETAIL_SUCCESS,
  payload: events,
});

export const getCompanyDetailFail = (error: any) => ({
  type: GET_COMPANY_DETAIL_FAIL,
  payload: error,
});
