import { ACTION_FAIL, ACTION_REQUEST, ACTION_SUCCESS, ADD_CRAWL_STATUS_FAIL, ADD_CRAWL_STATUS_REQUEST, ADD_CRAWL_STATUS_SUCCESS, CrawlStatusState, CRAWL_STATUS_DETAIL_FAIL, CRAWL_STATUS_DETAIL_REQUEST, CRAWL_STATUS_DETAIL_SUCCESS, CRAWL_STATUS_FAIL, CRAWL_STATUS_REQUEST, CRAWL_STATUS_SUCCESS, UPDATE_COMPANY_FAIL, UPDATE_COMPANY_REQUEST, UPDATE_COMPANY_SUCCESS } from "./types";


const INIT_STATE: CrawlStatusState = {
  loading: false,
  getCrawlStatus: {},
  addCrawlStatus: {},
  getCrawlStatusDetail: {},
  updateCompany: {},
  actionStatus: {},
  error: {},
};


const crawlStatusReducer = (state = INIT_STATE, action : any) => {
  switch (action.type) {
    // action
    case ACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        actionStatus: action.payload,
        loading: false,
      };
    case ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // updateCompany
    case UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        updateCompany: action.payload,
        loading: false,
      };
    case UPDATE_COMPANY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // get Crawl Status Detail
    case CRAWL_STATUS_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CRAWL_STATUS_DETAIL_SUCCESS:
      return {
        ...state,
        getCrawlStatusDetail: action.payload,
        loading: false,
      };
    case CRAWL_STATUS_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // add Crawl Status
    case ADD_CRAWL_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CRAWL_STATUS_SUCCESS:
      return {
        ...state,
        addCrawlStatus: action.payload,
        loading: false,
      };
    case ADD_CRAWL_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // get Crawl Status
    case CRAWL_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CRAWL_STATUS_SUCCESS:
      return {
        ...state,
        getCrawlStatus: action.payload,
        loading: false,
      };
    case CRAWL_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default crawlStatusReducer;
