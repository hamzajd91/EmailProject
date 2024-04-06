/* eslint-disable import/no-cycle */
import {
 createStore, applyMiddleware, Store, compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { RepositoriesState } from './ducks/repositories/types';
import { LoginState } from './ducks/login/types';
import { CompaniesState } from './ducks/companies/types';
import { CompanyProfileState } from './ducks/companyProfile/types';
import { ResourcesState } from './ducks/resources/types';
import { UserState } from './ducks/user/types';
import { RegisterState } from './ducks/register/types';
import { AddFirmState } from './ducks/addFirms/types';
import { ContactInfoState } from './ducks/contactInfo/types';
import { AuthState } from './ducks/auth/types';
import { CrawlStatusState } from './ducks/crawlStatus/types';
import { AddBranchState } from './ducks/addBranch/types';


import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';
import { AdvertisementState } from './ducks/advertisements/types';
import { TractionReportState } from './ducks/tractionReport/types';
import { ClaimState } from './ducks/claims/types';


export interface ApplicationState {
  repositories: RepositoriesState;
  companies: CompaniesState;
  profile: CompanyProfileState;
  user: UserState;
  resources: ResourcesState;
  register: RegisterState;
  location: any;
  login: LoginState;
  review_invitaions: any;
  addFirms: AddFirmState;
  contactInfo: ContactInfoState;
  auth: AuthState;
  crawlStatus: CrawlStatusState;
  advertisements: AdvertisementState;
  tractionReport: TractionReportState;
  claims: ClaimState;
  addBranch: AddBranchState;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(
  rootReducer,
  // applyMiddleware(sagaMiddleware),
  compose(
    applyMiddleware(sagaMiddleware),
    // (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
