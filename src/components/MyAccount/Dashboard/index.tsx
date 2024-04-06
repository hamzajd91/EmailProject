import React, {Component, useState, useEffect, Suspense} from "react";
import moment from "moment";
import appApi from "../../../services/appApi";
import {Loader} from "../../Loader";
import FilterListIcon from "@material-ui/icons/FilterList";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Alert from "@material-ui/lab/Alert";
import dashboard from "../../../images/account/dashboard.png";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogTitle";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {DateRangePicker} from "react-date-range";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./index.scss";

const ExcelExport = React.lazy(() => import("./ExcelExport"));

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#154260",
    },
  },
  shadows: [
    "none",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -5px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
  ],
});

const default_date = {
  start_date: moment()
    .utc()
    .subtract(30, "days")
    .format("YYYY-MM-DD"),
  end_date: moment()
    .utc()
    .format("YYYY-MM-DD"),
};

class Dashboard extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      rangeModal: false,
      selection: {
        startDate: moment(default_date.start_date).toDate(),
        endDate: moment(default_date.end_date).toDate(),
        key: "selection",
      },
      export_data: {
        startDate: null,
        endDate: null,
        companyId: null,
      },
      companies: [],
      expanded: 0,
      export_modal: false,
    };
  }

  async componentDidMount() {
    try {
      const {data} = await appApi.get("users/claimed/companies");
      this.setState({
        companies: data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleAccordion = (panel: any) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    this.setState({
      expanded: isExpanded ? panel : false,
    });
  };

  setNewDates = () => {
    const {selection, companies} = this.state;
    const company_index = companies.findIndex((company: any) => selection.companyId == company.companyId);
    if (company_index >= 0) {
      this.state.companies[company_index] = {
        ...companies[company_index],
        start_date: moment(selection.startDate)
          .utc()
          .format("YYYY-MM-DD"),
        end_date: moment(selection.endDate)
          .utc()
          .format("YYYY-MM-DD"),
      };
      this.setState({
        rangeModal: false,
      });
    }
  };

  openRangeModal = (data: any) => {
    this.setState({
      selection: {
        ...this.state.selection,
        companyId: data.companyId,
        startDate: moment(data.start_date).toDate(),
        endDate: moment(data.end_date).toDate(),
      },
      rangeModal: true,
    });
  };

  exportModalHandler = () => {
    this.setState({
      export_modal: false,
    });
  };

  openExportModal = (data: any) => {
    this.setState(
      {
        export_data: data,
      },
      () => {
        this.setState({export_modal: true});
      }
    );
    // this.setState({
    //   export_modal: true,
    // });
  };

  render() {
    const {isLoading, selection, companies, export_data, rangeModal, export_modal, expanded} = this.state;

    return (
      <React.Fragment>
        <div className="pt-5">
          <div className="dashboard_header">
            <div>
              <img src={dashboard} />
            </div>
            <div className="dashboard_label">
              <h3 className="mb-0">Dashboard</h3>
            </div>
          </div>
        </div>
        <div className="card_box">
          <ThemeProvider theme={outerTheme}>
            {isLoading ? (
              <Loader />
            ) : companies.length > 0 ? (
              companies.map((company: any, index: number) => {
                return (
                  <Accordion key={index} expanded={expanded === index} onChange={this.handleAccordion(index)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        <b>{company.companyName}</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <CompanyList
                        {...{
                          ...company,
                          start_date: company.start_date || default_date.start_date,
                          end_date: company.end_date || default_date.end_date,
                        }}
                        openRangeModal={this.openRangeModal}
                        openExportModal={this.openExportModal}
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <Alert severity="info">You don't have any cliemed company. Please claim for get more informations.</Alert>
            )}
          </ThemeProvider>
        </div>

        {/* Excel export modal */}
        <Dialog
          fullWidth
          maxWidth={`sm`}
          open={export_modal}
          // onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogContent>
            <Suspense
              fallback={
                <div className="text-center">
                  <CircularProgress />
                  <p className="mb-2">Please wait...</p>
                </div>
              }
            >
              <ExcelExport exportModalHandler={this.exportModalHandler} export_data={export_data} />
            </Suspense>
          </DialogContent>
        </Dialog>

        {/* Date Range Modal */}
        <Dialog
          fullWidth={true}
          maxWidth={`md`}
          open={rangeModal}
          onClose={() =>
            this.setState({
              rangeModal: false,
            })
          }
        >
          <DialogTitle>Please select date range.</DialogTitle>
          <DialogContent>
            <DateRangePicker
              onChange={(item: any) => {
                this.setState({
                  ...this.state.selection,
                  selection: item.selection,
                });
              }}
              maxDate={new Date()}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={[selection]}
              direction="horizontal"
              inputRanges={[]}
            />
          </DialogContent>
          <DialogActions>
            <div className="text-right">
              <button type="button" onClick={() => this.setNewDates()} className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                onClick={() =>
                  this.setState({
                    rangeModal: false,
                  })
                }
                className="btn ml-2 btn-secondary"
              >
                Close
              </button>
            </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

function TabPanel(props: any) {
  const {children, value, index, ...other} = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function CompanyList(props: any) {
  const {companyId} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [users_clicked_profile, setUsersClickedProfile] = useState(0);
  const [number_of_times_search_appear, setNumberOfTimesSearchAppear] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setIsLoading(true);
    getData(props.start_date, props.end_date);
  }, [props.start_date, props.end_date]);

  const getData = async (start_date: any, end_date: any) => {
    try {
      const {data} = await appApi.get(
        `/analytics/data/${props.companyId}?start_date=${start_date}&end_date=${end_date}`
      );
      setUsersClickedProfile(data.users_clicked_profile);
      setNumberOfTimesSearchAppear(data.number_of_times_search_appear);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard_company_block w-100 mb-3">
      <div className="d-flex align-items-center">
        Showing data from&nbsp;<b className="text-success">{moment(props.start_date).format("MM-DD-YYYY")}</b>
        &nbsp;to&nbsp;
        <b className="text-success">{moment(props.end_date).format("MM-DD-YYYY")}</b>
        <div className="ml-auto">
          <button
            className="btn btn-sm text-white-btn btn-primary"
            onClick={() =>
              props.openRangeModal({
                start_date: props.start_date,
                end_date: props.end_date,
                companyId,
              })
            }
          >
            <FilterListIcon />
          </button>
          <button
            className="btn btn-sm text-white ml-2 btn-primary"
            onClick={() =>
              props.openExportModal({
                start_date: props.start_date,
                end_date: props.end_date,
                companyId,
              })
            }
          >
            <svg aria-hidden="true" focusable="false" width="25px" height="25px" viewBox="0 0 24 24">
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m1.8 18H14l-2-3.4l-2 3.4H8.2l2.9-4.5L8.2 11H10l2 3.4l2-3.4h1.8l-2.9 4.5l2.9 4.5M13 9V3.5L18.5 9H13z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <table className="table table-hover mt-4 table-bordered">
            <thead>
              <tr>
                <td>
                  <b>Total number of users that had clicked on to the company profile</b>
                </td>
                <td>{users_clicked_profile}</td>
              </tr>
            </thead>
          </table>

          <table className="table mt-4 table-bordered">
            <thead style={{backgroundColor: "#d8d8d8"}}>
              <tr>
                <td colSpan={3}>
                  <b>Total number of times the company profile appears in a search result</b>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Date</b>
                </td>
                <td>
                  <b>Search Terms used for search</b>
                </td>
                <td>
                  <b>Counts</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {number_of_times_search_appear.length > 0 ? (
                number_of_times_search_appear.map((_info: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      {_info.searchTerms.map((searchTerms: any, _index: number) => {
                        return (
                          <tr key={_index}>
                            {_index == 0 ? (
                              <td rowSpan={_info.searchTerms.length}>{moment(_info.createdAt).format("MM-DD-YYYY")}</td>
                            ) : null}
                            <td>{searchTerms.searchTerm}</td>
                            <td>{searchTerms.counts}</td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3}>
                    <Alert severity="info">Information not available.</Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Paper square>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="User clicked on the company profile page" />
              <Tab label="User saved the company profile" />
            </Tabs>

            <TabPanel value={value} index={0}>
              <UserClicksTable start_date={props.start_date} end_date={props.end_date} companyId={companyId} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UserSavedCompany start_date={props.start_date} end_date={props.end_date} companyId={companyId} />
            </TabPanel>
          </Paper>
        </>
      )}
    </div>
  );
}

function UserClicksTable(props: any) {
  const {start_date, end_date} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData]: any = useState({
    isAvailable: true,
    page: 0,
    total: 0,
    companyProfileViews: [],
  });
  useEffect(() => {
    setIsLoading(true);
    setData({isAvailable: true, page: 0, total: 0, companyProfileViews: []});
    getProfileClicks(start_date, end_date, 1);
  }, [start_date, end_date]);

  const getProfileClicks = async (start_date: any, end_date: any, page: any) => {
    try {
      const response = await appApi.get(
        `/analytics/data/${props.companyId}/clicks?page=${page}&start_date=${start_date}&end_date=${end_date}`
      );

      setData({
        isAvailable: response.data.isAvailable,
        page: response.data.page,
        total: response.data.total,
        companyProfileViews: data.companyProfileViews.concat(response.data.companyProfileViews),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreData = () => {
    getProfileClicks(start_date, end_date, data.page + 1);
  };

  const getUserProfile = (profile: any) => {
    return (
      <>
        {profile.isPrivate ? (
          <Tooltip
            placement="top"
            interactive
            title={
              <div className="text-white">
                Please{" "}
                <a href={`/company/${props.companyId}/subscribe`}>
                  <b className="text-white">UPGRADE</b>
                </a>{" "}
                your subscription for more details.
              </div>
            }
          >
            <span className={`${profile.isPrivate ? "is_blur" : ""}`}>
              {`${profile.firstName} ${profile.lastName}`}
            </span>
          </Tooltip>
        ) : (
          <span>{`${profile.firstName} ${profile.lastName}`}</span>
        )}
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {data.isAvailable ? (
            data.companyProfileViews.length != 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Counts</th>
                  </tr>
                </thead>
                <tbody>
                  {data.companyProfileViews.map((_profile: any, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        {_profile.data.map((profile: any, _index: number) => {
                          return (
                            <tr key={_index}>
                              {_index == 0 ? (
                                <td className="align-middle" rowSpan={_profile.data.length}>
                                  {moment(_profile.createdAt).format("MM-DD-YYYY")}
                                </td>
                              ) : null}
                              <td className="align-middle">
                                <CardHeader
                                  className="p-0"
                                  avatar={
                                    <Avatar alt={`${profile.firstName} ${profile.lastName}`} src={profile.picture} />
                                  }
                                  title={getUserProfile(profile)}
                                />
                              </td>
                              <td className="align-middle">
                                {profile.isPrivate ? (
                                  <Tooltip
                                    placement="top"
                                    interactive
                                    title={
                                      <div className="text-white">
                                        Please{" "}
                                        <a href={`/company/${props.companyId}/subscribe`}>
                                          <b className="text-white">UPGRADE</b>
                                        </a>{" "}
                                        your subscription for more details.
                                      </div>
                                    }
                                  >
                                    <span className={`${profile.isPrivate ? "is_blur" : ""}`}>{profile.counts}</span>
                                  </Tooltip>
                                ) : (
                                  <span className={`${profile.isPrivate ? "is_blur" : ""}`}>{profile.counts}</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                  {data.isAvailable && data.companyProfileViews.length != data.total ? (
                    <tr>
                      <td colSpan={3} className="text-center">
                        <button disabled={isLoading} className="btn btn-primary" onClick={() => loadMoreData()}>
                          Load More
                        </button>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            ) : (
              <Alert severity="info">Information not available.</Alert>
            )
          ) : (
            <Alert severity="error">
              Please upgrade your subscription to Basic or Plus subscription to get more informations.
            </Alert>
          )}
        </>
      )}
    </>
  );
}

function UserSavedCompany(props: any) {
  const {start_date, end_date} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData]: any = useState({
    isAvailable: true,
    page: 0,
    total: 0,
    companyProfileBookmarks: [],
  });
  useEffect(() => {
    setIsLoading(true);
    setData({
      isAvailable: true,
      page: 0,
      total: 0,
      companyProfileBookmarks: [],
    });
    getProfileSaved(start_date, end_date, 1);
  }, [start_date, end_date]);

  const getProfileSaved = async (start_date: any, end_date: any, page: any) => {
    try {
      const response = await appApi.get(
        `/analytics/data/${props.companyId}/saved?page=${page}&start_date=${start_date}&end_date=${end_date}`
      );
      setData({
        isAvailable: response.data.isAvailable,
        page: response.data.page,
        total: response.data.total,
        companyProfileBookmarks: data.companyProfileBookmarks.concat(response.data.companyProfileBookmarks),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreData = () => {
    getProfileSaved(start_date, end_date, data.page + 1);
  };

  const getUserProfile = (_profile: any) => {
    return _profile.isPrivate ? (
      <Tooltip
        interactive
        placement="top"
        title={
          <div className="text-white">
            Please{" "}
            <a href={`/company/${props.companyId}/subscribe`}>
              <b className="text-white">UPGRADE</b>
            </a>{" "}
            your subscription for more details.
          </div>
        }
      >
        <span className={`${_profile.isPrivate ? "is_blur" : ""}`}>
          {`${_profile.firstName}  ${_profile.lastName}`}
        </span>
      </Tooltip>
    ) : (
      <span className={`${_profile.isPrivate ? "is_blur" : ""}`}>{`${_profile.firstName}  ${_profile.lastName}`}</span>
    );
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {data.isAvailable ? (
            data.companyProfileBookmarks.length != 0 ? (
              <React.Fragment>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.companyProfileBookmarks.map((_profile: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td className="align-middle">{moment(_profile.createdAt).format("MM-DD-YYYY")}</td>
                          <td className="align-middle">
                            <CardHeader
                              className="p-0"
                              avatar={
                                <Avatar alt={`${_profile.firstName} ${_profile.lastName}`} src={_profile.picture} />
                              }
                              title={getUserProfile(_profile)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </React.Fragment>
            ) : (
              <Alert severity="info">Information not available.</Alert>
            )
          ) : (
            <div className="text-center">
              <Alert severity="error">
                Please upgrade your subscription to Basic or Plus subscription to get more informations.
              </Alert>
            </div>
          )}

          {data.isAvailable && data.companyProfileBookmarks.length != data.total ? (
            <div className="text-center">
              <button disabled={isLoading} className="btn btn-primary" onClick={() => loadMoreData()}>
                Load More
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default Dashboard;
