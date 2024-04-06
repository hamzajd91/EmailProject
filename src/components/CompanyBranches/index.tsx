
import React, { Component } from "react";
import "./index.scss";
import { Loader } from "../Loader";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import appApi from "../../services/appApi";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Maps from "../GoogleMaps/Maps";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
const countries: any = require("../../data/countries.json");

const validation_Schema = Yup.object().shape({
  address1: Yup.string().required("Address is required."),
  city: Yup.string().required("Company city is required."),
  state: Yup.string()
    .required("Company state is required.")
    .min(2, "State must be exactly 2 characters.")
    .max(2, "State must be exactly 2 characters."),
  postalCode: Yup.string().required("Company Zipcode is required."),
  phone: Yup.string().required("Company phone number is required."),
  country: Yup.string().required("Company country is required."),
});

class CompanyBranches extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      company: {},
      form_data: {
        address1: "",
        address2: "",
        state: "",
        country: "",
        city: "",
        postalCode: "",
        phone: "",
        repName: "",
        repEmail: "",
      },
      company_modal: false,
      isLoading: true,
      edit_location_modal: false,
      coordinates: "",
      locationInfo: {},
      deleteInfo: {},
      deleteModal: false,
      isDeleteting: false,
    };
  }

  async componentDidMount() {
    const { companyId } = this.props.match.params;
    try {
      const response = await appApi.get(`company/branches/${companyId}`);

      if (response.data.redirect) {
        return this.props.history.push(response.data.redirect);
      }

      this.setState({
        company: {
          ...response.data.company,
          branches: response.data.company.branches || [],
        },
        coordinates: response.data.company.coordinates,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleCompanyModal = () => {
    this.setState({
      company_modal: !this.state.company_modal,
    });
  };

  handleEditLocationModal = () => {
    this.setState({
      edit_location_modal: !this.state.edit_location_modal,
    });
  };

  addLocation = async (data: any) => {
    const { values, setErrors, setSubmitting, resetForm } = data;
    const addResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        `${values.address1 + " " + values.city}`
      )}&key=AIzaSyB5jCGq0kSpxlaqAeMIJeFczLTKLfid1f4`
    );
    if (addResponse.data.results.length === 0) {
      setErrors({ address1: "Address or City is not found in the selected country." });
      return setSubmitting(false);
    }

    const { companyId } = this.props.match.params;

    try {
      const data = {
        address1: values.address1,
        address2: values.address2,
        state: values.state,
        country: values.country,
        city: values.city,
        postalCode: values.postalCode,
        phone: values.phone,
        repName: values.repName,
        repEmail: values.repEmail,
        parentId: companyId,
        name: this.state.company.name,
      };
      const response = await appApi.post("/company", data);

      this.setState({
        company: {
          ...this.state.company,
          branches: this.state.company.branches.concat(response.data),
        },
        company_modal: false,
      });
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setSubmitting(false);
    }
  };

  editLocation = async (data: any) => {
    const { values, setErrors, setSubmitting, resetForm } = data;

    const addResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address="${encodeURIComponent(
        `${values.address1 + " " + values.city}`
      )}"&key=AIzaSyB5jCGq0kSpxlaqAeMIJeFczLTKLfid1f4`
    );
    if (addResponse.data.results.length === 0) {
      setErrors({ address1: "Address or City is not found in the selected country." });
      return setSubmitting(false);
    }
    try {
      const response = await appApi.put(`/company/${values.id}`, values);
      const index = this.state.company.branches.findIndex((c: any) => c.id == response.data.id);
      this.state.company.branches[index] = response.data;
      this.setState({
        edit_location_modal: false,
      });
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setSubmitting(false);
    }
  };

  companyMap = (branch: any) => {
    this.setState({
      coordinates: branch.coordinates,
    });
  };

  editCompanyLocation = (branch: any) => {
    this.setState({
      locationInfo: branch,
      edit_location_modal: !this.state.edit_location_modal,
    });
  };

  deleteCompanyLocationModal = (branch: any) => {
    this.setState({
      deleteInfo: branch,
      deleteModal: true,
    });
  };

  handleDeleteModal = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  };

  deleteCompanyLocation = async () => {
    const { deleteInfo, company } = this.state;
    this.setState({
      isDeleteting: true,
    });
    try {
      await appApi.delete(`/company/${deleteInfo.id}/location`);
      const branches = company.branches.filter((branch: any) => {
        return branch.id != deleteInfo.id;
      });
      this.setState({
        deleteInfo: {},
        company: {
          ...this.state.company,
          branches: [...branches],
        },
        isDeleteting: false,
        deleteModal: false,
      });
    } catch (error) {
      this.setState({
        deleteInfo: {},
        isDeleteting: false,
        deleteModal: false,
      });
    }
  };

  render() {
    const {
      company_modal,
      deleteModal,
      locationInfo,
      isDeleteting,
      form_data,
      edit_location_modal,
      isLoading,
      company,
    } = this.state;
    const { companyId } = this.props.match.params;
    return (
      <>
        <div className="pt-5 pb-5">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="container">
              <Link to={`/profile/${companyId}`} className="btn backbtn btn-primary"><KeyboardBackspaceIcon /> Back to Company Profile</Link>
              <div className="branch_card">
                <h4 className="mb-3">Edit Locations</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div style={{ maxHeight: "350px", overflow: "auto" }}>
                      <Paper variant="outlined" square className="mb-2">
                        <div className="p-3 location_block" onClick={() => this.companyMap(company)}>
                          <Chip size="small" label="Headquarters" />
                          <p className="m-0 mt-2">
                            {company.address1}
                            {company.address2 && (
                              <>
                                <br />
                                {company.address2}
                              </>
                            )}
                          </p>
                          <p className="m-0">
                            {company.city}, {company.state}, {company.postalCode}, {company.country}
                          </p>
                          <p className="m-0">{company.phone}</p>
                          {company.repName || company.repName ? (
                            <p className="m-0">
                              Contact: {company.repName} {company.repEmail}
                            </p>
                          ) : null}
                        </div>
                      </Paper>
                      {company.branches && company.branches.length > 0 && company.branches.map((branch: any, index: number) => {
                        return (
                          <Paper variant="outlined" square key={index} className="mb-2 location_block_main p-3">
                            <div className="action_btns">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editCompanyLocation(branch)}
                              >
                                <EditIcon />
                              </button>
                              <br />
                              <button
                                type="button"
                                className="btn btn-danger btn-sm mt-2"
                                onClick={() => this.deleteCompanyLocationModal(branch)}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                            <div className="location_block" onClick={() => this.companyMap(branch)}>
                              <p className="m-0">
                                {branch.address1}
                                {branch.address2 && (
                                  <>
                                    <br />
                                    {branch.address2}
                                  </>
                                )}
                              </p>
                              <p className="m-0">
                                {branch.city}, {branch.state}, {branch.postalCode}, {branch.country}
                              </p>
                              <p className="m-0">{branch.phone}</p>
                              {branch.repName || branch.repName ? (
                                <p className="m-0">
                                  Contact: {branch.repName} {branch.repEmail}
                                </p>
                              ) : null}
                            </div>
                          </Paper>
                        );
                      })}
                    </div>

                    <button onClick={() => this.handleCompanyModal()} className="btn btn-block btn-primary mt-3">
                      Add Location
                    </button>
                  </div>
                  <div className="col-md-6">
                    <div className="map_container">
                      <Maps branches={this.state.company.branches} coordinates={this.state.coordinates} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Dialog open={deleteModal} fullWidth={true} maxWidth={`sm`} onClose={this.handleDeleteModal} scroll={"paper"}>
          <DialogTitle>Are you sure want to delete location ?</DialogTitle>
          <DialogContent dividers>
            <button
              className="btn btn-danger mr-2"
              onClick={() => this.deleteCompanyLocation()}
              disabled={isDeleteting}
            >
              Delete
            </button>
            <button className="btn btn-primary" disabled={isDeleteting}>
              Cancel
            </button>
          </DialogContent>
        </Dialog>

        <Dialog
          open={company_modal}
          fullWidth={true}
          maxWidth={`sm`}
          onClose={this.handleCompanyModal}
          scroll={"paper"}
        >
          <DialogTitle>Add Location</DialogTitle>
          <DialogContent dividers>
            <div className="w-100">
              <Formik
                initialValues={form_data}
                enableReinitialize={true}
                validationSchema={validation_Schema}
                onSubmit={(values: any, { setErrors, setSubmitting, resetForm }) => {
                  this.addLocation({ values, setErrors, setSubmitting, resetForm });
                }}
              >
                {({ values, errors, touched, handleSubmit, handleChange, isSubmitting }) => {
                  return (
                    <form className="custom_email_form" onSubmit={handleSubmit}>
                      <div className="email_field">
                        <TextField
                          error={errors.address1 && touched.address1 ? true : false}
                          label="Address 1"
                          multiline
                          className="w-100 mb-3"
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
                          className="w-100 mb-3"
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
                          className="w-100 mb-3"
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
                          className="w-100 mb-3"
                          defaultValue={values.state}
                          helperText={errors.state && touched.state ? errors.state : null}
                          onChange={handleChange}
                        />

                        <TextField
                          error={errors.postalCode && touched.postalCode ? true : false}
                          label="Zip Code/Postal Code"
                          variant="outlined"
                          className="w-100 mb-3"
                          name="postalCode"
                          defaultValue={values.postalCode}
                          helperText={errors.postalCode && touched.postalCode ? errors.postalCode : null}
                          onChange={handleChange}
                        />

                        <TextField
                          error={errors.country && touched.country ? true : false}
                          select
                          label="Country"
                          variant="outlined"
                          className="w-100 mb-3"
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
                          label="Location Phone Number"
                          variant="outlined"
                          className="w-100 mb-3"
                          name="phone"
                          type="phone"
                          defaultValue={values.phone}
                          helperText={errors.phone && touched.phone ? errors.phone : null}
                          onChange={handleChange}
                        />

                        <TextField
                          error={errors.repName && touched.repName ? true : false}
                          label="Location Contact Representative Name (Optional)"
                          variant="outlined"
                          className="w-100 mb-3"
                          name="repName"
                          type="repName"
                          defaultValue={values.repName}
                          helperText={errors.repName && touched.repName ? errors.repName : null}
                          onChange={handleChange}
                        />

                        <TextField
                          error={errors.repEmail && touched.repEmail ? true : false}
                          label="Contact Representative Email (Optional)"
                          variant="outlined"
                          className="w-100 mb-3"
                          name="repEmail"
                          type="repEmail"
                          defaultValue={values.repEmail}
                          helperText={errors.repEmail && touched.repEmail ? errors.repEmail : null}
                          onChange={handleChange}
                        />
                        {isSubmitting ? (
                          <button type="button" disabled className="btn btn-block btn-primary">
                            Please wait...
                          </button>
                        ) : (
                          <button type="submit" className="btn btn-block btn-primary">
                            Add Location
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
          open={edit_location_modal}
          fullWidth={true}
          maxWidth={`sm`}
          onClose={this.handleEditLocationModal}
          scroll={"paper"}
        >
          <DialogTitle>Edit Location</DialogTitle>
          <DialogContent dividers>
            <div className="w-100">
              <Formik
                initialValues={locationInfo}
                enableReinitialize={true}
                validationSchema={validation_Schema}
                onSubmit={(values: any, { setErrors, setSubmitting, resetForm }) => {
                  this.editLocation({ values, setErrors, setSubmitting, resetForm });
                }}
              >
                {({ values, errors, touched, handleSubmit, handleChange, isSubmitting }) => {
                  return (
                    <form className="custom_email_form" onSubmit={handleSubmit}>
                      <div className="email_field">
                        <TextField
                          error={errors.address1 && touched.address1 ? true : false}
                          label="Address 1"
                          multiline
                          className="w-100 mb-3"
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
                          className="w-100 mb-3"
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
                          className="w-100 mb-3"
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
                          className="w-100 mb-3"
                          defaultValue={values.state}
                          helperText={errors.state && touched.state ? errors.state : null}
                          onChange={handleChange}
                        />

                        <TextField
                          error={errors.postalCode && touched.postalCode ? true : false}
                          label="Zip Code/Postal Code"
                          variant="outlined"
                          className="w-100 mb-3"
                          name="postalCode"
                          defaultValue={values.postalCode}
                          helperText={errors.postalCode && touched.postalCode ? errors.postalCode : null}
                          onChange={handleChange}
                        />

                        <TextField
                          error={errors.country && touched.country ? true : false}
                          select
                          label="Country"
                          variant="outlined"
                          className="w-100 mb-3"
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
                          label="Location Phone Number"
                          variant="outlined"
                          className="w-100 mb-3"
                          name="phone"
                          type="phone"
                          defaultValue={values.phone}
                          helperText={errors.phone && touched.phone ? errors.phone : null}
                          onChange={handleChange}
                        />

                        <TextField
                          error={errors.repName && touched.repName ? true : false}
                          label="Location Contact Representative Name (Optional)"
                          variant="outlined"
                          className="w-100 mb-3"
                          name="repName"
                          type="repName"
                          defaultValue={values.repName}
                          helperText={errors.repName && touched.repName ? errors.repName : null}
                          onChange={handleChange}
                        />

                        <TextField
                          error={errors.repEmail && touched.repEmail ? true : false}
                          label="Contact Representative Email (Optional)"
                          variant="outlined"
                          className="w-100 mb-3"
                          name="repEmail"
                          type="repEmail"
                          defaultValue={values.repEmail}
                          helperText={errors.repEmail && touched.repEmail ? errors.repEmail : null}
                          onChange={handleChange}
                        />
                        {isSubmitting ? (
                          <button type="button" disabled className="btn btn-block btn-primary">
                            Please wait...
                          </button>
                        ) : (
                          <button type="submit" className="btn btn-block btn-primary">
                            Update Location
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
      </>
    );
  }
}

export default CompanyBranches;
