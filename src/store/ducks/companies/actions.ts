import { action } from "typesafe-actions";
import { CompaniesActionTypes, Company, SearchCompanyResponse } from "./types";

export const searchCompany = (params: any) => action(CompaniesActionTypes.SEARCH_COMPANY, params);

export const setCompanies = (data: SearchCompanyResponse) => action(CompaniesActionTypes.SET_COMPANIES, { data });

export const loadMore = (params: any) => action(CompaniesActionTypes.LOAD_MORE, params);

export const setLoadMoreComapanies = (data: Company[]) => action(CompaniesActionTypes.SET_LOAD_MORE_COMPANY, { data });

export const setErrors = (errors: any) => action(CompaniesActionTypes.SET_ERRORS, errors);

export const getAutoComplete = (params: any) => action(CompaniesActionTypes.GET_AUTOCOMPLETE, params);

export const setAutoComplete = (data: any) => action(CompaniesActionTypes.SET_AUTOCOMPLETE, data);

export const searchOnLoad = (params: any) => action(CompaniesActionTypes.SEARCH_ON_LOAD, params);

export const setPageOnLoad = (params: any) => action(CompaniesActionTypes.SET_PAGE_ON_LOAD, params);

export const checkHasCompany = () => action(CompaniesActionTypes.CHECK_HAS_COMPANY);

export const setUserHasCompany = (params: any) => action(CompaniesActionTypes.SET_USER_COMPANY, params);
