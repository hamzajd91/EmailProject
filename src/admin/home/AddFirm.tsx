import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addCompany, getCountry, getIndustries, getProficiencies } from '../../store/ducks/addFirms/actions';
import { ApplicationState } from '../../store';
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { Form } from 'react-bootstrap';
import Loading from '../../admin/assets/images/Loading';

type Props = any;

const tempArrayCountry: { key: any; value: any; }[] = [];

const AddFirm = (props: Props) => {
  useEffect(() => {
    props.getCountry();
    props.getIndustries();
    props.getProficiencies();
  }, []);

  return (
    <Formik
      initialValues={{
        name: "",
        tagline: "",
        proficiencies: "",
        address1: "",
        industry: "",
        phone: "",
        city: "",
        country: "",
        state: "",
        postalCode: "",
        website: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Company name is required"),
        tagline: Yup.string().required("Company description is required"),
        proficiencies: Yup.string().required("Proficiencies is required"),
        address1: Yup.string().required("Company address is required"),
        industry: Yup.string().required("Company industry is required"),
        phone: Yup.string().required("Phone number is required"),
        city: Yup.string().required("Company city is required"),
        country: Yup.string().required("Company country is required"),
        state: Yup.string().required("Company state is required"),
        postalCode: Yup.string().required("Company postalCode is required"),
        website: Yup.string().required("Company website is required"),
      })}
      onSubmit={(values, {resetForm}) => {
        // alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 11));
        props.addCompany(values);
        resetForm();
      }}
    >
      {({values, errors, status, touched, handleSubmit, setFieldValue}) => (
        <div className="app-content content">
          {props.loading && <Loading />}
          <div className="content-overlay" />
          <div className="header-navbar-shadow" />
          <div className="content-wrapper">
            <Form className="form-horizontal" onSubmit={handleSubmit}>
              <div className="row justify-content-center">
                <div className="col-12">
                  {/* Description  */}
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Add a Company</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="name">Company Name</label>
                            <Field
                              name="name"
                              type="text"
                              placeholder="Company Name"
                              className={"form-control" + (errors.name && touched.name ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="tagline">Company Description</label>
                            <Field
                              name="tagline"
                              type="text"
                              placeholder="Company Description"
                              className={"form-control" + (errors.tagline && touched.tagline ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="tagline" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="proficiencies">Proficiencies</label>
                            <select
                              name="proficiencies"
                              onChange={option => setFieldValue("proficiencies", [option.target.value])}
                              className={
                                "select2 form-control" +
                                (errors.proficiencies && touched.proficiencies ? " is-invalid" : "")
                              }
                            >
                              {(props.getProficienciesData || []).map((item: any, index: any) => (
                                <>
                                  <option value={item.id}>{item.name}</option>
                                </>
                              ))}
                            </select>
                            <ErrorMessage name="proficiencies" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="address1">Address</label>
                            <Field
                              name="address1"
                              type="text"
                              placeholder="Address"
                              className={"form-control" + (errors.address1 && touched.address1 ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="address1" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="industry">Industry</label>
                            <select
                              name="industry"
                              data-placeholder="Select a state..."
                              onChange={option => setFieldValue("industry", [option.target.value])}
                              className={
                                "select2-icons form-control" +
                                (errors.industry && touched.industry ? " is-invalid" : "")
                              }
                              id="select1-icons"
                            >
                              {props.getIndustriesArray.map((item: any, index: any) => (
                                <>
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                </>
                              ))}
                            </select>
                            <ErrorMessage name="industry" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="phone">Phone number</label>
                            <Field
                              name="phone"
                              type="text"
                              placeholder="Phone number"
                              className={"form-control" + (errors.phone && touched.phone ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="city">City/Town</label>
                            <Field
                              name="city"
                              type="text"
                              placeholder="City/Town"
                              className={"form-control" + (errors.city && touched.city ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="city" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select
                              name="country"
                              data-placeholder="Select a state..."
                              onChange={option => setFieldValue("country", option.target.value)}
                              className={
                                "select2-icons form-control" + (errors.country && touched.country ? " is-invalid" : "")
                              }
                              id="select2-icons"
                            >
                              {tempArrayCountry.map((item, index) => (
                                <>
                                  <option key={index} value={item.key}>
                                    {item.value}
                                  </option>
                                </>
                              ))}
                            </select>

                            <ErrorMessage name="country" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="state">State/Province/Region</label>
                            <Field
                              name="state"
                              type="text"
                              placeholder="State"
                              className={"form-control" + (errors.state && touched.state ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="state" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="postalCode">Zip Code/Postal Code</label>
                            <Field
                              name="postalCode"
                              type="text"
                              placeholder="Zip Code/Postal Code"
                              className={
                                "form-control" + (errors.postalCode && touched.postalCode ? " is-invalid" : "")
                              }
                            />
                            <ErrorMessage name="postalCode" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="website">Company Website</label>
                            <Field
                              name="website"
                              type="text"
                              placeholder="Company Website"
                              className={"form-control" + (errors.website && touched.website ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="website" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-12">
                          <button type="submit" className="btn bgMain text-white mr-1 waves-effect waves-light">
                            Add Company
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Description  */}
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
  
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCountry: (params: any) => dispatch(getCountry()),
  getIndustries: (params: any) => dispatch(getIndustries()),
  getProficiencies: (params: any) => dispatch(getProficiencies()),
  addCompany: (params: any) => dispatch(addCompany(params)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.addFirms.getCountry;

  for (const [key, value] of Object.entries(data)) {
    tempArrayCountry.push({ key, value });
  }

  return {
    loading : state.addFirms.loading,
    getCountry: state.addFirms.getCountry,
    getIndustriesArray: state.addFirms.getIndustries,
    getProficienciesData: state.addFirms.getProficiencies,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFirm);
