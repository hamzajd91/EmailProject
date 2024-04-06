import React, {Component} from "react";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Formik} from "formik";
import appApi from "../../services/appApi";
import "./index.scss";
import StorageService from "../../services/StorageService";
import {ApplicationState} from "../../store";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {FreePlans, BasicPlans, PlusPlans} from "../AllPlans";
import { createPartiallyEmittedExpression } from "typescript";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const validation_Schema = Yup.object().shape({
  first_name: Yup.string().required("First name is required."),
  last_name: Yup.string().required("Last name is required."),
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid email."),
  address1: Yup.string().required("Address is required."),
  city: Yup.string().required("City is required."),
  state: Yup.string().required("State is required."),
  postalCode: Yup.string().required("Postal code is required."),
  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required."),
});

interface State {
  isLoading: boolean;
  form_data: UserData;
  message: string;
  yearlyPrice: number;
  snackbar: boolean;
  promotion: boolean;
  planId: string;
  cbInstance: any;
  companies: [];
}

interface Window {
  Chargebee?: any;
}

declare var window: Window;

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  // country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  terms: boolean;
}

class Checkout extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      cbInstance: window.Chargebee.init({
        site: process.env.REACT_APP_CHARGEBEE_SITE,
      }),
      isLoading: false,
      message: "",
      companies: [],
      promotion: false,
      snackbar: false,
      yearlyPrice: 0,
      planId: "",
      form_data: {
        first_name: "",
        last_name: "",
        email: "",
        address1: "",
        address2: "",
        postalCode: "",
        city: "",
        state: "",
        terms: false,
      },
    };
  }

  // urlEncode = (data: any) => {
  //   var str = [];
  //   for (var p in data) {
  //     if (data.hasOwnProperty(p) && !(data[p] == undefined || data[p] == null)) {
  //       str.push(encodeURIComponent(p) + "=" + (data[p] ? encodeURIComponent(data[p]) : ""));
  //     }
  //   }
  //   return str.join("&");
  // };

  async componentDidMount() {
    this.setState({
      form_data: {
        ...this.state.form_data,
        first_name: this.props.user.firstName,
        last_name: this.props.user.lastName,
        email: this.props.user.email,
      },
    });

    if (
      !(
        this.props.match.params.planId == 2 ||
        this.props.match.params.planId == 3 ||
        this.props.match.params.planId == 1
      )
    ) {
      this.props.history.push("/");
    }

    const planId = parseFloat(this.props.match.params.planId);
    switch (planId) {
      case 2:
        // yearlyPrice = 20 * 12;
        this.setState({
          yearlyPrice: 20 * 12,
          planId: "2",
        });
        break;
      case 3:
        this.setState({
          yearlyPrice: 75 * 12,
          planId: "3",
        });
        break;
    }

    const companies = StorageService.getCompanies();
    this.setState({
      companies: companies,
    });
  }

  handleFormSubmit = async (e: any) => {
    const {setSubmitting, values} = e;

    let companies: any = [];

    if (this.props.match.path == "/company/:companyId/subscription/:planId/checkout") {
      companies = [this.props.match.params.companyId];
    }

    if (this.props.match.path == "/subscription2/checkout-companies/:planId") {
      for (let companyEl in this.state.companies) {
        companies.push(companyEl);
      }
    }

    const billing_address = {
      first_name: values.first_name,
      last_name: values.last_name,
      line1: values.address1,
      line2: values.address2,
      city: values.city,
      state: values.state,
      zip: values.postalCode,
      // country: values.country,
    };

    const customer = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
    };

    const planId = parseFloat(this.props.match.params.planId);

    let data = {
      billing_address,
      customer,
      planId: this.props.match.params.planId,
      companies: companies,
    };

    if (planId === 1) {
      try {
        await appApi.post("chargebee/cancel/subscription", data);
        return this.props.history.push(`/profile/${this.props.match.params.companyId}`);
      } catch (error) {
        return this.props.history.push(`/profile/${this.props.match.params.companyId}`);
      }
    }

    try {
      let that = this;
      this.state.cbInstance.openCheckout({
        hostedPage: () => {
          return appApi.post("chargebee/generate_checkout_new_url", data).then(response => {
            return response.data;
          });
        },
        error: (error: any) => {
          that.setState({
            snackbar: true,
            message: "There was an error processing your request.",
          });
        },
        success: function() {
          console.log('okau');
        },
        close: () => {
          that.state.cbInstance.closeAll();
          if (that.props.match.path == "/subscription2/checkout-companies/:planId") {
            return that.props.history.push("/promotion/success-overview/");
          } else {
            return that.props.history.push(`/profile/${that.props.match.params.companyId}`);
          }
        },
        step(step: any) {
          console.log("checkout", step);
        },
      });
    } catch (err) {
      console.log(err);
      this.setState({
        snackbar: true,
        message: "There was an error processing your request.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  handleClose = () => {
    this.setState({
      snackbar: false,
    });
  };

  render() {
    return (
      <div className="container">
        <Snackbar open={this.state.snackbar} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error">
            {this.state.message}
          </Alert>
        </Snackbar>
        <div className="row">
          <div className="col">
            <div className="promobox">
              <h3 className="mb-4">Almost There</h3>
              <div>
                <Formik
                  initialValues={{promotion: ""}}
                  enableReinitialize={true}
                  validationSchema={Yup.object().shape({
                    promotion: Yup.string().required("Promotion code is required."),
                  })}
                  onSubmit={(values: any, {setErrors, setSubmitting}) => {
                    // if (
                    //   (values.promotion === "free2020" || values.promotion === "hindsyght2020") &&
                    //   this.state.promotion === true
                    // ) {
                    //   setErrors({promotion: "Coupon isn't valid!"});
                    // }
                    setErrors({promotion: "Coupon isn't valid!"});
                  }}
                >
                  {({values, errors, touched, handleSubmit, setFieldValue, handleChange, isSubmitting}) => (
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center">
                        <TextField
                          error={errors.promotion && touched.promotion ? true : false}
                          helperText={errors.promotion && touched.promotion ? errors.promotion : null}
                          label="Promotion code"
                          name="promotion"
                          value={values.promotion}
                          variant="outlined"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <button className="buy_now_btn_prmotion" type="submit">
                          Apply
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        {this.props.match.path == "/subscription2/checkout-companies/:planId" ? (
          <div className="row">
            <div className="col mt-3 mb-3">
              <h6>You're about to subscribe to the following companies:</h6>
              <ul className="mt-3">
                {Object.entries(this.state.companies).map((company: any, index: number) => {
                  return <li key={index}>{company[1]}</li>;
                })}
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-md-8">
            <div className="card_details_block">
              <Formik
                initialValues={this.state.form_data}
                enableReinitialize={true}
                validationSchema={validation_Schema}
                onSubmit={(values: any, {setErrors, setSubmitting}) => {
                  this.handleFormSubmit({setErrors, setSubmitting, values});
                }}
              >
                {({values, errors, touched, handleSubmit, setFieldValue, handleChange, isSubmitting}) => (
                  <form onSubmit={handleSubmit}>
                    <h3>Card Details</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mt-3">
                          <TextField
                            error={errors.first_name && touched.first_name ? true : false}
                            helperText={errors.first_name && touched.first_name ? errors.first_name : null}
                            label="First Name"
                            name="first_name"
                            defaultValue={values.first_name}
                            value={values.first_name}
                            variant="outlined"
                            autoComplete="off"
                            style={{width: "100%"}}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mt-3">
                          <TextField
                            error={errors.last_name && touched.last_name ? true : false}
                            helperText={errors.last_name && touched.last_name ? errors.last_name : null}
                            label="Last name"
                            name="last_name"
                            defaultValue={values.last_name}
                            value={values.last_name}
                            variant="outlined"
                            autoComplete="off"
                            style={{width: "100%"}}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mt-3">
                          <TextField
                            error={errors.email && touched.email ? true : false}
                            helperText={errors.email && touched.email ? errors.email : null}
                            label="Email"
                            name="email"
                            defaultValue={values.email}
                            value={values.email}
                            variant="outlined"
                            autoComplete="off"
                            style={{width: "100%"}}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="mt-4 mb-4">Billing Address</h3>
                    <div className="form-group">
                      <TextField
                        error={errors.address1 && touched.address1 ? true : false}
                        helperText={errors.address1 && touched.address1 ? errors.address1 : null}
                        label="Address 1"
                        name="address1"
                        value={values.address1}
                        variant="outlined"
                        autoComplete="off"
                        onChange={handleChange}
                        style={{width: "100%"}}
                      />
                    </div>
                    <div className="form-group">
                      <TextField
                        error={errors.address2 && touched.address2 ? true : false}
                        helperText={errors.address2 && touched.address2 ? errors.address2 : null}
                        label="Address 2 (Optional)"
                        name="address2"
                        value={values.address2}
                        variant="outlined"
                        onChange={handleChange}
                        autoComplete="off"
                        style={{width: "100%"}}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            error={errors.city && touched.city ? true : false}
                            helperText={errors.city && touched.city ? errors.city : null}
                            label="City"
                            name="city"
                            onChange={handleChange}
                            value={values.city}
                            variant="outlined"
                            autoComplete="off"
                            style={{width: "100%"}}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            error={errors.state && touched.state ? true : false}
                            helperText={errors.state && touched.state ? errors.state : null}
                            label="State"
                            name="state"
                            value={values.state}
                            variant="outlined"
                            onChange={handleChange}
                            autoComplete="off"
                            style={{width: "100%"}}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <TextField
                            error={errors.postalCode && touched.postalCode ? true : false}
                            helperText={errors.postalCode && touched.postalCode ? errors.postalCode : null}
                            label="Postal code"
                            name="postalCode"
                            value={values.postalCode}
                            variant="outlined"
                            onChange={handleChange}
                            autoComplete="off"
                            style={{width: "100%"}}
                          />
                        </div>
                      </div>
                    </div>

                    <h3>Subscription Details</h3>
                    <p>
                      You will be charged ${this.state.yearlyPrice} annually for each company you are subscribing to
                      until you cancel your subscription. Your payment data is encrypted and secure. Once subscribed,
                      there is no refund for early cancellation.
                    </p>

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="terms"
                          onChange={(e: any) => {
                            setFieldValue("terms", e.target.checked);
                          }}
                        />
                      }
                      label={
                        <p className="terms">
                          I agree to the Hindsyght{" "}
                          <Link to="/terms" target="_blank">
                            Terms of Use
                          </Link>{" "}
                          and the Automatic Renewal Terms stated above.
                        </p>
                      }
                    />
                    {errors.terms && touched.terms ? (
                      <small className="d-block text-danger">{errors.terms}</small>
                    ) : null}
                    <button className="buy_now_btn" type="submit" disabled={isSubmitting}>
                      Buy Now
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-md-4">
            {/* FreePlans */}
            {this.props.match.params.planId == 1 && <FreePlans />}
            {this.props.match.params.planId == 2 && <BasicPlans />}
            {this.props.match.params.planId == 3 && <PlusPlans />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Checkout);
