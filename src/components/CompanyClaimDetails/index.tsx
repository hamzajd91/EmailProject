import React from "react";
import "./index.scss";
import * as Yup from "yup";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import Autocomplete from "@material-ui/lab/Autocomplete";
import appApi from "../../services/appApi";
import api from "../../services/api";
import { ApplicationState } from "../../store";
import StorageService from "../../services/StorageService";
const authToken = StorageService.getToken();

const claimSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  claimEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required."),
});

const additionSchema = Yup.object().shape({
  claimEmail: Yup.string().email("Invalid email"),
  email: Yup.string().email("Invalid email"),
  yearFounded: Yup.number(),
  fb: Yup.string().matches(
    new RegExp("^((?:http://)?|(?:https://)?)?(?:www\\.)?facebook\\.com", "i"),
    "Enter valid facebook url."
  ),
  linkedin: Yup.string().matches(
    new RegExp("^((?:http://)?|(?:https://)?)?(?:www\\.)?linkedin\\.com", "i"),
    "Enter valid linedin url."
  ),
  twitter: Yup.string().matches(
    new RegExp("^((?:http://)?|(?:https://)?)?(?:www\\.)?twitter\\.com", "i"),
    "Enter valid twitter url."
  ),
  youtube: Yup.string().matches(
    new RegExp("^((?:http://)?|(?:https://)?)?(?:www\\.)?youtube\\.com", "i"),
    "Enter valid youtube url."
  ),
});
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        padding: "0 0 15px 0",
        margin: "0 0 15px 0",
        width: "100%",
      },
    },
  })
);

function CompanyClaimDetails(props: any) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const [isClaimed, setIsClaimed] = React.useState(false);
  const [proficiencyError, setProficiencyError] = React.useState(false);
  const [additionalFields, setAdditionalFields] = React.useState<any>();
  // const [claimFields, setClaimFields] = React.useState<any>();
  const [proficiencies, setProficiencies] = React.useState([]);
  const fixedOptions: any = [];
  const [value, setValue] = React.useState<any>([...fixedOptions]);

  // useEffect(() => {
  //   // const companyId = props.match.params.id;
  // }, []);

  const getProficiency = async (inputValue: string) => {
    if (inputValue) {
      const query: any = { query: inputValue };
      const results = await appApi.get("/proficiencies", { params: query });
      const oldValue: never[] = value;
      const ids = value.map((v: any) => v.id);
      const res: never[] = results.data.data.filter((single: any) => !ids.includes(single.id));
      console.log(res);
      setProficiencies([...res, ...oldValue]);
    }
  };


  const addTags = async (event: any) => {
    console.log(event);

    //const {proficiencies, maxProf} = this.state;
    const proficiencyText = event.target.value;
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: { Authorization: token || "" },
    };
    const body = {
      name: proficiencyText,
      companyId: props.match.params.id,
    };
    await appApi.post(`${process.env.REACT_APP_NODE_CLIENT_HOST}/proficiencies`, body).then(response => {
      const { data } = response;
      const data1 = [...proficiencies, data];
      setValue(data1)
      console.log(data1)
      //setProficiencies
      //setProficiencies(data1)
    });

  };



  const submitData = async (e: any) => {
    const { values, setErrors, setSubmitting } = e;
    const companyId = props.match.params.id;
    const body = {
      claimEmail: values.claimEmail,
      claimName: values.name,
      companyId,
      email: additionalFields.email,
      proficiencies: value.map((v: any) => v.id),
      repEmail: additionalFields.repEmail,
      repName: additionalFields.repName,
      social: {
        fb: additionalFields.fb,
        twitter: additionalFields.twitter,
        linkedin: additionalFields.linkedin,
        youtube: additionalFields.youtube,
      },
      yearFounded: additionalFields.yearFounded,
    };
    const token = `JWT ${authToken}`;
    try {
      const options = {
        headers: { Authorization: token || "" },
      };
      await api.post(`/companies/${companyId}/claim`, body, options);
      setIsClaimed(true);
    } catch (error) {
      switch (error.response.status) {
        case 400:
          setErrors({ claimEmail: "Email domain does not match website's url." });
          break;

        default:
          break;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-5 pb-5">
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="page_custom_title">
              {activeStep === 1 ? (
                <React.Fragment>
                  <h4>Additional Information</h4>
                  <p>
                    Please provide additional information if you are claiming this company on behalf of the firm. This
                    will help us gather more information on the firm.
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h4>Claim Company</h4>
                  <p>
                    Please provide an email that matches the company website domain. We will verify the email and then
                    you may start the claim process through a link we will send to your email.
                  </p>
                </React.Fragment>
              )}
            </div>

            <div style={{ display: `${activeStep == 1 ? "block" : "none"}` }}>
              <Formik
                initialValues={{
                  repName: "",
                  repEmail: "",
                  email: "",
                  yearFounded: "",
                  fb: "",
                  linkedin: "",
                  twitter: "",
                  youtube: "",
                }}
                enableReinitialize={true}
                validationSchema={additionSchema}
                onSubmit={(values: any, { setErrors, setSubmitting }) => {

                  setAdditionalFields(values);
                  setActiveStep(2);
                }}
              >
                {({ values, errors, touched, handleSubmit, handleChange, isSubmitting }) => (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }} className={classes.root}>
                    <React.Fragment>
                      <TextField
                        error={!!(errors.repName && touched.repName)}
                        helperText={errors.repName && touched.repName ? errors.repName : null}
                        label="Name of Local Contact Representative (Optional)"
                        variant="outlined"
                        name="repName"
                        defaultValue={values.repName}
                        onChange={handleChange}
                        autoComplete="off"
                      />

                      <TextField
                        label="Contact Representative Email (Optional)"
                        variant="outlined"
                        name="repEmail"
                        defaultValue={values.repEmail}
                        onChange={handleChange}
                        autoComplete="off"
                      />

                      <TextField
                        error={!!(errors.email && touched.email)}
                        helperText={errors.email && touched.email ? errors.email : null}
                        label="Company General Support Email (Optional)"
                        variant="outlined"
                        name="email"
                        defaultValue={values.email}
                        onChange={handleChange}
                        autoComplete="off"
                      />

                      <TextField
                        error={!!(errors.yearFounded && touched.yearFounded)}
                        helperText={errors.yearFounded && touched.yearFounded ? errors.yearFounded : null}
                        label="Year Founded (Optional)"
                        variant="outlined"
                        type="number"
                        name="yearFounded"
                        defaultValue={values.yearFounded}
                        autoComplete="off"
                        onChange={handleChange}
                      />

                      <Autocomplete
                        multiple
                        style={{ width: "100%" }}
                        value={value}
                        onKeyPress={(event) => {
                          console.log(event.key);
                          if (event.key === 'Enter' || event.key === 'enter') {
                            addTags(event)
                            event.preventDefault();
                            return false;
                          }
                        }}
                        onChange={(event, newValue) => {
                          // console.log(event);
                          event.preventDefault();
                          console.log(newValue);
                          console.log(fixedOptions);
                          if (value.length == 0 || newValue.length == 0) {
                            setValue([
                              ...fixedOptions,
                              ...newValue.filter(option => fixedOptions.indexOf(option) === -1),
                            ]);
                            setProficiencyError(false);
                          } else {
                            setProficiencyError(true);
                          }
                        }}
                        options={proficiencies}
                        getOptionLabel={(option: any) => option.name}
                        onInputChange={(event: object, value: string) => {
                          console.log('data>>>>', value);
                          getProficiency(value);
                        }}
                        // renderTags={(tagValue, getTagProps) =>
                        //   tagValue.map((option, index) => (
                        //     <Chip
                        //       label={option.title}
                        //       {...getTagProps({index})}
                        //       disabled={fixedOptions.indexOf(option) !== -1}
                        //     />
                        //   ))
                        // }
                        renderInput={params => <TextField {...params} label="Proficiencies" variant="outlined" />}
                      />

                      {proficiencyError ? (
                        <div style={{ marginTop: "-25px", marginBottom: "35px" }}>
                          <small className="text-danger">
                            You can only add one proficiency at this stage of the process. Once you successfully claim
                            your company, you can review our subscription model and add more proficiencies based on the
                            limit included in each subscription level.
                          </small>
                        </div>
                      ) : null}

                      <TextField
                        error={!!(errors.fb && touched.fb)}
                        helperText={errors.fb && touched.fb ? errors.fb : null}
                        label="Facebook Business URL (Optional)"
                        variant="outlined"
                        name="fb"
                        defaultValue={values.fb}
                        autoComplete="off"
                        onChange={handleChange}
                      />

                      <TextField
                        error={!!(errors.linkedin && touched.linkedin)}
                        helperText={errors.linkedin && touched.linkedin ? errors.linkedin : null}
                        label="LinkedIn URL (Optional)"
                        variant="outlined"
                        name="linkedin"
                        defaultValue={values.linkedin}
                        autoComplete="off"
                        onChange={handleChange}
                      />

                      <TextField
                        error={!!(errors.twitter && touched.twitter)}
                        helperText={errors.twitter && touched.twitter ? errors.twitter : null}
                        label="Twitter URL (Optional)"
                        variant="outlined"
                        name="twitter"
                        defaultValue={values.twitter}
                        autoComplete="off"
                        onChange={handleChange}
                      />

                      <TextField
                        error={!!(errors.youtube && touched.twitter)}
                        helperText={errors.twitter && touched.twitter ? errors.twitter : null}
                        label="YouTube URL (Optional)"
                        variant="outlined"
                        name="youtube"
                        defaultValue={values.youtube}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                      <button className="form_btn" type="submit" disabled={isSubmitting}>
                        Continue To Claim
                      </button>
                    </React.Fragment>
                  </form>
                )}
              </Formik>
            </div>

            <div style={{ display: `${activeStep == 2 ? "block" : "none"}` }}>
              <Formik
                initialValues={{
                  name: `${props.user.user.firstName} ${props.user.user.lastName}`,
                  claimEmail: props.user.user.email,
                }}
                enableReinitialize={false}
                validationSchema={claimSchema}
                onSubmit={(values: any, { setErrors, setSubmitting }) => {
                  // setClaimFields(values);
                  submitData({ values, setErrors, setSubmitting });
                }}
              >
                {({ values, errors, touched, handleSubmit, handleChange, isSubmitting }) => {
                  return (
                    <form onSubmit={handleSubmit} className={classes.root}>
                      <React.Fragment>
                        <TextField
                          error={!!(errors.name && touched.name)}
                          helperText={errors.name && touched.name ? errors.name : null}
                          label="Name"
                          variant="outlined"
                          name="name"
                          // value={values.name}
                          defaultValue={values.name}
                          onChange={handleChange}
                          autoComplete="off"
                        />

                        <TextField
                          error={!!(errors.claimEmail && touched.claimEmail)}
                          helperText={errors.claimEmail && touched.claimEmail ? errors.claimEmail : null}
                          label="Work Email"
                          variant="outlined"
                          name="claimEmail"
                          autoComplete="off"
                          // value={values.claimEmail}
                          defaultValue={values.claimEmail}
                          onChange={handleChange}
                        />
                        <p>
                          By continuing, you agree you have the authority to claim this account on behalf of this firm.
                          You agree to Hindsyght’s <Link to="/terms">Terms of Use</Link> and{" "}
                          <Link to="/privacyPolicy">Privacy Policy</Link>.
                        </p>
                        <p>
                          You also understand that Hindsyght may send marketing emails regarding Hindsyght products,
                          services, and events. You can unsubscribe at any time.
                        </p>
                        {isClaimed ? (
                          <p className="text-success">
                            Great! A verification email has been sent to ! If not received, please check your SPAM
                            folder.
                          </p>
                        ) : (
                          <button className="form_btn" type="submit" disabled={isSubmitting}>
                            Submit Claim
                          </button>
                        )}
                      </React.Fragment>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(CompanyClaimDetails);
