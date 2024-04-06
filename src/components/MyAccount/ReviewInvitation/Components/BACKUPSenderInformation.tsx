import React, {Component} from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {setSenderInformation} from "../../../../store/ducks/review_invitaions/actions";
import {ApplicationState} from "../../../../store";
import * as Yup from "yup";
import {Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import appApi from "../../../../services/appApi";
import {Loader} from "../../../Loader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import BraftEditor from "braft-editor";
import $ from "jquery";
import "braft-editor/dist/index.css";
import "./../index.scss";

const defaultTemplate = `<p>{{ userName }} has invited you to write a review for {{ companyName }} on the Hindsyght platform. Please click on the link below to start the review process. It will just take a couple of minutes!</p>
<p>Hindsyght is the go-to platform for connecting IT services and solutions with businesses across the nation.</p>`;

// Validation schema
const validation_Schema = Yup.object().shape({
  reply_to_email: Yup.string().email("Enter valid email address."),
  sender_name: Yup.string().required("Name is required"),
});
const emailSchemaValidation = Yup.object().shape({
  custom_email: Yup.string()
    .email("Enter valid email address.")
    .required("Email is required"),
});

class BACKUPSenderInformation extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email_modal: false,
      isLoading: true,
      snackbar: false,
      snackbar_varient: "",
      snackbar_message: "",
      companies: [],
      user_custom_emails: [],
      custom_email: "",
      custom_email_status: false,
      isCustomEmailLoading: true,

      emailTemplates: [],
      emailTemplateModal: false,

      form_data: {
        sender_name: "",
        reply_to_email: "",
        sender_email_type: "default",
        emailTemplate: "default",
        company: "",
        custom_email: "",
      },
    };
  }

  async componentDidMount() {
    const {sender_information} = this.props.review_invitaions;
    const {companyInfo} = this.props;
    this.setState({
      form_data: {
        ...sender_information,
        company: companyInfo.companyId,
      },
    });
    this.getEmailTemplates();
  }

  getEmailTemplates = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const response = await appApi.get("/users/email/template/get");
      this.setState({
        isLoading: false,
        emailTemplates: response.data,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        emailTemplates: [],
      });
    }
  };

  checkEmailStatus = async (email: any) => {
    this.getCustomEmails();
  };

  handleRadioChange = async (data: any) => {
    const {e, setFieldValue} = data;
    setFieldValue("sender_email_type", e.target.value);
    if (e.target.value == "custom") {
      this.getCustomEmails();
      this.setState({
        email_modal: !this.state.email_modal,
        form_data: {
          ...this.state.form_data,
          sender_email_type: e.target.value,
        },
      });
    } else {
      this.setState({
        form_data: {
          ...this.state.form_data,
          sender_email_type: e.target.value,
          custom_email: "",
        },
      });
      this.props.setSenderInformation({
        sender_information: {
          custom_email: "",
        },
      });
    }
  };

  getCustomEmails = async () => {
    this.setState({
      isCustomEmailLoading: true,
    });
    const response = await appApi.get("/users/get/custom/emails");
    this.setState({
      user_custom_emails: response.data.data,
      isCustomEmailLoading: false,
    });
  };

  handleEmailModal = () => {
    let form_data = {
      ...this.state.form_data,
    };

    if (this.state.form_data.custom_email == "") {
      form_data = {
        ...this.state.form_data,
        sender_email_type: "default",
      };
    }

    this.setState({
      email_modal: !this.state.email_modal,
      form_data: form_data,
    });
  };

  sendVerificationEmail = async (data: any) => {
    const {values, setSubmitting, resetForm} = data;

    await appApi.post("/users/send/custom/email/verification", {email: values.custom_email});
    setSubmitting(false);
    resetForm();
    this.getCustomEmails();
  };

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

  handleCustomEmail = (e: any) => {
    this.setState({
      form_data: {
        ...this.state.form_data,
        custom_email: e.target.value,
      },
    });
    this.props.setSenderInformation({
      sender_information: {
        custom_email: e.target.value,
      },
    });
  };

  createEmailTemplate = async (data: any) => {
    const {values, setErrors, setSubmitting, resetForm} = data;

    if (values.template.getCurrentContent().getPlainText().length === 0) {
      setSubmitting(false);
      return setErrors({template: "Template is required."});
    }
    const _data = {
      template: $("<textarea />")
        .html(values.template.toHTML())
        .text(),
      templateName: values.templateName,
    };
    await appApi.post("/users/email/template/create", _data);
    setSubmitting(false);
    resetForm();
    this.setState({
      emailTemplateModal: false,
    });
    this.getEmailTemplates();
  };

  handleEmailTemplateModal = () => {
    this.setState({
      emailTemplateModal: !this.state.emailTemplateModal,
    });
  };

  render() {
    const {
      isCustomEmailLoading,
      isLoading,
      emailTemplates,
      emailTemplateModal,
      form_data,
      email_modal,
      user_custom_emails,
    } = this.state;
    const {companyInfo} = this.props;

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1>{this.state.html}</h1>
            <h4 className="mb-2">
              <b>Sender Information</b>
            </h4>
            <p className="mb-4">
              <small>
                Set up your Sender Name and Sender Email - they appear on your customers inbox when they receive email
                invitation. The Reply-to Email is the address you'd like your customers to use when replying to your
                email.
              </small>
            </p>
            <Formik
              initialValues={form_data}
              enableReinitialize={true}
              validationSchema={validation_Schema}
              onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
                values.company = companyInfo.companyId;
                this.props.setSenderInformation({sender_information: values});
                this.props.nextStep();
              }}
            >
              {({values, errors, touched, handleSubmit, handleChange, setFieldValue, isSubmitting}) => {
                return (
                  <form onSubmit={handleSubmit} className="form_main">
                    <div className="template_selection d-flex align-items-center mb-4">
                      <div className="select_menu">
                        <TextField
                          error={errors.emailTemplate && touched.emailTemplate ? true : false}
                          select
                          label="Email Template"
                          value={values.emailTemplate}
                          name="emailTemplate"
                          className="w-100"
                          onChange={(e: any) => this.handleInput({e, setFieldValue})}
                          helperText={errors.emailTemplate && touched.emailTemplate ? errors.emailTemplate : null}
                          variant="outlined"
                        >
                          <MenuItem value={`default`}>Default</MenuItem>
                          {emailTemplates.map((template: any) => (
                            <MenuItem key={template.id} value={template.id}>
                              {template.templateName}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div>
                        <button type="button" onClick={this.handleEmailTemplateModal} className="btn btn-primary">
                          Create
                        </button>
                      </div>
                    </div>

                    <TextField
                      error={errors.sender_name && touched.sender_name ? true : false}
                      label="Sender Name"
                      variant="outlined"
                      name="sender_name"
                      className="mb-4 w-100"
                      defaultValue={values.sender_name}
                      helperText={errors.sender_name && touched.sender_name ? errors.sender_name : null}
                      onChange={(e: any) => this.handleInput({e, setFieldValue})}
                    />

                    <TextField
                      error={errors.reply_to_email && touched.reply_to_email ? true : false}
                      label="Reply-to Email"
                      variant="outlined"
                      name="reply_to_email"
                      className="mb-4 w-100"
                      defaultValue={values.reply_to_email}
                      helperText={errors.reply_to_email && touched.reply_to_email ? errors.reply_to_email : null}
                      onChange={(e: any) => this.handleInput({e, setFieldValue})}
                    />

                    <RadioGroup
                      name="sender_email_type"
                      value={values.sender_email_type}
                      defaultValue={"default"}
                      onChange={(e: any) => this.handleRadioChange({e, setFieldValue})}
                    >
                      <FormControlLabel value="default" control={<Radio />} label="Send from default email address." />
                      <FormControlLabel
                        value="custom"
                        control={<Radio />}
                        label="Send email using your own email domain for the sender address."
                      />
                    </RadioGroup>

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
        )}

        <Dialog open={email_modal} fullWidth={true} maxWidth={`sm`} onClose={this.handleEmailModal} scroll={"paper"}>
          <DialogTitle id="scroll-dialog-title">Custom Email</DialogTitle>
          <DialogContent dividers>
            {isCustomEmailLoading ? (
              <Loader />
            ) : (
              <RadioGroup value={this.state.form_data.custom_email}>
                {user_custom_emails.map((_email: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      {_email.verified_status ? (
                        <div className="w-100 custom_email_check align-items-center d-flex">
                          <span>{_email.email}</span>
                          <FormControlLabel
                            className="m-0 p-0 ml-auto"
                            onChange={this.handleCustomEmail}
                            value={_email.email}
                            control={<Radio />}
                            label=""
                          />
                        </div>
                      ) : (
                        <div className="w-100 custom_email_check align-items-center d-flex">
                          <span>{_email.email}</span>
                          <button
                            className="btn btn-primary btn-sm ml-auto"
                            onClick={() => this.checkEmailStatus(_email.email)}
                          >
                            Check Status
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </RadioGroup>
            )}
            <div className="w-100">
              <Formik
                initialValues={{custom_email: this.state.custom_email}}
                enableReinitialize={true}
                validationSchema={emailSchemaValidation}
                onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
                  this.sendVerificationEmail({values, setErrors, setSubmitting, resetForm});
                }}
              >
                {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => {
                  return (
                    <form className="custom_email_form" onSubmit={handleSubmit}>
                      <div className="email_field">
                        <TextField
                          error={errors.custom_email && touched.custom_email ? true : false}
                          label="Custom Email"
                          variant="outlined"
                          name="custom_email"
                          className="w-100"
                          defaultValue={values.custom_email}
                          helperText={errors.custom_email && touched.custom_email ? errors.custom_email : null}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="btn_field">
                        {isSubmitting ? (
                          <button type="button" className="btn btn-primary ml-2" disabled>
                            Sending...
                          </button>
                        ) : (
                          <button type="submit" className="btn btn-primary ml-2">
                            Send
                          </button>
                        )}
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog
          open={emailTemplateModal}
          fullWidth={true}
          maxWidth={`sm`}
          onClose={this.handleEmailTemplateModal}
          scroll={"paper"}
        >
          <DialogTitle id="scroll-dialog-title">Email Template</DialogTitle>
          <DialogContent dividers>
            <div className="w-100">
              <Formik
                initialValues={{
                  template: BraftEditor.createEditorState(defaultTemplate),
                  templateName: "",
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                  template: Yup.string().required("Template is required."),
                  templateName: Yup.string().required("Template name is required"),
                })}
                onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
                  this.createEmailTemplate({values, setErrors, setSubmitting, resetForm});
                }}
              >
                {({values, errors, touched, handleSubmit, handleChange, setFieldValue, isSubmitting}: any) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        error={errors.templateName && touched.templateName ? true : false}
                        label="Template Name"
                        variant="outlined"
                        name="templateName"
                        className="w-100 mb-3"
                        defaultValue={values.templateName}
                        helperText={errors.templateName && touched.templateName ? errors.templateName : null}
                        onChange={handleChange}
                      />

                      <BraftEditor
                        value={values.template}
                        language="en"
                        stripPastedStyles={true}
                        className="border"
                        controls={[
                          "undo",
                          "redo",
                          "separator",
                          "font-size",
                          "line-height",
                          "letter-spacing",
                          "remove-styles",
                          "separator",
                          "text-indent",
                          "text-align",
                          "separator",
                          "headings",
                          "list-ul",
                          "list-ol",
                          "separator",
                          "hr",
                          "table",
                          "clear",
                        ]}
                        onChange={editorState => {
                          // console.log(editorState.toHTML());
                          // editorState.getCurrentContent().getPlainText()
                          setFieldValue("template", editorState);
                        }}
                      />
                      {errors.template && touched.template ? (
                        <FormHelperText error>{errors.template}</FormHelperText>
                      ) : null}
                      {isSubmitting ? (
                        <button type="button" disabled className="btn btn-primary btn-block mt-2">
                          Please wait...
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary btn-block mt-2">
                          Create
                        </button>
                      )}
                    </form>
                  );
                }}
              </Formik>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    review_invitaions: state.review_invitaions,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSenderInformation: (params: any) => dispatch(setSenderInformation(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BACKUPSenderInformation);
