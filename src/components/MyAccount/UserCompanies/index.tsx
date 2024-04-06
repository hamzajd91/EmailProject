import React, {Component} from "react";
import "./index.scss";
import companies from "../../../images/account/md/companies.png";
import {Link} from "react-router-dom";
import Stars from "./Component/Stars";
import appApi from "../../../services/appApi";
import {Loader} from "../../Loader";
import default_company from "../../../images/default/default_company.png";
import no_comapnies from "../../../images/account/no_comapnies.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import {Formik} from "formik";
import {Helmet} from "react-helmet";

interface Props {}

interface State {
  open: boolean;
  isLoading: boolean;
  companies: any;
  currnet_page: number;
  total_page: number;
  limit: number;
  total_companies: number;
  delegates?: any;
  companyId?: any;
}

const validation_Schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

class UserCompanies extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      delegates: [],
      isLoading: false,
      currnet_page: 1,
      total_page: 1,
      limit: 10,
      total_companies: 0,
      companies: [],
    };
  }

  componentDidMount() {
    const limit = this.state.limit;
    const page = this.state.currnet_page;
    this.getCompanies(page, limit);
  }

  getCompanies = async (page: any, limit: any) => {
    try {
      const params = {
        limit,
        page,
      };
      this.setState({
        isLoading: true,
      });
      const response = await appApi.get("users/claimedCompanies", {params});
      this.setState({
        isLoading: false,
        currnet_page: page,
        total_page: response.data.pages,
        total_companies: response.data.total,
        companies: this.state.companies.concat(response.data.companies),
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        currnet_page: this.state.currnet_page,
        total_page: this.state.total_page,
        total_companies: this.state.total_companies,
        companies: this.state.companies,
      });
    }
  };

  loadMoreData = () => {
    const {currnet_page, limit} = this.state;
    const page = currnet_page + 1;
    this.getCompanies(page, limit);
  };

  handleModel = (e: any) => {
    let delegates = this.state.companies.find(function(obj: any) {
      return obj.id == e;
    });

    this.setState(
      {
        delegates: delegates.delegates,
        companyId: delegates.id,
      },
      () => {
        this.setState({
          open: true,
        });
      }
    );
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  addDelegates = async (e: any) => {
    const {setErrors, setSubmitting, resetForm, values} = e;
    try {
      const del_info = await appApi.put(`/companies/${this.state.companyId}/delegate`, {delegateEmail: values.email});

      let newCompanies = this.state.companies.map((company: any) => {
        if (company.id == this.state.companyId) {
          company.delegates.push(del_info.data);
        }
        return company;
      });
      // console.log(this.state.delegates);

      // let delegates = [...this.state.delegates, del_info.data];
      this.setState({
        // delegates: delegates,
        companies: newCompanies,
      });
      resetForm();
    } catch (error) {
      setErrors({email: "There are no Hindsyght users associated with this email address."});
    } finally {
      setSubmitting(false);
    }
  };

  removeUser = async (companyId: any, id: any) => {
    await appApi.delete(`/companies/${companyId}/delegate/${id}`);
    const newdDlegates = this.state.delegates.filter((user: any) => {
      return user.id !== id;
    });

    let newCompanies = this.state.companies.map((company: any) => {
      if (company.id == companyId) {
        let dele = company.delegates.filter(function(element: any) {
          return element.id != id;
        });
        company.delegates = dele;
      }
      return company;
    });

    this.setState({
      delegates: newdDlegates,
      companies: newCompanies,
    });
  };

  render() {
    const handleModel = this.handleModel;
    return (
      <React.Fragment>
        <Helmet>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <title>Companies</title>
          <meta name="title" content={`Companies`} />
        </Helmet>
        {this.state.companies.length == 0 && this.state.isLoading == false ? (
          <div className="text-center mt-4 mb-4">
            <img src={no_comapnies} style={{maxWidth: "550px", width: "100%"}} />
            <h6 className="mt-4">No claimed companies.</h6>
          </div>
        ) : (
          <>
            <div className="pt-5 pb-5">
              <div className="companies_header">
                <div>
                  <img src={companies} />
                </div>
                <div className="companies_label">
                  <h3>Companies</h3>
                  <span>You have {this.state.total_companies} claimed companies</span>
                </div>
              </div>
              {this.state.companies.map(function(company: any, index: number) {
                return (
                  <React.Fragment key={index}>
                    <Review {...company} handleModel={handleModel} />
                  </React.Fragment>
                );
              })}
              <div className="mt-4">
                {this.state.isLoading ? (
                  <Loader />
                ) : this.state.currnet_page !== this.state.total_page ? (
                  <div className="text-center">
                    <button className="company_load_more" type="button" onClick={this.loadMoreData}>
                      Load More
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
        <Dialog open={this.state.open} fullWidth={true} onClose={this.handleClose} scroll={`paper`} maxWidth={`sm`}>
          <DialogTitle>Authorized Delegates</DialogTitle>
          <DialogContent dividers={true}>
            {this.state.delegates.map((user: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <div className="d-flex pt-3 pb-3 prof_info">
                    <div className="avtar_img">
                      <Avatar src={user.picture} />
                    </div>
                    <div className="user_info">
                      {user.firstName} {user.lastName}
                      <br />
                      {user.email}
                    </div>
                    <div className="close_btn_modal">
                      <button className="remove_btn" onClick={() => this.removeUser(this.state.companyId, user.id)}>
                        <HighlightOffIcon />
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div className="add_deletgates_form">
              <Formik
                initialValues={{
                  email: "",
                }}
                enableReinitialize={true}
                validationSchema={validation_Schema}
                onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
                  this.addDelegates({setErrors, setSubmitting, resetForm, values});
                }}
              >
                {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => (
                  <form onSubmit={handleSubmit} className="form_main">
                    <div className="email_field">
                      <TextField
                        error={errors.email && touched.email ? true : false}
                        helperText={errors.email && touched.email ? errors.email : null}
                        label="Email"
                        name="email"
                        value={values.email}
                        variant="outlined"
                        autoComplete="off"
                        style={{width: "100%"}}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="btn_field">
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </DialogContent>
          <DialogActions>
            <button className="close_btn" onClick={this.handleClose}>
              Close
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

function Review(props: any) {
  const numDel = props.delegates ? props.delegates.length : 0;
  const overall = parseFloat(props.overall);
  const whole = Math.floor(overall);
  const half = Number((overall % whole).toFixed(1)) >= 0.4;
  const empty = 5 - whole - (half ? 1 : 0);
  return (
    <React.Fragment>
      <div className="company_section">
        <div className="row">
          <div className="col-md-4">
            <div className="company_profile">
              <img src={props.icon ? props.icon : default_company} />
              <h3>
                <Link to={`/profile/${props.id}`}>{props.name}</Link>
              </h3>
              <span>
                {props.address1} {props.address2 ? props.address2 : ""}
                <br />
                {props.city}, {props.state} {props.postalCode}
              </span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="review_section">
              <span>
                {props.reviews} {parseInt(props.reviews) === 1 ? "Review" : "Reviews"}
              </span>
              <span className="ml-auto">
                <Stars whole={whole} half={half} empty={empty} />
              </span>
            </div>

            <div className="bookmarks_section">
              <span>
                {props.favorites} {parseInt(props.favorites) === 1 ? "Bookmark" : "Bookmarks"} By Users
              </span>
            </div>

            <div className="authorized_section">
              <span className="mr-2">
                {numDel} Authorized {numDel === 1 ? "Delegate" : "Delegates"}
              </span>
              <button className="ml-auto manage_btn" onClick={() => props.handleModel(props.id)}>
                Manage
              </button>
            </div>

            <div className="authorized_section">
              <span className="mr-2">Subscription type {props.subscription}</span>
              <Link to={`/company/${props.id}/subscribe`} className="ml-auto">
                Change
              </Link>
            </div>

            <div className="edit_dtls mt-3">
              <Link to={`/user/reviews/${props.id}/invitation`} className="edit_Details mr-2 mb-2 mb-sm-0">
                Review Invitation
              </Link>
              <Link to={`/profile/edit/${props.id}`} className="edit_Details">
                Edit Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserCompanies;
