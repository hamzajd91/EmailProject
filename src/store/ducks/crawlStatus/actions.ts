import { ACTION_FAIL, ACTION_REQUEST, ACTION_SUCCESS, ADD_CRAWL_STATUS_FAIL, ADD_CRAWL_STATUS_REQUEST, ADD_CRAWL_STATUS_SUCCESS, CRAWL_STATUS_DETAIL_FAIL, CRAWL_STATUS_DETAIL_REQUEST, CRAWL_STATUS_DETAIL_SUCCESS, CRAWL_STATUS_FAIL, CRAWL_STATUS_REQUEST, CRAWL_STATUS_SUCCESS, UPDATE_COMPANY_FAIL, UPDATE_COMPANY_REQUEST, UPDATE_COMPANY_SUCCESS } from './types';


// getCrawlStatus
export const getcrawlStatus = (page : any) => ({
  type: CRAWL_STATUS_REQUEST,
  payload: {page, history},
});

export const crawlStatusSuccess = (events: any) => ({
  type: CRAWL_STATUS_SUCCESS,
  payload: events,
});

export const crawlStatusFail = (error: any) => ({
  type: CRAWL_STATUS_FAIL,
  payload: error,
});

// addCrawlStatus
export const addcrawlStatus = (data : any) => ({
  type: ADD_CRAWL_STATUS_REQUEST,
  payload: data,
});

export const addcrawlStatusSuccess = (events: any) => ({
  type: ADD_CRAWL_STATUS_SUCCESS,
  payload: events,
});

export const addcrawlStatusFail = (error: any) => ({
  type: ADD_CRAWL_STATUS_FAIL,
  payload: error,
});

// getCrawlStatusDetail
export const getCrawlStatusDetail = (id: any, page: number, website :any, visited: any, address: any, phone:any, email:any, description:any, error:any) => ({
         type: CRAWL_STATUS_DETAIL_REQUEST,
         payload: {id, page, website, visited, address, phone, email, description, error},
       });

export const getCrawlStatusDetailSuccess = (events: any) => ({
  type: CRAWL_STATUS_DETAIL_SUCCESS,
  payload: events,
});

export const getCrawlStatusDetailFail = (error: any) => ({
  type: CRAWL_STATUS_DETAIL_FAIL,
  payload: error,
});


// getCrawlStatusDetail
export const updateCompany = (id :any) => ({
  type: UPDATE_COMPANY_REQUEST,
  payload : id,
});

export const updateCompanySuccess = (events: any) => ({
  type: UPDATE_COMPANY_SUCCESS,
  payload: events,
});

export const updateCompanyFail = (error: any) => ({
  type: UPDATE_COMPANY_FAIL,
  payload: error,
});

// action Detail
export const actionStatus = (id :any, linkId : any) => ({
  type: ACTION_REQUEST,
  payload : {id, linkId},
});

export const actionStatusSuccess = (events: any) => ({
         type: ACTION_SUCCESS,
         payload: events,
       });

export const actionStatusFail = (error: any) => ({
         type: ACTION_FAIL,
         payload: error,
       });

