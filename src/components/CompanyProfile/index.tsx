import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { RouteComponentProps, Link } from "react-router-dom";
import { Dispatch, bindActionCreators } from "redux";
import { Container, Row, Col, Fade, OverlayTrigger, Popover } from "react-bootstrap";
import { faShareAlt, faChevronDown, faChevronUp, faBookmark as bookmared } from "@fortawesome/free-solid-svg-icons";
import youtube from "../../images/youtube-social.svg";
import twitter from "../../images/twitter.svg";
import linkedin from "../../images/linkedin-social.svg";
import facebook from "../../images/facebook-social.svg";
import ratingOptions from "../../data/ratingOptions";
import bg from "../../images/profile_default.png";
import generic_logo from "../../images/generic_logo_profile.jpg";
import noReview from "../../images/no_review.png";
import infoCircle from "../../images/information-outline.svg";
import "./index.scss";
import Review from "./ReviewSection";
import { CompanyProfileState } from "../../store/ducks/companyProfile/types";
import * as companyProfileActions from "../../store/ducks/companyProfile/actions";
import { ApplicationState } from "../../store";
import { Loading } from "../Loader";
import LearnMore from "../CompanyModals/LearnMore";
import Reclaim from "../CompanyModals/Reclaim";
import AlreadyOwned from "../CompanyModals/AlreadyOwned";
import ClaimCompany from "../CompanyModals/ClaimCompany";
import Maps from "../GoogleMaps/Maps";
import Stars from "./ReviewSection/Stars";
import NoRatings from "./ReviewSection/NoRatings";
import Share from "../CompanyModals/Share";
import { UserState } from "../../store/ducks/user/types";
import ratingDateFilters from "../../data/ratingDateOptions";
import SchemaOrg from "./SchemaOrg";
import * as Yup from "yup";
import { Formik } from "formik";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import appApi from "../../services/appApi";
import urlGenerate from "../../services/urlGenerate";
import _ from "lodash";
import CompanyListModal from "../CompaniesList/CompanyListModal";
import ConfirmationDialogForm from "../CompaniesList/ConfirmationDialogForm";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Address from "../CompanyProfile/DescriptionSection/Address";

// Validation schema
const emailSchema = Yup.object().shape({
  company_website: Yup.string()
    .required("Company website is required.")
    .matches(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, "Enter valid website."),
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface ProficiencyObject {
  id: number;
  name: string;
  key: string;
  categoryId: any;
  companyId: any;
}
interface StateProps {
  profile: CompanyProfileState;
  user: UserState;
}
interface DispatchProps {
  getProfile(params: any): void;
  setCompanyEmail(params: any): void;
  loadMoreReviews(params: any): void;
  loadProfile(): void;
  claimCompany(body: any): void;
  updateBanner(data: any): void;
  bookmarkCompany(params: any): void;
  shareCompany(params: any): void;
  filterReviews(params: any): void;
  setHelpfulReview(params: any): void;
  removeHelpfulReview(params: any): void;
}

// @ts-ignore
interface State {
  email_modal: boolean;
  toggle: boolean;
  companyId: any;
  claimed: boolean;
  mapsCoordinates: string;
  learnMoreModal: boolean;
  claimModal: boolean;
  reclaimModal: boolean;
  alreadyOwnedModal: boolean;
  shareModal: boolean;
  imageBannerPreviewUrl: any;
  imageLogoPreviewUrl: any;
  isBookmarked: any;
  showMoreMargin: number;
}

interface RouteParams {
  id: string;
}

// @ts-ignore
type Props = StateProps & DispatchProps & RouteComponentProps<RouteParams>;
class CompanyProfile extends React.Component<any, any> {
  private claimRef: any;

  constructor(props: any) {
    super(props);
    this.claimRef = React.createRef();
    this.state = {
      companyId: null,
      email_modal: false,
      toggle: true,
      claimed: true,
      mapsCoordinates: "",
      learnMoreModal: false,
      claimModal: false,
      reclaimModal: false,
      alreadyOwnedModal: false,
      shareModal: false,
      imageBannerPreviewUrl: "",
      imageLogoPreviewUrl: "",
      isBookmarked: this.props.profile.profile.favorite,
      showMoreMargin: -150,
      isWebSiteErrorShow: false,
      screen_loader: false,
      suggestedCompanies: {
        company_name: "",
        companies: [],
        page: 1,
        totalItemsCount: 0,
      },
      isSellerAvailble: true,
      multi: false,
      industries: [],
      requestModal: false,
      companyModal: false,
      requestcompanyId: null,

      snackbarSuccess: false,
    };
  }

  handleRequestProposal = async (companyId: any) => {
    const { user } = this.props;
    if (companyId != this.state.requestcompanyId) {
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
      const { history } = this.props;
      localStorage.setItem("_location", JSON.stringify(`${history.location.pathname}`));
      return (window.location.href = "/signin");
    }

    const { suggestedCompanies } = this.state;

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
        requestcompanyId: response.data.companyId,
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

  handleRequestModal = async () => {
    this.setState({
      requestModal: !this.state.requestModal,
    });
  };

  handleMultipleCompany = async (data: any) => {
    const { values } = data;
    this.setState({
      companyModal: false,
      multi_companies: values.companies,
      requestModal: !this.state.requestModal,
      multi: true,
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
        this.handleRequestProposal(this.state.requestcompanyId);
      }
    );
  };

  handleSnackBar = () => {
    this.setState({
      snackbar: !this.state.snackbar,
    });
  };

  formSendInquiry = async (data: any) => {
    const { setSubmitting, values, resetForm } = data;
    const { companyId, isSellerAvailble, multi_companies } = this.state;

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

  setShowMoreMargin = () => {
    const margin = this.state.showMoreMargin === 0 ? -150 : 0;
    this.setState({ showMoreMargin: margin });
  };

  getLocationString = (company: any) => {
    const state = company.state;
    const city = company.city;
    const address1 = company.address1;
    const buildingNumberEnd = address1.indexOf(" ");
    const roomNumberStart = address1.indexOf("#");
    let street;
    if (roomNumberStart === -1) {
      street = address1.substring(buildingNumberEnd);
    } else {
      street = address1.substring(buildingNumberEnd, roomNumberStart);
    }
    return `${city}, ${state} - ${street}`;
  };

  handleCoordinates = (newCoordinates: string) => {
    if (newCoordinates) {
      this.setState({ mapsCoordinates: newCoordinates });
    }
  };

  openPopOver = () => {
    this.claimRef.current.click();
  };

  openClaimModal = () => {
    // this.claimRef.current.click();
    if (
      this.props.profile.profile.website == null ||
      this.props.profile.profile.website == "" ||
      this.props.profile.profile.website == " "
    ) {
      return this.setState({
        email_modal: true,
      });
    }

    this.setState({
      claimModal: true,
    });
  };

  closeClaimModal = () => {
    this.setState({ claimModal: false });
  };

  openReclaimModal = () => {
    // this.claimRef.current.click();
    this.setState({ reclaimModal: true });
  };

  handleClose = () => {
    this.setState({
      email_modal: false,
      isWebSiteErrorShow: false
    });
  };

  handleClickOpen = () => {
    this.setState({
      email_modal: true,
    });
  };

  updateCompanyWebsite = async ({ values, setErrors, setSubmitting }: any) => {
    const response = await appApi.put(`/company/update/website/${this.state.companyId}`, values).then((response) => {
      this.setState({
        email_modal: false,
        claimModal: true,
      });
      this.props.setCompanyEmail({ data: response.data });
    }).catch((error) => {
      this.setState({ isWebSiteErrorShow: true });
      // if (error.response) {
      //   // Request made and server responded
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   console.log(error.request);
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   console.log('Error', error.message);
      // }
    }).finally(() => {
      setSubmitting(false);
    });

    // try {
    //   const response = await appApi.put(`/company/update/website/${this.state.companyId}`, values);
    //   this.setState({
    //     email_modal: false,
    //     claimModal: true,
    //   });
    //   this.props.setCompanyEmail({ data: response.data });
    //   // window.location.reload();
    // } catch (error) {
    //   if (error.response) {
    //     // Request made and server responded
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    // } finally {
    //   setSubmitting(false);
    // }
  };

  closeReclaimModal = () => {
    this.setState({ reclaimModal: false });
  };

  openAlreadyOwnedModal = () => {
    // this.claimRef.current.click();
    this.setState({ alreadyOwnedModal: true });
  };

  closeAlredyOwnedModal = () => {
    this.setState({ alreadyOwnedModal: false });
  };

  openLearnMoreModal = () => {
    this.claimRef.current.click();
    this.setState({ learnMoreModal: true });
  };

  closeLearnMoreModal = () => {
    this.setState({ learnMoreModal: false });
  };

  openShareModal = () => {
    this.setState({ shareModal: true });
  };

  closeShareModal = () => {
    this.setState({ shareModal: false });
  };

  toggleReviws = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle });
  };

  handleUpdateBanner = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageBannerPreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    const data = new FormData();
    data.append("image", e.target.files[0]);
    data.append("type", "banner");
    const body = {
      data,
      id: this.props.profile.profile.id,
    };
    this.props.updateBanner(body);
  };

  handleUpdateLogo = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageLogoPreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    const data = new FormData();
    data.append("image", e.target.files[0]);
    data.append("type", "icon");
    const body = {
      data,
      id: this.props.profile.profile.id,
    };
    this.props.updateBanner(body);
  };

  handleBookmarkCompany = (favorite: any) => {
    console.log(favorite);
    const params = {
      id: this.props.profile.profile.id,
      favorite,
    };
    ; this.props.bookmarkCompany(params);
    this.setState({ isBookmarked: !this.state.isBookmarked });
  };

  handleRatingChange = (e: any) => {
    const params = {
      currentFilters: {
        r_s: e.target.value,
        r_d: Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.date : "0",
        r_l:
          Object.keys(this.props.profile.currentFilters).length !== 0
            ? this.props.profile.currentFilters.location
            : "0",
        r_o: Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.sort : "0",
      },
      companyId: this.props.profile.profile.id,
    };
    this.props.filterReviews(params);
  };

  handleDateChange = (e: any) => {
    const params = {
      currentFilters: {
        r_s:
          Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.score : "0",
        r_d: e.target.value,
        r_l:
          Object.keys(this.props.profile.currentFilters).length !== 0
            ? this.props.profile.currentFilters.location
            : "0",
        r_o: Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.sort : "0",
      },
      companyId: this.props.profile.profile.id,
    };
    this.props.filterReviews(params);
  };

  handleLocationChange = (e: any) => {
    const params = {
      currentFilters: {
        r_s:
          Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.score : "0",
        r_d: Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.date : "0",
        r_l: e.target.value,
        r_o: Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.sort : "0",
      },
      companyId: this.props.profile.profile.id,
    };
    this.props.filterReviews(params);
  };

  handleSortChange = (e: any) => {
    const params = {
      currentFilters: {
        r_s:
          Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.score : "0",
        r_d: Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.date : "0",
        r_l:
          Object.keys(this.props.profile.currentFilters).length !== 0
            ? this.props.profile.currentFilters.location
            : "0",
        r_o: e.target.value,
      },
      companyId: this.props.profile.profile.id,
    };
    this.props.filterReviews(params);
  };

  async componentDidMount() {
    // const description = document.querySelector('meta[name="description"]');
    // if (description) {
    //   description.remove();
    // }
    const response: any = await appApi.get("/industries");
    this.setState({
      industries: response.data,
    });
    const params = this.props.match.params as any;
    this.setState({ companyId: params.id });
    // TODO: on pressing back button of browser it uses old hit
    this.props.getProfile({ id: params.id, new: true });

    window.scrollTo(0, 0);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (!nextProps.profile.loading && !_.isEqual(nextProps.profile.profile, this.props.profile.profile)) {
      this.props.history.push(
        `/profile/${urlGenerate(nextProps.profile.profile.name)}/${nextProps.profile.profile.id}`
      );
    }
  }

  reviewHandler = () => {
    // if the user is not logged in express will handle it
    const { match } = this.props;
    window.location.href = `${process.env.REACT_APP_CLIENT_HOST}/company/profile/${match.params.id}/writeReview`;
  };

  loadMore = () => {
    this.props.loadMoreReviews({
      id: this.state.companyId,
      page: this.props.profile.pages,
      currentFilters: {
        r_s:
          Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.score : "0",
        r_d: Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.date : "0",
        r_l:
          Object.keys(this.props.profile.currentFilters).length !== 0
            ? this.props.profile.currentFilters.location
            : "0",
        r_o: Object.keys(this.props.profile.currentFilters).length !== 0 ? this.props.profile.currentFilters.sort : "0",
      },
    });
  };

  render() {
    const {
      profile,
      loading,
      reviews,
      permissions,
      currentFilters,
      reviewsResponse,
      profile: { subscriptionLevel },
      // subscriptionLevel,
    } = this.props.profile;
    const { companyId } = this.state;


    let proficiencies: any[] = [];
    if (profile.proficiencies) {

      profile.proficiencies.map((prof: any, index: number) => {
        if (profile.subscriptionFeatures.proficiencies > index) {
          proficiencies.push(prof);
        }
      });


    }


    const UpdarePopOver = (
      <Popover.Content>
        <p>
          There are more functionalities in the next subscription levels that can help you grow your business. To see
          features and benefits for the different subscription levels.
        </p>
      </Popover.Content>
    );

    const popOverBody = profile.claimed ? (
      <Popover.Content>
        <p>This business has been claimed by the owner or a representative.</p>
        <div>
          <button type="button" onClick={this.openLearnMoreModal} className="learn_more_btn">
            LEARN MORE
          </button>
          {profile.loggedUserId ? (
            <button
              type="button"
              onClick={
                Number(profile.claimed.id) === profile.loggedUserId ? this.openAlreadyOwnedModal : this.openReclaimModal
              }
              className="reclaim_popover_btn"
            >
              RECLAIM
            </button>
          ) : (
            <button
              type="button"
              id="reclaimBtn"
              onClick={() => {
                window.location.href = `${process.env.REACT_APP_CLIENT_HOST}/company/claim-details/${this.state.companyId}`;
              }}
              className="reclaim_popover_btn"
            >
              RECLAIM
            </button>
          )}
        </div>
      </Popover.Content>
    ) : (
      <Popover.Content>
        <p>This business has not yet been claimed by the owner or a representative.</p>
        <p>Are you the owner? Claim this business to get profile insights and statistics</p>
        {profile.loggedUserId ? (
          <button type="button" onClick={this.openClaimModal} className="claim_popover_btn">
            CLAIM BUSINESS
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              window.location.href = `/company/claim-details/${this.state.companyId}`;
            }}
            className="claim_popover_btn"
          >
            CLAIM BUSINESS
          </button>
        )}
      </Popover.Content>
    );
    if (loading) {
      return Loading();
    }
    let profileContent;
    if (Object.keys(profile).length !== 0) {
      const whole = Math.floor(profile.ratings.average);
      const half = Number((profile.ratings.average % whole).toFixed(1)) >= 0.4;
      const empty = 5 - whole - (half ? 1 : 0);
      let avgwhole = 0;
      let avghalf = false;
      let avg = 0;
      let avgempty = 0;
      if (Object.keys(reviewsResponse).length !== 0) {
        reviewsResponse.ratings.categories.forEach((res: any) => {
          avg += parseFloat(res.score);
        });
        avg = parseFloat((avg / 5).toFixed(1));
        avgwhole = Math.floor(avg);
        avghalf = Number((avg % avgwhole).toFixed(1)) >= 0.4;
        avgempty = 5 - avgwhole - (avghalf ? 1 : 0);
      }
      profileContent = (
        <>
          <Dialog
            fullWidth={true}
            maxWidth={`sm`}
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.email_modal}
          >
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              Enter Website
            </DialogTitle>
            <Formik
              initialValues={{
                company_website: "",
              }}
              enableReinitialize={true}
              validationSchema={emailSchema}
              onSubmit={(values: any, { setErrors, setSubmitting }) => {
                this.updateCompanyWebsite({ values, setErrors, setSubmitting });
              }}
            >
              {({ values, errors, touched, handleSubmit, handleChange, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="form_main">
                  <DialogContent dividers>
                    <TextField
                      error={errors.company_website && touched.company_website ? true : false}
                      label="Company Website"
                      variant="outlined"
                      style={{ width: "100%" }}
                      defaultValue={values.company_website}
                      helperText={errors.company_website && touched.company_website ? errors.company_website : null}
                      name="company_website"
                      onChange={handleChange}
                    />
                    {this.state.isWebSiteErrorShow === true && (<p className="text-danger mt-2">You have not ownership for update website</p>)}
                  </DialogContent>
                  <DialogActions>
                    <button className="submitButton" type="submit" disabled={isSubmitting}>
                      Save
                    </button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Dialog>

          <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
            <title>
              {profile.name}, {profile.city}, {profile.state}
            </title>
            <meta name="title" content={`${profile.name}, ${profile.city}, ${profile.state}`} />
            <meta property="og:title" content={`${profile.name}, ${profile.city},${profile.state}`} />
            <meta property="og:url" content={`${process.env.REACT_APP_CLIENT_HOST}/profile${profile.id}`} />
            <meta property="og:image" content={profile.icon !== null ? profile.icon : generic_logo} />
            <meta name="description" content={`${profile.tagline}`} />
            <meta property="og:description" content={`${profile.tagline}`} />
          </Helmet>

          <SchemaOrg
            url={`${process.env.REACT_APP_CLIENT_HOST}/profile${profile.id}`}
            title={`${profile.name}, ${profile.city}, ${profile.state}`}
            image={profile.icon !== null ? profile.icon : generic_logo}
            description={`${profile.tagline}`}
            siteUrl={`${process.env.REACT_APP_CLIENT_HOST}/profile/${profile.id}`}
            defaultTitle={`${profile.name}, ${profile.city},${profile.state}`}
          />

          <ClaimCompany
            show={this.state.claimModal}
            user={this.props.user.user}
            profile={profile}
            claim={this.props.claimCompany}
            closeClaimModal={this.closeClaimModal}
          />
          <Reclaim
            show={this.state.reclaimModal}
            owner={profile.claimed}
            reclaim={this.props.claimCompany}
            user={this.props.user.user}
            profile={profile}
            closeReclaimModal={this.closeReclaimModal}
          />
          <AlreadyOwned show={this.state.alreadyOwnedModal} closeAlredyOwnedModal={this.closeAlredyOwnedModal} />
          <LearnMore show={this.state.learnMoreModal} closeLearnMoreModal={this.closeLearnMoreModal} />
          <Share
            profile={profile}
            share={this.props.shareCompany}
            profileUrl={`${process.env.REACT_APP_CLIENT_HOST}/profile/${profile.id}`}
            show={this.state.shareModal}
            closeShareModal={this.closeShareModal}
          />

          <div className="info_bg">
            <Container>
              <Row>
                <div className="profile_details">
                  <div className="profile_image_wrapper">
                    <img
                      className="profile_image"
                      src={
                        profile.icon
                          ? this.state.imageLogoPreviewUrl === ""
                            ? profile.icon
                            : `${this.state.imageLogoPreviewUrl}`
                          : this.state.imageLogoPreviewUrl === ""
                            ? generic_logo
                            : `${this.state.imageLogoPreviewUrl}`
                      }
                      alt="profile"
                    />

                    {permissions.canEdit && (
                      <div className="edit-logo" id="edit-logo" title="">
                        <div style={{ position: "relative" }}>
                          <button className="btn">EDIT LOGO</button>
                          <input onChange={this.handleUpdateLogo} className="icon" type="file" name="edit-image" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="social_icons">
                    {profile.loggedUserId ? (
                      profile.favorite ? (
                        <button onClick={() => this.handleBookmarkCompany(profile.favorite)} className="btn like">
                          <FontAwesomeIcon title="Bookmarked" icon={bookmared} />
                        </button>
                      ) : (
                        <button onClick={() => this.handleBookmarkCompany(profile.favorite)} className="btn like">
                          <FontAwesomeIcon title="Bookmark" icon={faBookmark} />
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => {
                          window.location.href = `${process.env.REACT_APP_CLIENT_HOST}/signin?redirect=profile/${profile.id}?&react=true`;
                        }}
                        className="btn like"
                      >
                        <FontAwesomeIcon title="Bookmark" icon={faBookmark} />
                      </button>
                    )}

                    {profile.social.linkedin && (
                      <a
                        onClick={() =>
                          window.open(
                            /(http(s?)):\/\//i.test(profile.social.linkedin)
                              ? profile.social.linkedin
                              : `http://${profile.social.linkedin}`,
                            "_blank"
                          )
                        }
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="21.5" height="20.5" viewBox="0 0 21.5 20.5">
                          <g id="linkedin_2_" data-name="linkedin (2)" transform="translate(-1.25 -1.25)">
                            <path
                              id="Path_83"
                              data-name="Path 83"
                              d="M16,8a6,6,0,0,1,6,6v7H18V14a2,2,0,0,0-4,0v7H10V14a6,6,0,0,1,6-6Z"
                              fill="none"
                              stroke="#005cb9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            />
                            <rect
                              id="Rectangle_182"
                              data-name="Rectangle 182"
                              width="4"
                              height="12"
                              transform="translate(2 9)"
                              fill="none"
                              stroke="#005cb9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            />
                            <circle
                              id="Ellipse_9"
                              data-name="Ellipse 9"
                              cx="2"
                              cy="2"
                              r="2"
                              transform="translate(2 2)"
                              fill="none"
                              stroke="#005cb9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            />
                          </g>
                        </svg>
                      </a>
                    )}

                    {profile.social.fb && (
                      <a
                        onClick={() =>
                          window.open(
                            /(http(s?)):\/\//i.test(profile.social.fb)
                              ? profile.social.fb
                              : `http://${profile.social.fb}`,
                            "_blank"
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15.553"
                          height="27.052"
                          viewBox="0 0 15.553 27.052"
                        >
                          <path
                            id="facebook_1_"
                            data-name="facebook (1)"
                            d="M21.053,2H17.221a6.388,6.388,0,0,0-6.388,6.388v3.833H7v5.11h3.833V27.552h5.11V17.331h3.833l1.278-5.11h-5.11V8.388A1.278,1.278,0,0,1,17.221,7.11h3.833Z"
                            transform="translate(-6.25 -1.25)"
                            fill="none"
                            stroke="#005cb9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </a>
                    )}
                    {profile.social.twitter && (
                      <a
                        onClick={() => {
                          const link = profile.website ? profile.website : "";
                          if (link !== "") {
                            if (link.indexOf("http") >= 0) {
                              window.open(`${profile.website}`, "_blank");
                            } else {
                              window.open(`http://${profile.website}`, "_blank");
                            }
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27.763"
                          height="27.763"
                          viewBox="0 0 27.763 27.763"
                        >
                          <g id="globe-outline" transform="translate(-47.25 -47.25)">
                            <path
                              id="Path_79"
                              data-name="Path 79"
                              d="M61.132,48A13.132,13.132,0,1,0,74.263,61.132,13.132,13.132,0,0,0,61.132,48Z"
                              transform="translate(0 0)"
                              fill="none"
                              stroke="#005cb9"
                              strokeMiterlimit="10"
                              strokeWidth="1.5"
                            />
                            <path
                              id="Path_80"
                              data-name="Path 80"
                              d="M150.443,48c-3.666,0-7.113,5.88-7.113,13.132s3.447,13.132,7.113,13.132,7.113-5.88,7.113-13.132S154.109,48,150.443,48Z"
                              transform="translate(-89.312 0)"
                              fill="none"
                              stroke="#005cb9"
                              strokeMiterlimit="10"
                              strokeWidth="1.5"
                            />
                            <path
                              id="Path_81"
                              data-name="Path 81"
                              d="M117.33,117.33a15.374,15.374,0,0,0,17.509,0m0,17.509a15.374,15.374,0,0,0-17.509,0"
                              transform="translate(-64.953 -64.953)"
                              fill="none"
                              stroke="#005cb9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            />
                            <path
                              id="Path_82"
                              data-name="Path 82"
                              d="M61.132,48V74.263M74.263,61.132H48"
                              transform="translate(0 0)"
                              fill="none"
                              stroke="#005cb9"
                              strokeMiterlimit="10"
                              strokeWidth="1.5"
                            />
                          </g>
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="claim_btn">
                    <OverlayTrigger
                      rootClose
                      trigger="click"
                      key="right-end"
                      placement="right-end"
                      overlay={
                        <Popover className="claim_popover_container" id={`popover-positioned-${"right-end"}`}>
                          {popOverBody}
                        </Popover>
                      }
                    >
                      <button type="button" className="btn claim">
                        {profile.claimed ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22.416"
                              height="22.027"
                              viewBox="0 0 22.416 22.027"
                            >
                              <g id="check-circle" transform="translate(-0.998 -0.982)">
                                <path
                                  id="Path_112"
                                  data-name="Path 112"
                                  d="M22,11.08V12a10,10,0,1,1-5.93-9.14"
                                  fill="none"
                                  stroke="#05be18"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                />
                                <path
                                  id="Path_113"
                                  data-name="Path 113"
                                  d="M22,4,12,14.01l-3-3"
                                  fill="none"
                                  stroke="#05be18"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                />
                              </g>
                            </svg>{" "}
                            CLAIMED
                          </>
                        ) : (
                          "Claim Now"
                        )}
                      </button>
                    </OverlayTrigger>
                  </div>
                </div>
                <div className="profile_rating_review pt-3">
                  <h1>{profile.name}</h1>
                  <hr className="profile_divider" />

                  <div className="profile_reviews">
                    <div className="d-flex">
                      <span className="review_title">Reviews :</span>
                      <div className="total_reviews">
                        <Stars whole={whole} half={half} empty={empty} />
                      </div>
                      <div className="review_rating_toggle_box ml-2">
                        <span>
                          <a className="arrow" onClick={this.toggleReviws}>
                            {this.state.toggle == true && <FontAwesomeIcon className="up" icon={faChevronUp} />}
                            {this.state.toggle == false && <FontAwesomeIcon className="down" icon={faChevronDown} />}
                          </a>{" "}
                          {profile.totalReviews} Reviews
                        </span>
                      </div>
                    </div>
                  </div>

                  <Fade in={this.state.toggle}>
                    <Row className="single_review">
                      {profile.ratings.categories.length ? (
                        profile.ratings.categories.map((category: any, i: any) => {
                          const categoryTotal = Math.floor(category.average);
                          const categoryHalf = Number((category.average % categoryTotal).toFixed(1)) >= 4.0;
                          const categoryEmpty = 5 - categoryTotal - (categoryHalf ? 1 : 0);
                          return (
                            <React.Fragment key={i}>
                              <Col className={`${category.category == "Project Management" ? "col-md-3" : ""}`}>
                                <span>{category.category}</span>
                                <div>
                                  <Stars whole={categoryTotal} half={categoryHalf} empty={categoryEmpty} />
                                </div>
                              </Col>
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <NoRatings />
                      )}
                    </Row>
                  </Fade>
                  <p className="total_review">See {profile.totalReviews} HINDSYGHT reviews</p>
                </div>
                <div className="all_btns">
                  {permissions.canEdit ? null : (
                    <>
                      <Link
                        className="action_btn bg_colour"
                        to={`/company/profile/${this.props.match.params.id}/writeReview`}
                      >
                        Write review
                      </Link>
                      <button onClick={() => this.handleRequestProposal(this.state.companyId)} className="action_btn">
                        Request Info
                      </button>
                      <a className="action_btn" href={`tel:${profile.phone}`}>
                        CALL
                      </a>
                      <Link className="action_btn" to={`/company/profile/${this.props.match.params.id}/writeReview`}>
                        Write review
                      </Link>
                    </>
                  )}
                  {profile.loggedUserId ? (
                    <button type="button" onClick={this.openShareModal} className="action_btn">
                      SHARE
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = `${process.env.REACT_APP_CLIENT_HOST}/signin?redirect=profile/${profile.id}?&react=true`;
                      }}
                      className="action_btn"
                    >
                      SHARE
                    </button>
                  )}

                  {permissions.canEdit && (
                    <>
                      {(subscriptionLevel === 1 || subscriptionLevel === 2) && (
                        <>
                          <a
                            target="_self"
                            href={`${process.env.REACT_APP_CLIENT_HOST}/company/${companyId}/subscribe/${subscriptionLevel === 1 ? "" : "upgrade"
                              }`}
                            className="action_btn"
                          >
                            UPGRADE SUBSCRIPTION
                          </a>
                        </>
                      )}
                      <Link to={`/profile/edit/${profile.id}`} className="action_btn">
                        EDIT DETAILS
                      </Link>

                      {console.log(profile)}

                      <Link to={{ pathname: `/profile/addbranch/${profile.id}`, state: { id: profile.id, name: profile.name } }} className="action_btn">
                        Add Branch
                      </Link>

                      {/* <button className="action_btn">Add Branch</button> */}

                      {/* <Link to={`/profile/edit/${profile.id}`} className="action_btn">
                        EDIT DETAILS
                      </Link> */}
                    </>
                  )}
                </div>
              </Row>
            </Container>
          </div>

          <div className="container">
            <hr className="section_divider" />
          </div>

          <Container>
            <Row>
              <div className="col-md-5">
                <div className="contact_info mb-3">
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="55.99" height="67.988" viewBox="0 0 55.99 67.988">
                      <g id="map-pin_1_" data-name="map-pin (1)" transform="translate(-2)">
                        <path
                          id="Path_324"
                          data-name="Path 324"
                          d="M56.99,28c0,21-27,38.993-27,38.993S3,48.991,3,28a27,27,0,0,1,53.99,0Z"
                          transform="translate(0 0)"
                          fill="none"
                          stroke="#5a5a5a"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                        <circle
                          id="Ellipse_38"
                          data-name="Ellipse 38"
                          cx="9"
                          cy="9"
                          r="9"
                          transform="translate(20.995 18.994)"
                          fill="none"
                          stroke="#5a5a5a"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="info">
                    {profile.address1} {profile.address2 ? profile.address2 : ""} {profile.city}, {profile.state}{" "}
                    {profile.postalCode}, {profile.country}
                  </div>
                </div>

                <div className="contact_info mb-3">
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50.202" height="50.299" viewBox="0 0 50.202 50.299">
                      <path
                        id="phone"
                        d="M50.31,38.158v7.27a4.847,4.847,0,0,1-5.283,4.847,47.96,47.96,0,0,1-20.914-7.44A47.257,47.257,0,0,1,9.572,28.295,47.96,47.96,0,0,1,2.132,7.283,4.847,4.847,0,0,1,6.954,2h7.27a4.847,4.847,0,0,1,4.847,4.168,31.117,31.117,0,0,0,1.7,6.81,4.847,4.847,0,0,1-1.091,5.113L16.6,21.17A38.775,38.775,0,0,0,31.14,35.71l3.078-3.078a4.847,4.847,0,0,1,5.113-1.091,31.117,31.117,0,0,0,6.81,1.7,4.847,4.847,0,0,1,4.168,4.92Z"
                        transform="translate(-1.11 -1)"
                        fill="none"
                        stroke="#4f4f4f"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="info">{profile.phone ? profile.phone : "-"}</div>
                </div>

                <div className="contact_info mb-3">
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="62.929" height="67.988" viewBox="0 0 62.929 67.988">
                      <g id="person-outline" transform="translate(-62.99 -47)">
                        <path
                          id="Path_325"
                          data-name="Path 325"
                          d="M195.681,63.228c-.622,8.387-6.98,15.228-13.959,15.228s-13.348-6.84-13.959-15.228C167.128,54.5,173.315,48,181.722,48S196.315,54.662,195.681,63.228Z"
                          transform="translate(-87.268)"
                          fill="none"
                          stroke="#4f4f4f"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                        <path
                          id="Path_326"
                          data-name="Path 326"
                          d="M94.454,304c-13.8,0-27.807,7.614-30.4,21.985-.312,1.732.668,3.395,2.481,3.395h55.836c1.815,0,2.795-1.662,2.482-3.395C122.261,311.614,108.254,304,94.454,304Z"
                          transform="translate(0 -215.392)"
                          fill="none"
                          stroke="#4f4f4f"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="info">
                    {profile.repName ? profile.repName : "-"}
                    <br />
                    {profile.repEmail ? <a href={`mailto:${profile.repEmail}`}>{profile.repEmail}</a> : "-"}
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="google_map_preview">
                  <Maps
                    branches={this.props.profile.profile.branches}
                    coordinates={this.state.mapsCoordinates === "" ? profile.coordinates : this.state.mapsCoordinates}
                  />
                </div>
              </div>
            </Row>
          </Container>

          <div className="container">
            <hr className="section_divider" />
          </div>

          <div className="company_info_section">
            <div className="container">
              <div className="row mb-4">
                <div className="company_info_section-4">
                  <span className="title">Proficiencies: </span>
                </div>
                <div className="company_info_section-8">
                  <p className="info">
                    {proficiencies.map((prof, index) => (
                      <span key={index}>
                        {prof.name}
                        {proficiencies.length - 1 > index && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="row mb-4">
                <div className="company_info_section-4">
                  <span className="title">About :</span>
                </div>
                <div className="company_info_section-8">
                  <p className="info">{profile.tagline ? profile.tagline : "-"}</p>
                </div>
              </div>
              <div className="row mb-4">
                <div className="company_info_section-4">
                  <span className="title">Locations: :</span>
                </div>
                <div className="company_info_section-8">
                  {!profile.parentId ? (
                    profile.branches!.length === 0 ? (
                      <p className="info">{`${profile.name} has only 1 office location.`}</p>
                    ) : (
                      profile.branches!.map((branch: any, index: number) => (
                        <React.Fragment key={index}>
                          <div className={`company-branch`}>
                            <Address profile={branch} />
                            <br />
                          </div>
                          <hr className="branch-divider" />
                        </React.Fragment>
                      ))
                    )
                  ) : (
                    <p className="info">{`${profile.name} has only 1 office location.`}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="review_section">
            <div className="container">
              <Row>
                <Col>
                  <div className="d-flex  align-items-center">
                    <h4 className="m-0 mr-2">Reviews</h4>
                    {reviewsResponse && <Stars whole={avgwhole} half={avghalf} empty={avgempty} />}
                    {reviewsResponse && (
                      <span className="ml-auto pl-2 total_reviews_count">
                        See {reviewsResponse.totalReviews} HINDSYGHT reviews
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div className="container">
            <div className="review_filters">
              <Row>
                <Col md={12} lg={12} sm={12}>
                  <div className="profile_reviews_row reviews_list">
                    <Row className="reviews_filter_wrapper">
                      <Col md={3} className="mb-3 mb-md-0">
                        <select
                          value={currentFilters.score}
                          onChange={this.handleRatingChange}
                          className="form-control ratings_filters"
                        >
                          <option value="0">Ratings</option>
                          {ratingOptions.map((rating, key) => (
                            <option key={key} value={rating.value}>
                              {rating.label}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col md={3} className="mb-3 mb-md-0">
                        <select onChange={this.handleDateChange} className="form-control date_filters">
                          <option value="0">Date</option>
                          {ratingDateFilters.map((filter, key) => (
                            <option key={key} value={filter.value}>
                              {filter.display}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col md={3} className="mb-3 mb-md-0">
                        <select
                          value={currentFilters.location}
                          onChange={this.handleLocationChange}
                          className="form-control date_filters"
                        >
                          <option value="0">Location</option>
                          <option value={profile.id}>{this.getLocationString(profile)}</option>
                          {profile.branches !== undefined &&
                            profile.branches.map((branch: any, key: any) => (
                              <option key={key} value={branch.id}>
                                {this.getLocationString(branch)}
                              </option>
                            ))}
                        </select>
                      </Col>
                      <Col md={3} className="mb-3 mb-md-0">
                        <select
                          value={currentFilters.sort}
                          onChange={this.handleSortChange}
                          className="form-control sort_filters"
                        >
                          <option value="0">Sort By</option>
                          <option value="0date">Most Recent</option>
                          <option value="0helpful">Most Helpful</option>
                          <option value="0rating">High to Low Rating</option>
                          <option value="1rating">Low to High Rating</option>
                        </select>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div>
            {reviews.length === 0 ? (
              <div className="no_reviews">
                <div className="col text-center">
                  <div className="row justify-content-center">
                    <div className="col-md-7">
                      <img src={noReview} className="no-review-image img-fluid" alt="no_Review" />
                    </div>
                  </div>
                </div>
                {permissions.writeReview && (
                  <Link to={`/company/profile/${this.props.match.params.id}/writeReview`} className="btn btn-primary">
                    Write review
                  </Link>
                )}
              </div>
            ) : (
              <div className="all_review">
                {reviews.map((review: any, index: number) => (
                  <Review
                    removeHelpfulReview={this.props.removeHelpfulReview}
                    setHelpfulReview={this.props.setHelpfulReview}
                    loggedInUser={profile.loggedUserId}
                    permissions={permissions}
                    key={index}
                    reviewGroup={review}
                  />
                ))}
              </div>
            )}
            <div className="text-center">
              {reviewsResponse.totalReviews > 10 && this.props.profile.pages <= reviewsResponse.pages && (
                <div id="learn_more_div">
                  <a onClick={this.loadMore} type="button" id="load_more">
                    See more Reviews{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="9.969" height="17.938" viewBox="0 0 9.969 17.938">
                      <path
                        id="chevron-right"
                        d="M9,21.11l7.555-7.555L9,6"
                        transform="translate(-7.586 -4.586)"
                        fill="none"
                        stroke="#005cb9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

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
            company_name={this.state.suggestedCompanies.company_name}
            companies={this.state.suggestedCompanies.companies}
          />

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
            suggestedCompanies={this.state.suggestedCompanies}
          />

          <Snackbar open={this.state.snackbar} autoHideDuration={6000} onClose={this.handleSnackBar}>
            {this.state.snackbarSuccess ? (
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
        </>
      );
    }
    return <>{profileContent}</>;
  }
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const mapStateToProps = (state: ApplicationState) => {
  return {
    profile: state.profile,
    user: state.user,
  };
};

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

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(companyProfileActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(CompanyProfile));
