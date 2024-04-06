import React, {Component} from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import * as Yup from "yup";
import {Formik} from "formik";
import {Row, Col} from "react-bootstrap";
import appApi from "../../../services/appApi";
import "./index.scss";
import {Loader} from "../../Loader";
import StorageService from "../../../services/StorageService";
import {ApplicationState} from "../../../store";
import default_profile from "../../../images/default_profile.jpg";
import {UserActionsTypes} from "../../../store/ducks/user/types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const validation_Schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email address")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  company: Yup.string().required("Company is required"),
});

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  industry: string;
  title: string;
  headline: string;
  picture: any;
  isAnonymousVerified: boolean;
  profileImage?: any;
}

interface State {
  isLoading: boolean;
  file: any;
  form_data: UserData;
  snackbar: boolean;
}

class index extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      snackbar: false,
      file: "",
      form_data: {
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        industry: "",
        title: "",
        headline: "",
        picture: "",
        profileImage: "",
        isAnonymousVerified: false,
      },
    };
  }

  async componentDidMount() {
    const response = await appApi.get("users/me");

    this.setState({
      form_data: {
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        company: response.data.company || "",
        industry: response.data.industry || "",
        title: response.data.title || "",
        headline: response.data.headline || "",
        picture: response.data.picture || default_profile,
        isAnonymousVerified: response.data.isAnonymousVerified,
      },
      isLoading: false,
    });
  }

  changeProfleImage = async (e: any) => {
    const file = e;
    // const setFieldValue = e.setFieldValue;
    if (file) {
      this.setState({
        file: e,
      });
      this.getBase64(file, (result: any) => {
        this.setState({
          form_data: {
            ...this.state.form_data,
            picture: result,
          },
        });
      });
    }
  };

  getBase64(file: any, cb: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }

  updateProfile = async (e: any) => {
    const {values, setSubmitting} = e;

    let formData = new FormData();
    if (this.state.file) {
      formData.append("picture", this.state.file);
    }
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("company", values.company);
    formData.append("industry", values.industry);
    formData.append("title", values.title);
    formData.append("headline", values.headline);

    try {
      const updatedUser: any = await appApi.put("/users/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const {setUser, setToken} = StorageService;
      const {dispatch}: any = this.props;
      const {company, email, firstName, lastName, id, picture, title, verified, headline, industry} = updatedUser.data;
      setUser({company, email, firstName, lastName, id, picture, title, verified, headline, industry});
      setToken(updatedUser.data.jwt);
      dispatch({
        type: UserActionsTypes.SET_CURRENT_USER,
        payload: updatedUser.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      this.setState({
        snackbar: true,
      });
    }
  };

  handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackbar: false,
    });
  };

  render() {
    return (
      <div>
        <Helmet>
          {/* <meta charSet="utf-8" /> */}
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <title>My Account</title>
          <meta name="title" content={`My Account`} />
        </Helmet>
        <Snackbar open={this.state.snackbar} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            Profile updated successfully.
          </Alert>
        </Snackbar>
        {this.state.isLoading ? (
          <div className="p-4 text-center">
            <Loader />
          </div>
        ) : (
          <Formik
            initialValues={this.state.form_data}
            enableReinitialize={true}
            validationSchema={validation_Schema}
            onSubmit={(values: any, {setErrors, setSubmitting}) => {
              this.updateProfile({values, setErrors, setSubmitting});
            }}
          >
            {({values, errors, touched, handleSubmit, setFieldValue, handleChange, isSubmitting}) => (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                  <Col md={12} className="no-padding-left">
                    <div className="profile_section">
                      <Row>
                        <Col md={4} className="text-center">
                          <div className="profileImageWrapper">
                            <img src={values.picture} />
                          </div>
                        </Col>
                        <Col md={8}>
                          <div className="anonymous_Review">
                            <h4>Anonymous Review</h4>
                            <span> {this.state.form_data.isAnonymousVerified ? "Eligible" : "Not Eligible"}</span>
                          </div>
                        </Col>
                        <div className="upload_button">
                          <div className="upload-btn-wrapper">
                            <button className="btn">
                              <EditIcon />
                            </button>
                            <input
                              type="file"
                              onChange={(event: any) => {
                                this.changeProfleImage(event.currentTarget.files[0]);
                              }}
                              accept="image/*"
                              name="profileImage"
                            />
                          </div>
                        </div>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <div className="account_form">
                  <Row>
                    <Col md={6} className="no-padding-left">
                      <TextField
                        error={errors.firstName && touched.firstName ? true : false}
                        label="First Name"
                        variant="outlined"
                        className="w-100 mt-4"
                        name="firstName"
                        defaultValue={values.firstName}
                        helperText={errors.firstName && touched.firstName ? errors.firstName : null}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={6} className="no-padding-right">
                      <TextField
                        error={errors.lastName && touched.lastName ? true : false}
                        label="Last Name"
                        variant="outlined"
                        className="w-100 mt-4"
                        name="lastName"
                        defaultValue={values.lastName}
                        helperText={errors.lastName && touched.lastName ? errors.lastName : null}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="no-padding-left">
                      <TextField
                        error={errors.email && touched.email ? true : false}
                        label="Email"
                        variant="outlined"
                        className="w-100 mt-4"
                        name="email"
                        defaultValue={values.email}
                        helperText={errors.email && touched.email ? errors.email : null}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={6} className="no-padding-right">
                      <TextField
                        error={errors.company && touched.company ? true : false}
                        label="Company"
                        variant="outlined"
                        className="w-100 mt-4"
                        name="company"
                        defaultValue={values.company}
                        helperText={errors.company && touched.company ? errors.company : null}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="no-padding-left">
                      <TextField
                        error={errors.industry && touched.industry ? true : false}
                        label="Industry (Optional)"
                        variant="outlined"
                        className="w-100 mt-4"
                        name="industry"
                        defaultValue={values.industry}
                        helperText={errors.industry && touched.industry ? errors.industry : null}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={6} className="no-padding-right">
                      <TextField
                        error={errors.title && touched.title ? true : false}
                        label="Job Title (Optional)"
                        variant="outlined"
                        className="w-100 mt-4"
                        name="title"
                        defaultValue={values.title}
                        helperText={errors.title && touched.title ? errors.title : null}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="no-padding-left">
                      <TextField
                        error={errors.headline && touched.headline ? true : false}
                        label="Headline (Optional)"
                        variant="outlined"
                        className="w-100 mt-4"
                        name="headline"
                        defaultValue={values.headline}
                        helperText={errors.headline && touched.headline ? errors.headline : null}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  {/* <Row>
                    <Col md={12}>
                      <div className="linked_in_sync">
                        <div>
                          <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 382 382">
                            <path
                              style={{fill: "#0077B7"}}
                              d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
                            C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
                            H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
                            c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
                            s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
                            c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
                            c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
                            c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
                            L341.91,330.654L341.91,330.654z"
                            />
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                          </svg>
                          <span>Linked in not connected.</span>
                        </div>
                        <a href="">Sync</a>
                      </div>
                    </Col>
                  </Row> */}

                  <div className="text-center mt-3">
                    <button className="save_button" type="submit" disabled={isSubmitting}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    profile: state.profile,
    login: state.login,
    user: state.user,
  };
};

export default connect(mapStateToProps)(index);
