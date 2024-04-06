import {Reducer} from "redux";
import {CompanyProfileState, CompanyProfileActionTypes} from "./types";

const INITIAL_STATE: CompanyProfileState = {
  profile: {},
  pages: 1,
  reviews: [],
  reviewsResponse: {},
  permissions: {},
  loading: false,
  error: {},
  currentFilters: {},
  details: {},
};
const reducer: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CompanyProfileActionTypes.GET_COMPANY_PROFILE:
      return {
        ...state,
        loading: true,
        reviews: [],
        // pages: 1,
      };
    case CompanyProfileActionTypes.SET_COMPANY_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case CompanyProfileActionTypes.GET_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case CompanyProfileActionTypes.SAVE_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case CompanyProfileActionTypes.SET_DETAILS:
      return {
        ...state,
        loading: false,
        error: {},
        details: action.payload,
      };
    case CompanyProfileActionTypes.SET_COMPANY_REVIEWS:
      return {
        ...state,
        loading: false,
        pages: state.pages + 1,
        reviewsResponse: action.payload,
        reviews: [...state.reviews, ...action.payload.reviews],
      };

    case CompanyProfileActionTypes.SET_COMPANY_EMAIL:
      return {
        ...state,
        profile: {
          ...state.profile,
          website: action.payload.data.website,
        },
      };

    case CompanyProfileActionTypes.EMPTY_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case CompanyProfileActionTypes.SET_REVIEW_FILTERS:
      return {
        ...state,
        pages: 2,
        currentFilters: action.payload,
      };
    case CompanyProfileActionTypes.SET_FILTERED_REVIEWS:
      return {
        ...state,
        reviewsResponse: action.payload,
        reviews: [...state.reviews, ...action.payload.reviews],
      };
    case CompanyProfileActionTypes.SET_COMPANY_PERMISSION:
      return {
        ...state,
        permissions: action.payload,
      };
    case CompanyProfileActionTypes.LOAD_COMPANY_PROFILE:
      return {
        ...state,
      };
    case CompanyProfileActionTypes.SET_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
