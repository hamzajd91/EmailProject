import { Company } from '../companies/types';
/**
 * CompanyProfile Action Types
 */
export enum CompanyProfileActionTypes {
  GET_COMPANY_PROFILE = '@companyProfile/GET_COMPANY_PROFILE',
  GET_DETAILS = '@company/GET_DETAILS',
  SET_DETAILS = '@company/SET_DETAILS',
  SAVE_DETAILS = '@company/SAVE_DETAILS',
  SAVE_SUCCESS = '@company/SAVE_SUCCESS',
  SET_COMPANY_EMAIL = '@company/SET_COMPANY_EMAIL',
  SET_COMPANY_PROFILE = '@companyProfile/SET_COMPANY_PROFILE',
  SET_COMPANY_REVIEWS = '@companyProfile/SET_COMPANY_REVIEWS',
  CLAIM_COMPANY = '@companyProfile/CLAIM_COMPANY',
  SHARE_COMPANY = '@companyProfile/SHARE_COMPANY',
  UPDATE_BANNER = '@companyProfile/UPDATE_BANNER',
  BOOKMARK_COMPANY = '@companyProfile/BOOKMARK_COMPANY',
  SET_COMPANY_PERMISSION = '@companyProfile/SET_COMPANY_PERMISSION',
  LOAD_COMPANY_PROFILE = '@companyProfile/LOAD_COMPANY_PROFILE',
  LOAD_MORE_REVIEWS = '@companyProfile/LOAD_MORE_REVIEWS',
  FILTER_REVIEWS = '@companyProfile/FILTER_REVIEWS',
  SET_REVIEW_FILTERS = '@companyProfile/SET_REVIEW_FILTERS',
  SET_FILTERED_REVIEWS = '@companyProfile/SET_FILTERED_REVIEWS',
  SET_HELPFUL_REVIEW = '@companyProfile/SET_HELPFUL_REVIEW',
  REMOVE_HELPFUL_REVIEW = '@companyProfile/REMOVE_HELPFUL_REVIEW',
  EMPTY_REVIEWS = '@companyProfile/EMPTY_REVIEWS',
  SET_ERRORS = '@companyProfile/SET_ERRORS'
}
export enum SubscriptionLevel {
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3
}
export interface ClaimObject {
  id: string;
  name: string;
  email: string;
}
export interface SubscriptionFeature {
  searchWeight: number;
  proficiencies: number;
}
export interface Profile {
  // data?: Company;
  id?: number;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  coordinates?: string;
  phone?: string;
  website?: string;
  tagline?: string;
  yearFounded?: string;
  banner?: string;
  icon?: string;
  social?: any;
  email?: string;
  repName?: string;
  repEmail?: string;
  size?: number;
  score?: string;
  reviewTotal?: string;
  proficiencies?: [];
  industries?: [];
  parent?: any;
  linkedinSpecs?: {};
  key?: string;
  parentId?: number;
  ipid?: string;
  updatedAt?: string;
  createdAt?: string;
  claimed?: ClaimObject;
  loggedUserId?: number;
  branches?: Company[];
  totalReviews?: number;
  ratings?: any;
  favorite?: boolean;
  subscriptionFeatures?: SubscriptionFeature;
  subscriptionLevel?: number;
}
export interface Reviews {
  totalReviews: number;
  ratings: any;
}
export interface Industry{
  id:number,
  name:string,
  key:string,

}
export interface Permissions {
  canEdit?: boolean;
  canEditLogo?: boolean;
  canEditBanner?: boolean;
  canEditBranches?: boolean;
  canRespond?: boolean;
  writeReview?: boolean;
}
export interface CompanyProfileState {
  profile: Profile;
  loading: false;
  error: any;
  pages: number;
  reviews: [];
  reviewsResponse:any;
  currentFilters:any;
  permissions: Permissions;
  details:any;
}
