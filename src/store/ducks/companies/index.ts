import {Reducer} from "redux";
import {CompaniesActionTypes, CompaniesState} from "./types";

const INITIAL_STATE: CompaniesState = {
  searchResponse: {},
  companiesData: [],
  filters: {},
  query: "",
  location: "",
  distance: 3000,
  nextPage: 2,
  activePage: 1,
  loading: false,
  error: {},
  suggestions: [],
  userHasCompany: false,
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CompaniesActionTypes.SEARCH_COMPANY:
      return {
        ...state,
        loading: true,
        query: action.payload.query,
        location: action.payload.location,
        distance: action.payload.distance,
        filters: action.payload.filters,
        nextPage: 2,
      };
    case CompaniesActionTypes.LOAD_MORE:
      return {
        ...state,
        loading: true,
        // companiesData:[],
        query: action.payload.query,
        location: action.payload.location,
        distance: action.payload.distance,
        filters: action.payload.filters,
      };
    case CompaniesActionTypes.SEARCH_ON_LOAD:
      return {
        ...state,
        loading: true,
        // companiesData:[],
        query: action.payload.query,
        location: action.payload.location,
        distance: action.payload.distance,
        filters: action.payload.filters,
      };
    case CompaniesActionTypes.SET_COMPANIES:
      return {
        ...state,
        loading: false,
        error: {},
        activePage: action.payload.data.page,
        distance: action.payload.data.currentDistance,
        searchResponse: action.payload.data,
        companiesData: action.payload.data.companies,
      };

    case CompaniesActionTypes.SET_PAGE_ON_LOAD:
      return {
        ...state,
        ...action.payload,
      };

    case CompaniesActionTypes.SET_ERRORS:
      return {
        ...state,
        loading: false,
        error: action.payload,
        companiesData: [],
      };

    case CompaniesActionTypes.SET_AUTOCOMPLETE:
      return {
        ...state,
        suggestions: action.payload,
      };

    case CompaniesActionTypes.SET_USER_COMPANY:
      return {
        ...state,
        userHasCompany: action.payload.length > 0,
      };

    default:
      return state;
  }
};

export default reducer;
