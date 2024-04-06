/* eslint-disable import/no-cycle */
import { all, fork, takeLatest } from "redux-saga/effects";

import { RepositoriesTypes } from "./repositories/types";
import { load } from "./repositories/sagas";
import { CompaniesActionTypes } from "./companies/types";
import { search, loadMore, getAutoComplete, searchOnLoad, checkHasCompany } from "./companies/sagas";
import { CompanyProfileActionTypes } from "./companyProfile/types";
import { RegisterActionsTypes } from "./register/types";
import {
  getProfile,
  loadMoreReviews,
  claimCompany,
  updateBanner,
  bookmarkCompany,
  shareCompany,
  filterReviews,
  setHelpfulReview,
  removeHelpfulReview,
  getDetails,
  saveDetails,
} from "./companyProfile/sagas";
import { UserActionsTypes } from "./user/types";
import { getCurrentUser } from "./user/sagas";
import { ResourcesActionsTypes } from "./resources/types";
import { getResourcesData } from "./resources/sagas";

import { LoginActionsTypes } from "./login/types";
import { authLogin } from "./login/sagas";
import { authRegister } from "./register/sagas";
import addFirmsAPI from "./addFirms/sagas";
import authAPI from "./auth/sagas";
import crawlStatusAPI from "./crawlStatus/sagas";
import advertisementsAPI from "./advertisements/sagas";
import tractionReportAPI from "./tractionReport/sagas";
import claims from "./claims/sagas";
import addbranch from "./addBranch/sagas";
import contactInfoAPI from "./contactInfo/sagas";


export default function* rootSaga() {
  return yield all([
    takeLatest(UserActionsTypes.GET_CURRENT_USER, getCurrentUser),
    takeLatest(CompanyProfileActionTypes.CLAIM_COMPANY, claimCompany),
    takeLatest(CompanyProfileActionTypes.UPDATE_BANNER, updateBanner),
    takeLatest(CompanyProfileActionTypes.SET_HELPFUL_REVIEW, setHelpfulReview),
    takeLatest(CompanyProfileActionTypes.REMOVE_HELPFUL_REVIEW, removeHelpfulReview),
    takeLatest(CompanyProfileActionTypes.BOOKMARK_COMPANY, bookmarkCompany),
    takeLatest(CompanyProfileActionTypes.FILTER_REVIEWS, filterReviews),
    takeLatest(CompanyProfileActionTypes.SHARE_COMPANY, shareCompany),
    takeLatest(CompaniesActionTypes.GET_AUTOCOMPLETE, getAutoComplete),
    takeLatest(RepositoriesTypes.LOAD_REQUEST, load),
    takeLatest(CompaniesActionTypes.SEARCH_COMPANY, search),
    takeLatest(CompaniesActionTypes.SEARCH_ON_LOAD, searchOnLoad),
    takeLatest(CompaniesActionTypes.LOAD_MORE, loadMore),
    takeLatest(CompanyProfileActionTypes.GET_COMPANY_PROFILE, getProfile),
    takeLatest(CompanyProfileActionTypes.GET_DETAILS, getDetails),
    takeLatest(CompanyProfileActionTypes.SAVE_DETAILS, saveDetails),
    takeLatest(CompanyProfileActionTypes.LOAD_MORE_REVIEWS, loadMoreReviews),

    takeLatest(ResourcesActionsTypes.GET_RESOURCES_DATA, getResourcesData),

    takeLatest(LoginActionsTypes.LOGIN, authLogin),
    takeLatest(RegisterActionsTypes.REGISTER, authRegister),

    takeLatest(CompaniesActionTypes.CHECK_HAS_COMPANY, checkHasCompany),
    takeLatest(CompaniesActionTypes.CHECK_HAS_COMPANY, checkHasCompany),
    fork(contactInfoAPI),
    fork(addFirmsAPI),
    fork(authAPI),
    fork(crawlStatusAPI),
    fork(advertisementsAPI),
    fork(tractionReportAPI),
    fork(claims),
    fork(addbranch),
  ]);
}
