/**
 * User Action Types
 */

export const CRAWL_STATUS_REQUEST = "CRAWL_STATUS_REQUEST";
export const CRAWL_STATUS_SUCCESS = "CRAWL_STATUS_SUCCESST";
export const CRAWL_STATUS_FAIL = "CRAWL_STATUS_FAIL";

export const UPDATE_COMPANY_REQUEST = "UPDATE_COMPANY_REQUEST";
export const UPDATE_COMPANY_SUCCESS = "UPDATE_COMPANY_SUCCESST";
export const UPDATE_COMPANY_FAIL = "UPDATE_COMPANY_FAIL";

export const CRAWL_STATUS_DETAIL_REQUEST = "CRAWL_STATUS_DETAIL_REQUEST";
export const CRAWL_STATUS_DETAIL_SUCCESS = "CRAWL_STATUS_DETAIL_SUCCESST";
export const CRAWL_STATUS_DETAIL_FAIL = "CRAWL_STATUS_DETAIL_FAIL";

export const ADD_CRAWL_STATUS_REQUEST = "ADD_CRAWL_STATUS_REQUEST";
export const ADD_CRAWL_STATUS_SUCCESS = "ADD_CRAWL_STATUS_SUCCESST";
export const ADD_CRAWL_STATUS_FAIL = "ADD_CRAWL_STATUS_FAIL";

export const ACTION_REQUEST = "ACTION_REQUEST";
export const ACTION_SUCCESS = "ACTION_SUCCESST";
export const ACTION_FAIL = "ACTION_FAIL";

export interface CrawlStatusState {
  loading: boolean;
  getCrawlStatus: any;
  addCrawlStatus: any;
  getCrawlStatusDetail: any;
  updateCompany : any;
  actionStatus : any;
  error: any;
}
