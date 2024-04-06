import { AdvertisementState, ADVERTISEMENT_FAIL, ADVERTISEMENT_REQUEST, ADVERTISEMENT_SUCCESS, CHANGE_ANALYTICS_FAIL, CHANGE_ANALYTICS_REQUEST, CHANGE_ANALYTICS_SUCCESS, CHANGE_SUBSCRIPTION_FAIL, CHANGE_SUBSCRIPTION_REQUEST, CHANGE_SUBSCRIPTION_SUCCESS, GET_COMPANIES_FAIL, GET_COMPANIES_REQUEST, GET_COMPANIES_SUCCESS, SUBSCRIPTION_FAIL, SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS} from "./types";


const INIT_STATE: AdvertisementState = {
  loading: false,
  getAdvertisements: {},
  getSubscription: [],
  getChangeSubscription: {},
  getChangeAnalytics: {},
  getCompanies: [],
  addAdvertisements: {},
  error: {},
};


const AdvertisementReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    // get Companies
    case GET_COMPANIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        getCompanies: action.payload,
        loading: false,
      };
    case GET_COMPANIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    // get Crawl Status
    case ADVERTISEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADVERTISEMENT_SUCCESS:
      return {
        ...state,
        getAdvertisements: action.payload,
        loading: false,
      };
    case ADVERTISEMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // get Subscription
    case SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        getSubscription: action.payload,
        loading: false,
      };
    case SUBSCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // post change Subscription
    case CHANGE_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        getChangeSubscription: action.payload,
        loading: false,
      };
    case CHANGE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // post ChangeAnalytics
    case CHANGE_ANALYTICS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_ANALYTICS_SUCCESS:
      return {
        ...state,
        getChangeAnalytics: action.payload,
        loading: false,
      };
    case CHANGE_ANALYTICS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AdvertisementReducer;
