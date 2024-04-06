import { Reducer } from 'redux';
import {
  EXPORT_COMPANY_REQUEST, EXPORT_COMPANY_SUCCESS, EXPORT_COMPANY_FAIL,
  GET_COUNTRY_REQUEST, GET_COUNTRY_SUCCESS, GET_COUNTRY_FAIL, AddFirmState, GET_INDUSTRIES_REQUEST, GET_INDUSTRIES_SUCCESS, GET_INDUSTRIES_FAIL, GET_COMPANY_REQUEST, GET_COMPANY_SUCCESS, GET_COMPANY_FAIL, GET_PROFICIENCIES_REQUEST, GET_PROFICIENCIES_SUCCESS, GET_PROFICIENCIES_FAIL, ADD_COMPANY_REQUEST, ADD_COMPANY_SUCCESS, ADD_COMPANY_FAIL,
  DELETE_COMPANY_REQUEST,DELETE_COMPANY_SUCCESS,DELETE_COMPANY_FAIL,UPDATE_ADMIN_COMPANY_REQUEST,UPDATE_ADMIN_COMPANY_SUCCESS,UPDATE_ADMIN_COMPANY_FAIL, SET_UPDATE_COMPANY, GET_COMPANY_DETAIL_SUCCESS,GET_COMPANY_DETAIL_REQUEST,GET_COMPANY_DETAIL_FAIL, GET_DASHBOARD_REQUEST, GET_DASHBOARD_SUCCESS, GET_DASHBOARD_FAIL
} from './types';


const INIT_STATE: AddFirmState = {
  loading: false,
  getCountry: {},
  getIndustries: [],
  getCompany: {},
  getProficiencies: [],
  addCompany: {},
  getExportCompany: [],
  deleteCompany: {},
  updateAdminCompany: {},
  getCompanyDetail: {},
  error: {},
  getDashboardData: {},
};


const addFirms = (state = INIT_STATE, action : any) => {
  switch (action.type) {
    // get dashboard
    case GET_DASHBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        getDashboardData: action.payload.data,
        loading: false,
      };
    case GET_DASHBOARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // getExportCompany
    case EXPORT_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXPORT_COMPANY_SUCCESS:
      return {
        ...state,
        getExportCompany: action.payload,
        loading: false,
      };
    case EXPORT_COMPANY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // add company
    case ADD_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        addCompany: action.payload,
        loading: false,
      };
    case ADD_COMPANY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // get Proficiencies list
    case GET_PROFICIENCIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFICIENCIES_SUCCESS:
      return {
        ...state,
        getProficiencies: action.payload,
        loading: false,
      };
    case GET_PROFICIENCIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // get Company list
    case GET_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        getCompany: action.payload,
        loading: false,
      };
    case GET_COMPANY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // get INDUSTRIES list
    case GET_INDUSTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_INDUSTRIES_SUCCESS:
      return {
        ...state,
        getIndustries: action.payload,
        loading: false,
      };
    case GET_INDUSTRIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // get account list
    case GET_COUNTRY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        getCountry: action.payload.countries,
        loading: false,
      };
    case GET_COUNTRY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // delete company
    case DELETE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        deleteCompany: action.payload,
        loading: false,
      };
    case DELETE_COMPANY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // delete company
    case UPDATE_ADMIN_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ADMIN_COMPANY_SUCCESS:
      return {
        ...state,
        updateAdminCompany: action.payload,
        loading: false,
      };
    case UPDATE_ADMIN_COMPANY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_UPDATE_COMPANY:
      return {
        ...state,
        updateAdminCompany: {},
        loading: false,
      };

    // get company detail
    case GET_COMPANY_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COMPANY_DETAIL_SUCCESS:
      return {
        ...state,
        getCompanyDetail: action.payload,
        loading: false,
      };
    case GET_COMPANY_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default addFirms;
