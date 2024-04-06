import React, {Component} from "react";
import "./index.scss";
import Stars from "./Component/Stars";
import review from "../../../images/account/md/review.png";
import {Helmet} from "react-helmet";
import appApi from "../../../services/appApi";
import {Loader} from "../../Loader";
import {Link} from "react-router-dom";
import default_company from "../../../images/default/default_company.png";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import no_review from "../../../images/account/no_review.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import {Formik} from "formik";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
const writeReview: any = require("../../../lang/i18n/en/writeReview.json");

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {}

interface State {
  isLoading: boolean;
  reviews: any;
  currnet_page: number;
  total_page: number;
  limit: number;
  totalReviews: number;
  reviewId?: string;
  snackbar?: boolean;
  modal_state: boolean;
}
// Validation schema
const validation_Schema = Yup.object().shape({
  reason: Yup.string().required("Please pick a reason for deletion."),
});

class Review extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      snackbar: false,
      modal_state: false,
      isLoading: false,
      currnet_page: 1,
      total_page: 1,
      limit: 10,
      totalReviews: 0,
      reviews: [],
    };
  }

  componentDidMount() {
    const limit = this.state.limit;
    const page = this.state.currnet_page;
    this.getAllReviews(page, limit);
  }

  getAllReviews = async (page: any, limit: any) => {
    try {
      const params = {
        limit,
        page,
        title: "User Reviews",
      };
      this.setState({
        isLoading: true,
      });
      const response = await appApi.get("users/reviews", {params});
      this.setState({
        isLoading: false,
        currnet_page: page,
        total_page: response.data.pages,
        totalReviews: response.data.totalReviews,
        reviews: this.state.reviews.concat(response.data.reviews),
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        currnet_page: page,
        total_page: this.state.total_page,
        totalReviews: this.state.totalReviews,
        reviews: this.state.reviews,
      });
    }
  };

  loadMoreData = () => {
    const {currnet_page, limit} = this.state;
    const page = currnet_page + 1;
    this.getAllReviews(page, limit);
  };

  handleSnackBarClose = () => {
    this.setState({
      snackbar: !this.state.snackbar,
    });
  };

  handleModal = (e: any) => {
    this.setState({
      reviewId: e,
      modal_state: !this.state.modal_state,
    });
  };

  confirmDelteReview = async (e: any) => {
    const {values, setSubmitting, resetForm} = e;
    const reviewId: any = this.state.reviewId;
    try {
      await appApi.delete(`reviews/${reviewId}`, values);
      let reviews = this.state.reviews.filter(function(obj: any) {
        return obj.review.id !== reviewId;
      });
      this.setState({
        modal_state: !this.state.modal_state,
        reviews: reviews,
        snackbar: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  handleClose = () => {
    this.setState({
      modal_state: false,
    });
  };

  render() {
    const {reviews, totalReviews, isLoading} = this.state;

    const handleModal = this.handleModal;
    const upperCompanyNumber = reviews.length;
    const lowerCompanyNumber = reviews.length > 0 ? 1 : 0;
    return (
      <React.Fragment>
        <Helmet>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <title>Reviews</title>
          <meta name="title" content={`Reviews`} />
        </Helmet>
        {reviews.length == 0 && isLoading == false ? (
          <div className="text-center mb-5 mt-5">
            <img src={no_review} style={{maxWidth: "350px", width: "100%"}} />
            <h6 className="mt-4">No Reviews.</h6>
          </div>
        ) : (
          <>
            <div className="pt-5 pb-5">
              <div className="review_header">
                <div>
                  <img src={review} />
                </div>
                <div className="review_label">
                  <h3>Reviews</h3>
                  <span>
                    Viewing {lowerCompanyNumber} - {upperCompanyNumber} of {totalReviews} reviews
                  </span>
                </div>
              </div>
            </div>
            <div className="all_review">
              {reviews.map((props: any, index: number) => {
                return <SingleReview key={index} {...props} onModalClick={handleModal} />;
              })}
            </div>
            <div className="mt-0 mb-5">
              {isLoading ? (
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
          </>
        )}
        <Dialog open={this.state.modal_state} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle>Delete Review</DialogTitle>
          <Formik
            initialValues={{
              reason: "",
              details: "",
            }}
            enableReinitialize={true}
            validationSchema={validation_Schema}
            onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
              this.confirmDelteReview({values, setErrors, setSubmitting, resetForm});
            }}
          >
            {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => (
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  We’re sorry to see that you want to remove your review. Please provide us some information to make
                  this experience better.
                  <FormControl
                    variant="outlined"
                    style={{width: "100%", marginTop: "25px"}}
                    error={errors.reason && touched.reason ? true : false}
                  >
                    <InputLabel id="reason_label">Reason</InputLabel>
                    <Select
                      labelId="reason_label"
                      value={values.reason}
                      name="reason"
                      onChange={handleChange}
                      label="Reason"
                    >
                      <MenuItem value={`changed opinion`}>I changed my opinion of this business</MenuItem>
                      <MenuItem value={`threat`}>I was threatened with legal action or sued</MenuItem>
                      <MenuItem value={`compensation`}>
                        I was offered a refund or other compensation to remove this
                      </MenuItem>
                      <MenuItem value={`contract`}>
                        I signed a contract with the business that required me to remove this review
                      </MenuItem>
                      <MenuItem value={`other`}>Other</MenuItem>
                    </Select>
                    {errors.reason && touched.reason ? (
                      <FormHelperText>
                        <span className="text-danger">{errors.reason}</span>
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  <TextField
                    style={{width: "100%", marginTop: "25px"}}
                    label="Anything else you would like us to know (optional)"
                    multiline
                    variant="outlined"
                    rows={4}
                  />
                </DialogContent>
                <DialogActions
                  style={{
                    padding: "24px",
                  }}
                >
                  <button className="confirm_delete_btn" type="submit" disabled={isSubmitting}>
                    Delete
                  </button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </Dialog>

        <Snackbar open={this.state.snackbar} autoHideDuration={6000} onClose={this.handleSnackBarClose}>
          <Alert onClose={this.handleSnackBarClose} severity="success">
            Your review has been deleted.
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

function SingleReview(props: any) {
  // console.log(props);
  const categories_main: any = {
    1: "Value",
    2: "Quality",
    3: "Knowledge",
    4: "Execution",
    5: "Communication",
  };
  let scoreSentences = "";
  const {review, company} = props;
  const createdAt = moment(review.createdAt);
  const now = moment(new Date());
  return (
    <React.Fragment>
      <div className="single_review">
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="company_profile_info">
              <div className="profile d-flex align-content-center">
                <div className="image">
                  <img src={company.icon ? company.icon : default_company} />
                </div>
                <div className="ml-2 mt-auto mb-auto">
                  <span className="name">{company.name}</span>
                  <br />
                  <span className="date">{createdAt.format("MMMM D, YYYY")}</span>
                </div>
              </div>
              <div className="other_info mt-3">
                <h6>{company.industry}</h6>
                <span>
                  {company.address1} {company.address2 ? company.address2 : ""} {company.city}, {company.state}{" "}
                  {company.postalCode}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="per_review">
              {review.categories.map((category: any, index: number) => {
                const whole = Math.floor(category.score);
                const half = Math.floor(category.score) % whole >= 0.4;
                const empty = 5 - whole - (half ? 1 : 0);
                const type = categories_main[category.categoryId];
                const id = `answer${whole}`;
                const type_data = writeReview.categories[type];
                scoreSentences += type_data[id] + " ";
                return (
                  <div className="single_rvw" key={index}>
                    <h6>{categories_main[category.categoryId]}</h6>
                    <Stars whole={whole} half={half} empty={empty} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {scoreSentences ? <p>{scoreSentences}</p> : ""}
        {review.answers.length === 1 ? (
          <p>{review.answers[0].answer}</p>
        ) : (
          <p>
            {review.answers[0].answer} {review.answers[1].answer} {review.answers[2].answer}
          </p>
        )}
        <div className="d-flex help_reviews">
          {/* <span>1 Person found this review helpful</span> */}
          {createdAt.add(30, "days").isAfter(now) ? (
            <span className="buttons ml-auto">
              <Link to={`/company/editReview/${review.id}`} className="edit">
                <EditIcon />
              </Link>
              <button onClick={() => props.onModalClick(review.id)} className="delete">
                <DeleteIcon />
              </button>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Review;
