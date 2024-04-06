import React, { useEffect } from "react";
import checkImage from "../../images/services/check.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./index.scss";
import { Modal, Button } from 'react-bootstrap';
import countries from "../../data/countries.json";
import InputMask from "react-input-mask";

import { Loader } from "../Loader";
import { connect } from "react-redux";
import { ApplicationState } from './../../store/index';
import { Dispatch } from 'redux';

import { addbranch, setbranch } from '../../store/ducks/addBranch/actions';
import { Formik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';

//AddBranch
function AddBranch(props: any) {
  const history = useNavigate();
  const [show, setShow] = React.useState(false)
  const { state } = useLocation();

  const [isSubmitted, setSubmitted] = React.useState(false)

  const [name, setName] = React.useState("")
  const [id, setId] = React.useState("")

  useEffect(() => {
    const { id, name }: any = state
    setName(name)
    setId(id)
  }, []);

  useEffect(() => {
    if (props.addBranch.loading === false && props.addBranch.isSuccess === true) {
      props.postBranch()
      history.push(`/profile/${name}/${id}`)
      setSubmitted(false)
    } else if (props.addBranch.loading === false && props.addBranch.isError === true) {
      props.postBranch()
      setSubmitted(false)
    }
  }, [props.addBranch]);


  const AddBranchSchema = Yup.object().shape({
    address1: Yup.string().required("Address is required."),
    address2: Yup.string(),
    state: Yup.string().required("State is required."),
    country: Yup.string().required("Country is required."),
    city: Yup.string().required("City is required."),
    postalCode: Yup.string().required("PostalCode is required."),
    phone: Yup.string().required("Phone is required."),
    repName: Yup.string(),
    repEmail: Yup.string(),
  });


  return (
    <div className="container pt-4 editCompanyForm">
      <Formik
        initialValues={{
          address1: "",
          address2: "",
          state: "",
          country: countries.USA,
          city: "",
          postalCode: "",
          phone: "",
          repName: "",
          repEmail: "",
        }}
        enableReinitialize={true}
        validationSchema={AddBranchSchema}
        onSubmit={(values: any, { setErrors, setSubmitting }) => {
          const data = {
            ['address1']: values.address1,
            ['address2']: values.address2,
            ['state']: values.state,
            ['country']: values.country,
            ['city']: values.city,
            ['postalCode']: values.postalCode,
            ['phone']: values.phone,
            ['repName']: values.repName,
            ['repEmail']: values.repEmail,
            ['parentId']: id,
            ['name']: name,
          }
          props.postAddBranch(data);
          setSubmitted(true)
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange, isSubmitting }) => (

          <form
            onSubmit={handleSubmit}
            className="card card-body px-5"
          >

            <div className="w-auto">
              <h3>Add branch</h3>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group field">
                    <label htmlFor="address1">Address 2</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="address1"
                      className="form-control"
                      id="address1"
                      value={values.address1}
                    />
                    {errors.address1 && touched.address1 ? (
                      <div className="invalid require-address1">
                        Enter address
                      </div>
                    ) : ''}
                  </div>
                  <div className="form-group field">
                    <label htmlFor="address2">Headquarters Address 2 (Optional)</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="address2"
                      className="form-control"
                      id="address2"
                      value={values.address2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      onChange={handleChange}
                      defaultValue={countries.USA}
                      value={values.country || ""}
                      className="country form-control"
                      name="country"
                    >
                      {Object.entries(countries).map(([key, value]) => (
                        <option value={key}>{value}</option>
                      ))}
                    </select>
                    {errors.country && touched.country ? (
                      <div className="invalid require-address1">
                        Enter country
                      </div>
                    ) : ''}
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="state">State/Province/Region</label>
                        <input
                          type="text"
                          onChange={handleChange}
                          name="state"
                          className="form-control"
                          id="state"
                          value={values.state}
                        />
                        {errors.state && touched.state ? (
                          <div className="invalid require-address1">
                            Enter state
                          </div>
                        ) : ''}

                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group field">
                        <label htmlFor="city">City/Town</label>
                        <input
                          type="text"
                          onChange={handleChange}
                          name="city"
                          className="form-control"
                          id="city"
                          value={values.city}
                        />
                        {errors.city && touched.city ? (
                          <div className="invalid require-address1">
                            Enter city
                          </div>
                        ) : ''}
                      </div>

                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="postalCode">Zip Code/Postal Code</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="postalCode"
                      className="form-control"
                      id="postalCode"
                      value={values.postalCode}
                    />
                    {errors.postalCode && touched.postalCode ? (
                      <div className="invalid require-address1">
                        Enter postalCode
                      </div>
                    ) : ''}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Headquarters Phone Number</label>
                    <InputMask
                      type="text"
                      name="phone"
                      className="form-control"
                      minLength={10}
                      mask="(999) 999-9999"
                      onChange={handleChange}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone ? (
                      <div className="invalid require-phone">
                        Enter Phone no
                      </div>
                    ) : ''}
                  </div>
                  <div className="form-group">
                    <label htmlFor="repName">Location Contact Representative Name (Optional)</label>
                    <input
                      type="text"
                      name="repName"
                      onChange={handleChange}
                      className="form-control"
                      id="repName"
                      value={values.repName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="repEmail">Contact Representative Email (Optional)</label>
                    <input
                      type="text"
                      name="repEmail"
                      onChange={handleChange}
                      className="form-control"
                      id="repEmail"
                      value={values.repEmail}
                    />
                  </div>

                  <div className="section-3 text-right">
                    <button
                      title="Save & Finish"
                      type="submit"
                      id="company_submit_btn"
                      className={`btn submit-btn ${isSubmitted ? "disabled" : ""} `}
                    >
                      {isSubmitted && (
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}{" "}
                      Save &amp; Finish
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </form>
        )}

      </Formik>


    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    addBranch: state.addBranch
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  postBranch: () => dispatch(setbranch()),
  postAddBranch: (params: any) => dispatch(addbranch(params)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AddBranch);






