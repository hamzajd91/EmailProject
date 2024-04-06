/* eslint-disable no-nested-ternary */
import React, {Component} from "react";
import {connect} from "react-redux";
import {Col, Row, Container} from "react-bootstrap";
import {Dispatch, bindActionCreators} from "redux";
import Pagination from "react-js-pagination";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import * as actions from "../../../store/ducks/companies/actions";
import {Loader} from "../../Loader/index";
import CompanyItem from "../../CompanyItem";
import "./index.scss";
import appApi from "../../../services/appApi";
import noCompany from "../../../images/no_company.png";

import {SearchCompanyResponse, Company} from "../../../store/ducks/companies/types";
import {ApplicationState} from "../../../store";

import Backdrop from "@material-ui/core/Backdrop";
import {withStyles, createStyles, Theme} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConfirmationDialogForm from "../../CompaniesList/ConfirmationDialogForm";
import CompanyListModal from "../../CompaniesList/CompanyListModal";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";

import qs from "qs";

const useStyles = (theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    root: {
      color: "#fff",
    },
  });

interface StateProps {
  companyResponse: SearchCompanyResponse;
  companiesData: Company[];
  query: string;
  location: string;
  distance: number;
  nextPage: number;
  filters: any;
  loading: boolean;
  activePage: number;
  setShowProfile: any;
  user: any;
  history: any;
  match: any;
}

interface State {
  adNum: number;
  adNum2: number[];
  currentPage: number;
  companyId: string;
  message: string;
  totalResults: number;
  isSellerAvailble: boolean;
  snackbar: boolean;
  requestModal: boolean;
  screen_loader: boolean;
  snackbarSuccess: boolean;
  companyModal: boolean;
  multi: boolean;
  industries: any;
  multi_companies: any;
  suggestedCompanies?: any;
}

interface DispatchProps {
  loadMore(params: any): void;
}

interface Classess {
  classes: any;
}

type Props = StateProps & DispatchProps & Classess;
class CompaniesList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      adNum: Math.floor(Math.random() * 3),
      adNum2: [],
      multi_companies: [],
      snackbarSuccess: true,

      currentPage: 1,
      totalResults: 0,
      suggestedCompanies: {
        company_name: "",
        companies: [],
        page: 1,
        totalItemsCount: 0,
      },
      industries: [],
      screen_loader: false,
      isSellerAvailble: true,
      multi: false,
      requestModal: false,
      companyModal: false,
      snackbar: false,
      companyId: "",
      message: "",
    };
  }

  async componentDidMount() {
    const response: any = await appApi.get("/industries");
    this.setState({
      industries: response.data,
    });
    const {activePage, companiesData} = this.props;
    this.setState({currentPage: activePage});
    const arr = [];
    while (arr.length < companiesData.length) {
      const r = Math.floor(Math.random() * 3);
      arr.push(r);
    }

    const total = (activePage - 1) * 20;
    this.setState({totalResults: total});

    const {history} = this.props;
    const query = qs.parse(history.location.search, {ignoreQueryPrefix: true}) as any;
    if (query.company) {
      this.handleRequestProposal(query.company);
    }
  }

  handlePageChange = (pageNumber: number) => {
    this.setState({currentPage: pageNumber});
    const _query = qs.parse(this.props.history.location.search, {ignoreQueryPrefix: true}) as any;
    this.props.history.push({
      pathname: this.props.match.url,
      search: `?location=${_query.location}&page=${pageNumber}`,
    });
  };

  handleRequestModal = async () => {
    this.setState({
      requestModal: !this.state.requestModal,
    });
  };

  handleCompanyModal = async () => {
    this.setState({
      companyModal: !this.state.companyModal,
    });
  };

  handleSuggestionsCompanyList = (page: number) => {
    this.setState(
      {
        suggestedCompanies: {
          ...this.state.suggestedCompanies,
          page: page,
        },
      },
      () => {
        this.handleRequestProposal(this.state.companyId);
      }
    );
  };

  handleRequestProposal = async (companyId: string) => {
    const {user} = this.props;

    if (companyId != this.state.companyId) {
      this.setState({
        suggestedCompanies: {
          ...this.state.suggestedCompanies,
          page: 1,
        },
      });
      const _self = this;
      appApi.get(`/companies/${companyId}/request/proposal/count`).then(response => {
        _self.setState({
          suggestedCompanies: {
            ..._self.state.suggestedCompanies,
            totalItemsCount: Number(response.data.totalCount),
          },
        });
      });
    }

    this.setState({
      companyModal: false,
      multi: false,
      screen_loader: true,
    });

    if (!user.isAuthenticated) {
      const {history} = this.props;
      localStorage.setItem(
        "_location",
        JSON.stringify(`${history.location.pathname}${history.location.search}&company=${companyId}`)
      );
      return (window.location.href = "/signin");
    }

    const {suggestedCompanies} = this.state;

    const response: any = await appApi.get(
      `/companies/${companyId}/request/proposal?page=${suggestedCompanies.page || 1}`
    );

    if (response.data.isAvailable) {
      this.setState({
        requestModal: !this.state.requestModal,
        screen_loader: false,
        isSellerAvailble: response.data.isSellerAvailble,
        suggestedCompanies: {
          ...this.state.suggestedCompanies,
          company_name: response.data.company_name,
          companies: [],
        },
        companyId: response.data.companyId,
      });
    } else {
      this.setState({
        suggestedCompanies: {
          ...this.state.suggestedCompanies,
          company_name: response.data.company_name,
          companies: response.data.companies,
        },
        screen_loader: false,
        companyModal: !this.state.companyModal,
        isSellerAvailble: false,
        companyId: companyId,
      });
    }
  };

  formSendInquiry = async (data: any) => {
    const {setSubmitting, values, resetForm} = data;
    const {companyId, isSellerAvailble, multi_companies} = this.state;

    values.isSellerAvailble = isSellerAvailble;

    try {
      if (this.state.multi) {
        values.comapnies = multi_companies;
        values.isSellerAvailble = true;
        const response = await appApi.post(`/companies/request/proposal/send`, values);
        this.setState({
          snackbarSuccess: true,
          snackbar: !this.state.snackbar,
          message: response.data.message,
          requestModal: false,
        });
      } else {
        const response = await appApi.post(`/companies/${companyId}/request/proposal/send`, values);
        this.setState({
          snackbarSuccess: true,
          snackbar: !this.state.snackbar,
          message: response.data.message,
          requestModal: false,
        });
      }

      resetForm();
    } catch (error) {
      this.setState({
        snackbar: true,
        snackbarSuccess: false,
        message: "There was an error processing your request. Please try again.",
        requestModal: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  handleMultipleCompany = async (data: any) => {
    const {values} = data;
    this.setState({
      companyModal: false,
      multi_companies: values.companies,
      requestModal: !this.state.requestModal,
      multi: true,
    });
  };

  handleSortFilter = (e: any) => {
    const {query, location, distance, filters, loadMore} = this.props;
    const params = {
      query,
      location,
      distance,
      // page:this.props.activePage,
      filters,
      sortFilters: e.target.value,
    };

    loadMore(params);
  };

  handleSnackBar = () => {
    this.setState({
      snackbar: !this.state.snackbar,
    });
  };

  render() {
    const {currentPage, suggestedCompanies, snackbarSuccess} = this.state;
    const {companyResponse, companiesData, loading, activePage, setShowProfile} = this.props;
    let {companies} = companyResponse;
    const {total, totalPages} = companyResponse;
    const sponsoredResults = [];
    const allResults = [];
    const arr: number[] = [];

    if (companiesData.length > 0) {
      for (let index = 0; index < companiesData.length; index += 1) {
        const element = companiesData[index];
        if (element.paid >= 2) {
          sponsoredResults.push(element);
        } else {
          allResults.push(element);
        }
      }
    }
    while (arr.length < companiesData.length) {
      const r = Math.floor(Math.random() * 3);
      arr.push(r);
    }

    if (companies === undefined) {
      companies = [];
    }
    const page = companyResponse.page ? companyResponse.page : 1;
    const maxPageTotal = 20 * page;
    const upperCompanyNumber = maxPageTotal > (total || 0) ? total : maxPageTotal;
    const lowerCompanyNumber = maxPageTotal - 20 + 1;

    if (loading) {
      return (
        <Container className="pt-5">
          <div className="">{Loader()}</div>
        </Container>
      );
    }
    if (total !== 0) {
      return (
        <>
          <Snackbar open={this.state.snackbar} autoHideDuration={6000} onClose={this.handleSnackBar}>
            {snackbarSuccess ? (
              <Alert onClose={this.handleSnackBar} severity="success">
                {this.state.message}
              </Alert>
            ) : (
              <Alert onClose={this.handleSnackBar} severity="error">
                {this.state.message}
              </Alert>
            )}
          </Snackbar>

          <Backdrop className={this.props.classes.backdrop} open={this.state.screen_loader}>
            <CircularProgress className={this.props.classes.root} />
          </Backdrop>

          <ConfirmationDialogForm
            classes={{
              paper: this.props.classes.paper,
            }}
            industries={this.state.industries}
            multi_companies={this.state.multi_companies}
            multi={this.state.multi}
            formSendInquiry={this.formSendInquiry}
            open={this.state.requestModal}
            onClose={this.handleRequestModal}
            suggestedCompanies={suggestedCompanies}
          />

          <CompanyListModal
            classes={{
              paper: this.props.classes.paper,
            }}
            open={this.state.companyModal}
            totalItemsCount={this.state.suggestedCompanies.totalItemsCount}
            currentPage={this.state.suggestedCompanies.page}
            onClose={this.handleCompanyModal}
            handleSuggestionsCompanyList={this.handleSuggestionsCompanyList}
            handleRequestProposal={this.handleRequestProposal}
            handleMultipleCompany={this.handleMultipleCompany}
            company_name={suggestedCompanies.company_name}
            companies={suggestedCompanies.companies}
          />

          <Container className="mt-3">
            {total !== undefined && (
              <div className="no_of_record">
                Viewing {lowerCompanyNumber}-{upperCompanyNumber} of {total} Companies
              </div>
            )}
          </Container>
          <div className="companies_list">
            {sponsoredResults.length > 0 && <div className="divider_all">Sponsored Results</div>}

            <div className="row">
              {sponsoredResults.map((company, index) => (
                <React.Fragment key={index.toString()}>
                  <div
                    className="col-md-4 company_grid"
                    onKeyDown={() => {}}
                    role="menuitem"
                    tabIndex={index}
                    onClick={() => setShowProfile(true)}
                  >
                    <CompanyItem
                      handleRequestProposal={this.handleRequestProposal}
                      key={`${index + sponsoredResults.length}`}
                      company={company}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>

            {allResults.length > 0 && <div className="divider_all">All Results</div>}

            <div className="row">
              {allResults.map((company, index) => (
                <React.Fragment key={company.id}>
                  <div
                    className="col-md-4 company_grid"
                    onKeyDown={() => {}}
                    role="menuitem"
                    tabIndex={index}
                    onClick={() => setShowProfile(true)}
                  >
                    <CompanyItem
                      key={`${index + sponsoredResults.length}`}
                      handleRequestProposal={this.handleRequestProposal}
                      company={company}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>

            <Row className="align-items-center">
              <Col md={4} sm={3}>
                {total !== undefined && (
                  <div className="no_of_record">
                    Viewing {lowerCompanyNumber}-{upperCompanyNumber} of {total} Companies
                  </div>
                )}
              </Col>
              <Col md={4} sm={3}>
                <div className="hind_pagination">
                  <Pagination
                    hideFirstLastPages={true}
                    activePage={activePage}
                    totalItemsCount={total || 0}
                    itemsCountPerPage={20}
                    pageRangeDisplayed={5}
                    prevPageText={<ChevronLeftIcon />}
                    nextPageText={<ChevronRightIcon />}
                    itemClass="page-item"
                    hideDisabled
                    linkClass="page-link"
                    onChange={this.handlePageChange}
                  />
                </div>
              </Col>
              <Col md={4} sm={12} className="text-right">
                <span className="page-track">
                  Page {activePage || currentPage} of {totalPages}
                </span>
              </Col>
            </Row>
          </div>
        </>
      );
    }
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="no_result">
              <p className="no_result_text">Looks like your search did not return any results</p>
              <img className="no_result_img" src={noCompany} alt="NoCompany" />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    companyResponse: state.companies.searchResponse,
    companiesData: state.companies.companiesData,
    query: state.companies.query,
    location: state.companies.location,
    nextPage: state.companies.nextPage,
    distance: state.companies.distance,
    filters: state.companies.filters,
    error: state.companies.error,
    loading: state.companies.loading,
    activePage: state.companies.activePage,
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(CompaniesList));
