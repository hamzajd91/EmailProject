import React, {Component} from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {setSenderInformation} from "../../../../store/ducks/review_invitaions/actions";
import {ApplicationState} from "../../../../store";
import * as Yup from "yup";
import {Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import "./../index.scss";

// Validation schema
const validation_Schema = Yup.object().shape({
  reply_to_email: Yup.string()
    .required("Enter valid email address.")
    .email("Enter valid email address."),
  sender_name: Yup.string().required("Name is required."),
  subject: Yup.string().required("Subject is required."),
  template: Yup.string().required("Template is required."),
});

class SenderInformation extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email_modal: false,
      isLoading: true,
      snackbar: false,
      snackbar_varient: "",
      snackbar_message: "",
      companies: [],
      form_data: {
        sender_name: "",
        subject: "",
        reply_to_email: "",
        template: "",
        sender_email_type: "default",
      },
    };
  }

  async componentDidMount() {
    const {sender_information} = this.props.review_invitaions;
    const {companyInfo, user} = this.props;
    this.setState({
      form_data: {
        ...sender_information,
        reply_to_email: sender_information.reply_to_email == "" ? user.email : sender_information.reply_to_email,
        sender_name:
          sender_information.sender_name == "" ? `${user.firstName} ${user.lastName}` : sender_information.sender_name,
        company: companyInfo.companyId,
      },
    });
  }

  handleInput = (data: any) => {
    const {e, setFieldValue} = data;
    this.setState({
      form_data: {
        ...this.state.form_data,
        [e.target.name]: e.target.value,
      },
    });
    setFieldValue([e.target.name], e.target.value);
    this.props.setSenderInformation({
      sender_information: {
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const {form_data} = this.state;
    const {companyInfo} = this.props;

    return (
      <>
        <h4 className="mb-2">
          <b>Sender Information</b>
        </h4>
        <p className="mb-4">
          <small>
            Set up your Sender Name and Sender Email - they appear on your customers inbox when they receive email
            invitation. The Reply-to Email is the address you'd like your customers to use when replying to your email.
          </small>
        </p>
        <Formik
          initialValues={form_data}
          enableReinitialize={true}
          validationSchema={validation_Schema}
          onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
            if (values.template.getCurrentContent().getPlainText().length === 0) {
              setSubmitting(false);
              return setErrors({template: "Template is required."});
            }
            values.company = companyInfo.companyId;
            this.props.setSenderInformation({sender_information: values});
            this.props.nextStep();
          }}
        >
          {({values, errors, touched, handleSubmit, handleChange, setFieldValue, isSubmitting}) => {
            return (
              <form onSubmit={handleSubmit} className="form_main">
                <TextField
                  error={errors.subject && touched.subject ? true : false}
                  label="Email Subject"
                  variant="outlined"
                  name="subject"
                  className="mb-4 w-100"
                  value={values.subject || ""}
                  helperText={errors.subject && touched.subject ? errors.subject : null}
                  onChange={(e: any) => this.handleInput({e, setFieldValue})}
                />

                <TextField
                  error={errors.sender_name && touched.sender_name ? true : false}
                  label="Sender Name"
                  variant="outlined"
                  name="sender_name"
                  className="mb-4 w-100"
                  value={values.sender_name}
                  helperText={errors.sender_name && touched.sender_name ? errors.sender_name : null}
                  onChange={(e: any) => this.handleInput({e, setFieldValue})}
                />

                <TextField
                  error={errors.reply_to_email && touched.reply_to_email ? true : false}
                  label="Reply-to Email"
                  variant="outlined"
                  name="reply_to_email"
                  className="mb-4 w-100"
                  value={values.reply_to_email}
                  helperText={errors.reply_to_email && touched.reply_to_email ? errors.reply_to_email : null}
                  onChange={(e: any) => this.handleInput({e, setFieldValue})}
                />

                <div className="mb-4">
                  <BraftEditor
                    value={values.template}
                    language="en"
                    stripPastedStyles={true}
                    className="border"
                    controls={[]}
                    onChange={editorState => {
                      // console.log(editorState.toHTML());
                      // editorState.getCurrentContent().getPlainText()
                      setFieldValue("template", editorState);
                    }}
                  />
                  {errors.template && touched.template ? (
                    <FormHelperText error>{errors.template}</FormHelperText>
                  ) : null}
                </div>

                <button type="button" onClick={() => this.props.previousStep()} className="btn btn-light">
                  Back
                </button>
                <button type="submit" className="btn btn-primary ml-2">
                  Continue
                </button>
              </form>
            );
          }}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    review_invitaions: state.review_invitaions,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSenderInformation: (params: any) => dispatch(setSenderInformation(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SenderInformation);
