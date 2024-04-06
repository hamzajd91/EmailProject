import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import {ApplicationState} from "../../store";
import "./index.scss";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import appApi from "../../services/appApi";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import {Loader} from "../Loader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const countries: any = require("../../data/countries.json");

// Validation schema
const validation_Schema = Yup.object().shape({
  name: Yup.string().required("Company Name is required."),
  industries: Yup.string().required("Industries is required."),
  address1: Yup.string().required("Address is required."),
  city: Yup.string().required("Company city is required."),
  state: Yup.string()
    // .required("Company state is required.")
    .min(2, "State must be exactly 2 characters.")
    .max(2, "State must be exactly 2 characters."),
  postalCode: Yup.string().required("Company Zipcode is required."),
  phone: Yup.string().required("Company phone number is required."),
  country: Yup.string().required("Company country is required."),
  website: Yup.string()
    .required("Company website is required.")
    .matches(
      new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ),
      "Enter valid website address."
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

function CompanyDetails(props: any) {
  const [industries, setIndustries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [claim, sethandleClaim] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    async function fetchIndustries() {
      const response = await appApi.get("/industries");
      setIndustries(response.data);
      setIsLoading(false);
    }
    fetchIndustries();
  }, []);

  async function createCompany(e: any) {
    const {values, setErrors, setSubmitting} = e;

    try{


    

    
      const data = {
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        industries: [values.industries],
        name: values.name,
        phone: values.phone,
        postalCode: values.postalCode,
        state: values.state,
        website: values.website,
        country: values.country,
      };
      const newCompany = await appApi.post("/companies", data);
      setSubmitting(false);
      if (claim) {
        return props.history.push(`/company/claim-details/${newCompany.data.id}`);
      } else {
        return props.history.push(`/profile/${newCompany.data.id}`);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      
    }
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="pt-4 pb-4">
          <Loader />
        </div>
      ) : (
        <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="page_custom_title">
                <h4>Add a Company</h4>
              </div>
            </div>

            <div className="col-md-7">
              <div className="box_Card">
                <Formik
                  initialValues={{
                    name: "",
                    industries: [],
                    address1: "",
                    address2: "",
                    state: "",
                    country: "",
                    city: "",
                    postalCode: "",
                    phone: "",
                    website: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={validation_Schema}
                  onSubmit={(values: any, {setErrors, setSubmitting}) => {
                    createCompany({values, setErrors, setSubmitting});
                  }}
                >
                  {({values, errors, touched, handleSubmit, setFieldValue, handleChange, isSubmitting}) => (
                    <form onSubmit={handleSubmit} className={classes.root}>
                      <TextField
                        error={errors.name && touched.name ? true : false}
                        label="Company Name"
                        variant="outlined"
                        name="name"
                        defaultValue={values.name}
                        helperText={errors.name && touched.name ? errors.name : null}
                        onChange={handleChange}
                      />
                      <FormControl
                        error={errors.industries && touched.industries ? true : false}
                        style={{width: "100%"}}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="name-native-error">Industry</InputLabel>
                        <Select
                          name="industries"
                          // multiple
                          MenuProps={{
                            disableScrollLock: true,
                          }}
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
                      <div style={{marginBottom: "35px"}}></div>
                      <TextField
                        error={errors.address1 && touched.address1 ? true : false}
                        label="Address 1"
                        multiline
                        variant="outlined"
                        rowsMax={4}
                        defaultValue={values.address1}
                        helperText={errors.address1 && touched.address1 ? errors.address1 : null}
                        name="address1"
                        onChange={handleChange}
                      />

                      <TextField
                        label="Address 2 (Optinal)"
                        multiline
                        variant="outlined"
                        rowsMax={4}
                        defaultValue={values.address2}
                        name="address2"
                        onChange={handleChange}
                      />

                      <TextField
                        error={errors.city && touched.city ? true : false}
                        label="City/Town"
                        variant="outlined"
                        defaultValue={values.city}
                        name="city"
                        helperText={errors.city && touched.city ? errors.city : null}
                        onChange={handleChange}
                      />

                      <TextField
                        error={errors.state && touched.state ? true : false}
                        label="State/Province/Region"
                        variant="outlined"
                        name="state"
                        defaultValue={values.state}
                        helperText={errors.state && touched.state ? errors.state : null}
                        onChange={handleChange}
                      />

                      <TextField
                        error={errors.postalCode && touched.postalCode ? true : false}
                        label="Zip Code/Postal Code"
                        variant="outlined"
                        name="postalCode"
                        defaultValue={values.postalCode}
                        helperText={errors.postalCode && touched.postalCode ? errors.postalCode : null}
                        onChange={handleChange}
                      />

                      <TextField
                        error={errors.country && touched.country ? true : false}
                        select
                        SelectProps={{MenuProps: {disableScrollLock: true}}}
                        label="Country"
                        variant="outlined"
                        name="country"
                        onChange={handleChange}
                        defaultValue={values.country}
                        value={values.country}
                        helperText={errors.country && touched.country ? errors.country : null}
                      >
                        {Object.keys(countries).map((country: any, index: number) => {
                          return (
                            <MenuItem key={index + "_c"} value={country}>
                              {(Object.values(countries) as any)[index]}
                            </MenuItem>
                          );
                        })}
                      </TextField>

                      <TextField
                        error={errors.phone && touched.phone ? true : false}
                        label="Headquarters Phone Number"
                        variant="outlined"
                        name="phone"
                        type="phone"
                        defaultValue={values.phone}
                        helperText={errors.phone && touched.phone ? errors.phone : null}
                        onChange={handleChange}
                      />

                      <TextField
                        error={errors.website && touched.website ? true : false}
                        label="Company website"
                        variant="outlined"
                        name="website"
                        type="website"
                        defaultValue={values.website}
                        helperText={errors.website && touched.website ? errors.website : null}
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={claim} onChange={() => sethandleClaim(!claim)} name="gilad" />}
                        label="I want to claim this company on behalf of the firm."
                        style={{width: "100%"}}
                      />
                      <button className="add_Company" type="submit" disabled={isSubmitting}>
                        Add Company
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CompanyDetails);
