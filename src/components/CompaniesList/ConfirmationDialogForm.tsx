import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {Formik} from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {connect} from "react-redux";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const companyProposalSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  business_email: Yup.string()
    .email("Enter valid email address.")
    .required("Business email is required"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid."),
  company: Yup.string().required("Company is required"),
  company_size: Yup.string().required("Company size is required"),
  industries: Yup.string().required("Industries is required"),
  terms: Yup.bool().oneOf([true], "This filed is required."),
});

interface ConfirmationDialogRawProps {
  classes: Record<"paper", string>;
  industries: any;
  suggestedCompanies: any;
  multi_companies: any;
  open: boolean;
  multi: boolean;
  user: any;
  onClose: () => void;
  formSendInquiry: (data: any) => void;
}

const useModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        padding: "0 0 15px 0",
        margin: "0 0 15px 0",
        width: "100%",
      },
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

const ConfirmationDialogForm = (props: ConfirmationDialogRawProps) => {
  const classes = useModalStyles();
  const {
    onClose,
    industries,
    open,
    formSendInquiry,
    multi,
    multi_companies,
    suggestedCompanies,
    user,
    ...other
  } = props;

  const company_size = ["My Self", "2-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
  return (
    <Dialog maxWidth="sm" fullWidth={true} open={open} {...other}>
      <DialogTitle>
        {multi ? (
          <>
            Request Request Info
            <br />
            <small>Comapnies may contact you regarding your request.</small>
          </>
        ) : (
          <>
            Request {suggestedCompanies.company_name} Request Info
            <br />
            <small>{suggestedCompanies.company_name} may contact you regarding your request.</small>
          </>
        )}

        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Formik
        initialValues={{
          first_name: user.user.firstName,
          last_name: user.user.lastName,
          business_email: user.user.email,
          phone_number: "",
          company: user.user.company || "",
          company_size: "My Self",
          industries: "",
          terms: false,
        }}
        enableReinitialize={true}
        validationSchema={companyProposalSchema}
        onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
          formSendInquiry({values, setErrors, setSubmitting, resetForm});
        }}
      >
        {({values, errors, touched, handleSubmit, handleChange, setFieldValue, isSubmitting}) => (
          <>
            <form onSubmit={handleSubmit} className={classes.root}>
              <DialogContent dividers>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      error={errors.first_name && touched.first_name ? true : false}
                      label="First name"
                      variant="outlined"
                      defaultValue={values.first_name}
                      helperText={errors.first_name && touched.first_name ? errors.first_name : null}
                      name="first_name"
                      autoComplete="off"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      error={errors.last_name && touched.last_name ? true : false}
                      label="Last name"
                      variant="outlined"
                      defaultValue={values.last_name}
                      helperText={errors.last_name && touched.last_name ? errors.last_name : null}
                      name="last_name"
                      autoComplete="off"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      error={errors.business_email && touched.business_email ? true : false}
                      label="Business Email"
                      variant="outlined"
                      defaultValue={values.business_email}
                      helperText={errors.business_email && touched.business_email ? errors.business_email : null}
                      name="business_email"
                      autoComplete="off"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      error={errors.phone_number && touched.phone_number ? true : false}
                      label="Phone Number"
                      variant="outlined"
                      defaultValue={values.phone_number}
                      helperText={errors.phone_number && touched.phone_number ? errors.phone_number : null}
                      name="phone_number"
                      autoComplete="off"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      error={errors.company && touched.company ? true : false}
                      label="Company"
                      variant="outlined"
                      defaultValue={values.company}
                      helperText={errors.company && touched.company ? errors.company : null}
                      name="company"
                      autoComplete="off"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <FormControl
                      error={errors.company_size && touched.company_size ? true : false}
                      style={{width: "100%"}}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="name-native-error">Company Size</InputLabel>
                      <Select
                        name="company_size"
                        label="Company Size"
                        onChange={(e: any) => {
                          setFieldValue("company_size", e.target.value);
                        }}
                        value={values.company_size}
                      >
                        {company_size.map((size: any) => {
                          return (
                            <MenuItem key={size} value={size}>
                              {size}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.company_size && touched.company_size ? (
                        <FormHelperText>{errors.company_size}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="col-sm-6">
                    <FormControl
                      error={errors.industries && touched.industries ? true : false}
                      style={{width: "100%"}}
                      variant="outlined"
                    >
                      <InputLabel>Industry</InputLabel>
                      <Select
                        name="industries"
                        label="Industry"
                        onChange={(e: any) => {
                          setFieldValue("industries", e.target.value);
                        }}
                        value={values.industries}
                      >
                        {industries.map((option: any) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.industries && touched.industries ? (
                        <FormHelperText>{errors.industries}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="col-sm-12 mt-3">
                    {multi ? (
                      <>
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
                            <p className="terms mb-0">I agree that Comapnies may contact me regarding my request.</p>
                          }
                        />
                      </>
                    ) : (
                      <>
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
                            <p className="terms mb-0">
                              I agree that {suggestedCompanies.company_name} may contact me regarding my request.
                            </p>
                          }
                        />
                      </>
                    )}

                    {errors.terms && touched.terms ? (
                      <small className="d-block text-danger">{errors.terms}</small>
                    ) : null}
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <div className="col-sm-12">
                  <button className="request_quote" type="submit" disabled={isSubmitting}>
                    Request Info
                  </button>
                </div>
              </DialogActions>
            </form>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ConfirmationDialogForm);
