import { combineReducers } from 'redux';

import repositories from './repositories';
import companies from './companies';
import profile from './companyProfile';
import user from './user';
import resources from './resources';
import login from './login';
import register from './register';
import location from './location';
import review_invitaions from './review_invitaions';
import addFirms from './addFirms';
import auth from './auth';
import crawlStatus from "./crawlStatus";
import advertisements from "./advertisements";
import tractionReport from "./tractionReport";
import claims from "./claims";
import addBranch from "./addBranch";
import contactInfo from "./contactInfo";

export default combineReducers({
  repositories,
  companies,
  profile,
  user,
  resources,
  login,
  register,
  location,
  review_invitaions,
  addFirms,
  contactInfo,
  auth,
  crawlStatus,
  advertisements,
  tractionReport,
  claims,
  addBranch,
});
