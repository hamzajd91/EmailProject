/**
 * Companies Action Types
 */

export enum CompaniesActionTypes {
  SEARCH_COMPANY = "@companies/SEARCH_COMPANY",
  SET_COMPANIES = "@companies/SET_COMPANIES",
  SEARCH_ON_LOAD = "@companies/SEARCH_ON_LOAD",
  LOAD_MORE = "@companies/LOAD_MORE",
  SET_LOAD_MORE_COMPANY = "@companies/SET_LOAD_MORE_COMPANY",
  GET_AUTOCOMPLETE = "@companies/GET_AUTOCOMPLETE",
  SET_AUTOCOMPLETE = "@companies/SET_AUTOCOMPLETE",
  SET_PAGE_ON_LOAD = "@companies/SET_PAGE_ON_LOAD",
  SET_ERRORS = "@companies/SET_ERRORS",
  CHECK_HAS_COMPANY = "@companies/CHECK_HAS_COMPANY",
  SET_USER_COMPANY = "@companies/SET_USER_COMPANY",
}

export interface SearchCompanyResponse {
  total?: number;
  query?: string;
  totalPages?: number;
  location?: string;
  page?: number;
  proficiencies?: [];
  industries?: [];
  currentFilters?: {};
  sortFilters?: [];
  sort?: string;
  companies?: Company[];
}
export interface Company {
  id: number;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: string;
  phone: string;
  website: string;
  tagline?: string;
  yearFounded?: string;
  banner?: string;
  icon?: string;
  social?: any;
  email?: string;
  repName?: string;
  repEmail?: string;
  size: number;
  score: string;
  reviewTotal: string;
  paid?: any;
  proficiencies?: [];
  industries?: [];
  parent?: any;
  linkedinSpecs: {};
  key?: string;
  parentId?: number;
  ipid?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface CompaniesState {
  query: string;
  location: string;
  distance: number;
  nextPage: number;
  activePage: number;
  filters: any;
  searchResponse: SearchCompanyResponse;
  companiesData: Company[];
  loading: false;
  error: any;
  suggestions: [];
  userHasCompany: boolean;
}
