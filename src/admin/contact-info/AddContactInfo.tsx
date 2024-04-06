import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { ApplicationState } from '../../store';
import Loading from '../assets/images/Loading';
import { addContactInfo, updateContactInfo } from '../../store/ducks/contactInfo/actions';
import { useNavigate, useLocation } from "react-router-dom";

type Props = any;

const AddContactInfo = (props: Props) => {
  let history = useNavigate();

  return (
    <Formik
      initialValues={{
        contact_full_name: '',
        title: '',
        company_name: '',
        website: '',
        primary_email: '',
        linkedin: '',
        email_1: '',
        email_2: '',
        email_3: '',
        email_4: '',
        email_5: '',
        email_6: '',
        email_7: '',
        email_8: '',
        email_9: '',
        email_10: '',
        personal_email: '',
        personal_email_2: '',
        contact_phone1: '',
        contact_phone2: '',
        country: '',
        company_location: '',
        company_city: '',
        company_state: '',
        company_state_abbr: '',
        company_annual_revenue: '',
        company_industry: '',
        company_linkedin_profileUrl: '',
        company_revenue_range: '',
        company_staff_count: '',
        company_staff_countRange: '',
      }}
      validationSchema={Yup.object().shape({
        contact_full_name: Yup.string().required('Company name is required'),
        title: Yup.string().required('title is required'),
        company_name: Yup.string().required('company_name is required'),
        website: Yup.string().required('website is required'),
        primary_email: Yup.string().required('primary_email is required'),
        linkedin: Yup.string().required('linkedin is required'),
        email_1: Yup.string()
          .email()
          .required('email_1 is required'),
        email_2: Yup.string()
          .email()
          .required('email_2 is required'),
        email_3: Yup.string()
          .email()
          .required('email_3 is required'),
        email_4: Yup.string()
          .email()
          .required('email_4 is required'),
        email_5: Yup.string()
          .email()
          .required('email_5 is required'),
        email_6: Yup.string()
          .email()
          .required('email_6 is required'),
        email_7: Yup.string()
          .email()
          .required('email_7 is required'),
        email_8: Yup.string()
          .email()
          .required('email_8 is required'),
        email_9: Yup.string()
          .email()
          .required('email_9 is required'),
        email_10: Yup.string()
          .email()
          .required('email_10 is required'),
        personal_email: Yup.string()
          .email()
          .required('personal_email is required'),
        personal_email_2: Yup.string()
          .email()
          .required('personal_email_2 is required'),
        contact_phone1: Yup.number().required('contact_phone1 is required'),
        contact_phone2: Yup.number().required('contact_phone2 is required'),
        country: Yup.string().required('country is required'),
        company_location: Yup.string().required('company_location is required'),
        company_city: Yup.string().required('company_city is required'),
        company_state: Yup.string().required('company_state is required'),
        company_state_abbr: Yup.string().required('company_state_abbr is required'),
        company_annual_revenue: Yup.number().required('company_annual_revenue is required'),
        company_industry: Yup.string().required('company_industry is required'),
        company_linkedin_profileUrl: Yup.string().required('company_linkedin_profileUrl is required'),
        company_revenue_range: Yup.string().required('company_revenue_range is required'),
        company_staff_count: Yup.number().required('company_staff_count is required'),
        company_staff_countRange: Yup.string().required('company_staff_countRange is required'),
      })}
      onSubmit={(values, { resetForm }) => {
        props.addContactInfo({ data: values, history });
        resetForm();
      }}
    >
      {({
        values, errors, status, touched, handleSubmit, setFieldValue,
      }) => (
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
                      <h4 className="card-title">Add Contact</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="contact_full_name">Contact Full Name</label>
                            <Field
                              name="contact_full_name"
                              type="text"
                              placeholder="Contact FullName"
                              className={`form-control${errors.contact_full_name && touched.contact_full_name ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="contact_full_name" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <Field
                              name="title"
                              type="text"
                              placeholder="Title"
                              className={`form-control${errors.title && touched.title ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_name">Company Name</label>
                            <Field
                              name="company_name"
                              type="text"
                              placeholder="Company Name"
                              className={`form-control${errors.company_name && touched.company_name ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="company_name" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <Field
                              name="website"
                              type="text"
                              placeholder="Website"
                              className={`form-control${errors.website && touched.website ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="website" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="primary_email">Primary Email</label>
                            <Field
                              name="primary_email"
                              type="text"
                              placeholder="Primary Email"
                              className={`form-control${errors.primary_email && touched.primary_email ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="primary_email" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="linkedin">LinkedIn</label>
                            <Field
                              name="linkedin"
                              type="text"
                              placeholder="linkedin"
                              className={`form-control${errors.linkedin && touched.linkedin ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="linkedin" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email_1">Email 1</label>
                            <Field
                              name="email_1"
                              type="text"
                              placeholder="Email 1"
                              className={`form-control${errors.email_1 && touched.email_1 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_1" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email_2">Email 2</label>
                            <Field
                              name="email_2"
                              type="text"
                              placeholder="Email 2"
                              className={`form-control${errors.email_2 && touched.email_2 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_2" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email_3">Email 3</label>
                            <Field
                              name="email_3"
                              type="text"
                              placeholder="Email 3"
                              className={`form-control${errors.email_3 && touched.email_3 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_3" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email_4">Email 4</label>
                            <Field
                              name="email_4"
                              type="text"
                              placeholder="Email 4"
                              className={`form-control${errors.email_4 && touched.email_4 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_4" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="Email 5">Email 5</label>
                            <Field
                              name="email_5"
                              type="text"
                              placeholder="Company Name"
                              className={`form-control${errors.email_5 && touched.email_5 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_5" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email_6">Email 6</label>
                            <Field
                              name="email_6"
                              type="text"
                              placeholder="Email 6"
                              className={`form-control${errors.email_6 && touched.email_6 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_6" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email_7">Email 7</label>
                            <Field
                              name="email_7"
                              type="text"
                              placeholder="Email 7"
                              className={`form-control${errors.email_7 && touched.email_7 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_7" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email_8">Email 8</label>
                            <Field
                              name="email_8"
                              type="text"
                              placeholder="Email 8"
                              className={`form-control${errors.email_8 && touched.email_8 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_8" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email_9">Email 9</label>
                            <Field
                              name="email_9"
                              type="text"
                              placeholder="Email 9"
                              className={`form-control${errors.email_9 && touched.email_9 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_9" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email_10">Email 10</label>
                            <Field
                              name="email_10"
                              type="text"
                              placeholder="Email 10"
                              className={`form-control${errors.email_10 && touched.email_10 ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email_10" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="personal_email">Personal Email</label>
                            <Field
                              name="personal_email"
                              type="text"
                              placeholder="Personal Email"
                              className={`form-control${errors.personal_email && touched.personal_email ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="personal_email" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="personal_email_2">Personal Email 2</label>
                            <Field
                              name="personal_email_2"
                              type="text"
                              placeholder="Personal Email2"
                              className={`form-control${errors.personal_email_2 && touched.personal_email_2 ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="personal_email_2" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="contact_phone1">Contact Phone 1</label>
                            <Field
                              name="contact_phone1"
                              type="number"
                              placeholder="Contact Phone1"
                              className={`form-control${errors.contact_phone1 && touched.contact_phone1 ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="contact_phone1" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="contact_phone2">Contact Phone 2</label>
                            <Field
                              name="contact_phone2"
                              type="number"
                              placeholder="Contact Phone2"
                              className={`form-control${errors.contact_phone2 && touched.contact_phone2 ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="contact_phone2" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <Field
                              name="country"
                              type="text"
                              placeholder="Country"
                              className={`form-control${errors.country && touched.country ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name="country" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_location">Company Location</label>
                            <Field
                              name="company_location"
                              type="text"
                              placeholder="Location"
                              className={`form-control${errors.company_location && touched.company_location ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="company_location" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_city">Company City</label>
                            <Field
                              name="company_city"
                              type="text"
                              placeholder="Company City"
                              className={`form-control${errors.company_city && touched.company_city ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="company_city" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_state">Company State</label>
                            <Field
                              name="company_state"
                              type="text"
                              placeholder="Company State"
                              className={`form-control${errors.company_state && touched.company_state ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="company_state" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_state_abbr">Company State Abbr</label>
                            <Field
                              name="company_state_abbr"
                              type="text"
                              placeholder="Company State Address"
                              className={`form-control${errors.company_state_abbr && touched.company_state_abbr ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="company_state_abbr" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_annual_revenue">Company Annual Revenue</label>
                            <Field
                              name="company_annual_revenue"
                              type="number"
                              placeholder="Company Annual Revenue"
                              className={`form-control${errors.company_annual_revenue && touched.company_annual_revenue ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="company_annual_revenue" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_industry">Company Industry</label>
                            <Field
                              name="company_industry"
                              type="text"
                              placeholder="Company Industry"
                              className={`form-control${errors.company_industry && touched.company_industry ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="company_industry" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_linkedin_profileUrl">Company Linkedin ProfileUrl</label>
                            <Field
                              name="company_linkedin_profileUrl"
                              type="text"
                              placeholder="Company Linkedin Profile Url"
                              className={`form-control${errors.company_linkedin_profileUrl && touched.company_linkedin_profileUrl
                                ? ' is-invalid'
                                : ''
                                }`}
                            />
                            <ErrorMessage
                              name="company_linkedin_profileUrl"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_revenue_range">Company Revenue Range</label>
                            <Field
                              name="company_revenue_range"
                              type="text"
                              placeholder="Company Revenue Range"
                              className={`form-control${errors.company_revenue_range && touched.company_revenue_range ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="company_revenue_range" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_staff_count">Company Staff Count</label>
                            <Field
                              name="company_staff_count"
                              type="number"
                              placeholder="Company Staff Count"
                              className={`form-control${errors.company_staff_count && touched.company_staff_count ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage name="company_staff_count" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company_staff_countRange">Company Staff Count Range</label>
                            <Field
                              name="company_staff_countRange"
                              type="text"
                              placeholder="Company Staff CountRange"
                              className={`form-control${errors.company_staff_countRange && touched.company_staff_countRange ? ' is-invalid' : ''
                                }`}
                            />
                            <ErrorMessage
                              name="company_staff_countRange"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <button type="submit" className="btn bgMain text-white mr-1 waves-effect waves-light mb-4">
                            Add Contact
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
  addContactInfo: (body: any) => dispatch(addContactInfo(body)),
  updateContactInfo: (body: any) => dispatch(updateContactInfo(body)),
});

const mapStateToProps = (state: ApplicationState) => {
  // const data: any = state?.contactInfo?.getContactInfo?.status ? state.contactInfo?.getContactInfo?.status : 0;
  //console.log(state.contactInfo.getContactInfo.status);
  return {
    loading: state.contactInfo.loading,
    addContactInfoData: state.contactInfo.getContactInfo.status || 0,
    updateContactInfoData: state.contactInfo.updateContactInfo.status || 0,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContactInfo);
