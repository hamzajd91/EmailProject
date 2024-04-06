import React, { useEffect } from 'react';
import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import {Form} from "react-bootstrap";
import Select from "react-select";
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';
import { addAdvertisements, getCompanies } from '../../store/ducks/advertisements/actions';
import { el } from 'date-fns/locale';

type Props = any; let dummyWorkingArray: {value: any; label: any}[] = [];

const AddAdvertisement = (props: Props) => {
  const history = useNavigate();
  useEffect(() => {
    // props.getCompanies("");
  }, []);

  function getBase64(file : any, cb : any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }

  return (
    <Formik // validation
      initialValues={{
        company: "",
        amount: "",
        dateFrom: "",
        dateTo: "",
        bannerImage: '',
      }}
      validationSchema={Yup.object().shape({
        company: Yup.string().required("Company name is required"),
        amount: Yup.string().required("Amount is required"),
        dateFrom: Yup.string().required("Start Date is required"),
        dateTo: Yup.string().required("End Date is required"),
        bannerImage: Yup.mixed()
          .nullable()
          .required("Banner image is required"),
      })}
      onSubmit={values => {
        console.log("-----result------", values);
        props.addAdvertisements(values,history);
      }}
    >
      {({values, errors, status, touched, handleSubmit, setFieldValue}) => (
        <div className="app-content content">
          {props.getCompaniesData.map((item: any, index: any) => {
            dummyWorkingArray.push({value: item.id, label: item.text});
          })}
          <div className="content-overlay" />
          <div className="header-navbar-shadow" />
          <div className="content-wrapper">
            {/* <div className="content-body"> */}
            {/* Description  */}
            <Form className="form-horizontal" onSubmit={handleSubmit}>
              <div className="row justify-content-center">
                <div className="col-12">
                  {/* Description  */}
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Add Advertisement</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="company">Select Company</label>
                            <Select
                              isSearchable
                              name="company"
                              placeholder='search company'
                              options={dummyWorkingArray}
                              onChange={(e: any) => setFieldValue("company",e.value)}
                              onInputChange={(e: any) => {
                                if (e.length > 2) {
                                  dummyWorkingArray = [];
                                  props.getCompanies(e);
                                } else {
                                  dummyWorkingArray = [];
                                  props.getCompanies("");
                                }
                              }}
                              className={"select2" + (errors.company && touched.company ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="company" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <Field
                              name="amount"
                              type="text"
                              placeholder="Amount"
                              className={"form-control" + (errors.amount && touched.amount ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="amount" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="dateFrom">Start Date</label>
                            <Field
                              name="dateFrom"
                              type="date"
                              placeholder="Start Date"
                              className={"form-control" + (errors.dateFrom && touched.dateFrom ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="dateFrom" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="dateTo">End Date</label>
                            <Field
                              name="dateTo"
                              type="date"
                              placeholder="End Date"
                              className={"form-control" + (errors.dateTo && touched.dateTo ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="dateTo" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="bannerImage">Banner Image</label>

                            <input
                              type="file"
                              name="bannerImage"
                              onChange={(event: any) => {
                                setFieldValue("bannerImage", event.currentTarget.files[0]);
                              }}
                              className={
                                "form-control" + (errors.bannerImage && touched.bannerImage ? " is-invalid" : "")
                              }
                            />
                            <ErrorMessage name="bannerImage" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-12">
                          <button type="submit" className="btn bgMain text-white mr-1 waves-effect waves-light">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Description  */}
                </div>
              </div>
            </Form>
            {/* Description  */}
          </div>
          {/* </div> */}
        </div>
      )}
    </Formik>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCompanies: (params: any) => dispatch(getCompanies(params)),
  addAdvertisements: (params: any, history : any) => dispatch(addAdvertisements(params,history)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.advertisements.addAdvertisements;  
  console.log("---------data----------",data);
  
  return {
    loading: state.advertisements.loading,
    getCompaniesData: state.advertisements.getCompanies,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdvertisement);
