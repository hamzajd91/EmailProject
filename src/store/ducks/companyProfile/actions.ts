import {action} from "typesafe-actions";
import {CompanyProfileActionTypes, Profile, Permissions} from "./types";

export const getProfile = (params: any) => action(CompanyProfileActionTypes.GET_COMPANY_PROFILE, params);

export const setProfile = (profile: Profile) => action(CompanyProfileActionTypes.SET_COMPANY_PROFILE, profile);

export const loadProfile = () => action(CompanyProfileActionTypes.LOAD_COMPANY_PROFILE);

export const loadMoreReviews = (params: any) => action(CompanyProfileActionTypes.LOAD_MORE_REVIEWS, params);

export const setReviews = (reviews: []) => action(CompanyProfileActionTypes.SET_COMPANY_REVIEWS, reviews);

export const setPermissions = (permissions: Permissions) =>
  action(CompanyProfileActionTypes.SET_COMPANY_PERMISSION, permissions);

export const setErrors = (errors: any) => action(CompanyProfileActionTypes.SET_ERRORS, errors);

export const setCompanyEmail = (payload: any) => action(CompanyProfileActionTypes.SET_COMPANY_EMAIL, payload);

export const claimCompany = (body: any) => action(CompanyProfileActionTypes.CLAIM_COMPANY, body);

export const updateBanner = (data: any) => action(CompanyProfileActionTypes.UPDATE_BANNER, data);

export const bookmarkCompany = (params: any) => action(CompanyProfileActionTypes.BOOKMARK_COMPANY, params);

export const shareCompany = (params: any) => action(CompanyProfileActionTypes.SHARE_COMPANY, params);

export const filterReviews = (params: any) => action(CompanyProfileActionTypes.FILTER_REVIEWS, params);

export const setReviewFilters = (filters: any) => action(CompanyProfileActionTypes.SET_REVIEW_FILTERS, filters);

export const emptyReviews = (params: any) => action(CompanyProfileActionTypes.EMPTY_REVIEWS, params);

export const setFilteredReviews = (params: any) => action(CompanyProfileActionTypes.SET_FILTERED_REVIEWS, params);

export const setHelpfulReview = (params: any) => action(CompanyProfileActionTypes.SET_HELPFUL_REVIEW, params);

export const removeHelpfulReview = (params: any) => action(CompanyProfileActionTypes.REMOVE_HELPFUL_REVIEW, params);

export const getDetails = (params: any) => action(CompanyProfileActionTypes.GET_DETAILS, params);

export const setDetails = (data: any) => action(CompanyProfileActionTypes.SET_DETAILS, data);

export const saveDetails = (data: any) => action(CompanyProfileActionTypes.SAVE_DETAILS, data);

export const saveSuccess = () => action(CompanyProfileActionTypes.SAVE_SUCCESS);
