/* eslint-disable */
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useNavigate} from 'react-router-dom';
import * as Yup from "yup";
import {Formik} from "formik";
import {ApplicationState} from "../../store";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import appApi from "../../services/appApi";
import {Loading} from "../Loader";
import "./index.scss";

const validation_Schema = Yup.object().shape({
  company: Yup.string().required("Plese select company."),
});

function SubscriptionPlan(props: any) {
  const [companiesClaimed, setCompaniesClaimed]: any = useState();
  const [canContinue, setCanContinue]: any = useState(false);

  const [companies, setCompanies]: any = useState([]);

  // @ts-ignore
  const [freeCompanies, setFreeCompanies] = useState();
  // @ts-ignore
  const [user, setUser]: any = useState();
  const [message2, setMessage2]: any = useState();
  const [action, setAction]: any = useState();
  const [isLoading, setIsLoading]: any = useState(true);
  // @ts-ignore
  const [link, setLink]: any = useState("");

  useEffect(() => {
    const userId = props.user.user.id;
    const getPlanInfo = async () => {
      let data = await appApi.get(`/promotion/${userId}`);
      setCompaniesClaimed(data.data.companiesClaimed);
      setUser(data.data.user);
      let freeCompanies = data.data.companiesClaimed.filter((company: any) => company.subscriptionLevelId === 1);
      setFreeCompanies(freeCompanies);
      let resCompanies = [];

      switch (props.match.params.planName) {
        case "free":
          resCompanies = data.data.companiesClaimed.filter((company: any) => {
            return company.subscriptionLevelId === 1;
          });

          setAction("free");
          if (resCompanies.length > 0 && data.data.companiesClaimed.length > 0) {
            let message = `Hello ${data.data.user.firstName}, You have already claimed Free subscription for the following :`;
            setMessage2(message);
            setCompanies(resCompanies);
            setCanContinue(true);
          }

          if (resCompanies.length === 0 && data.data.companiesClaimed.length > 0) {
            let newResCompanies = data.data.companiesClaimed.filter((company: any) => {
              return company.subscriptionLevelId != 1;
            });
            let message = `Hello ${data.data.user.firstName}, Below is a list of companies that you have already claimed and upgraded to Basic or Plus subscription. If you would like to add more companies, please search for your next company and claim it, or add it if the company doesn’t exist in our database. After claiming or adding your company, go to “My Account/Companies” and click on “Change Subscription” to subscribe to the BASIC or PLUS subscription.`;
            setMessage2(message);
            setCompanies(newResCompanies);
            setCanContinue(false);
          }

          if (resCompanies.length === 0 && data.data.companiesClaimed.length === 0) {
            setLink(`/company/details`);
            const message = `Hello ${data.data.user.firstName}, we noticed that you haven’t claimed a company yet. Before you can subscribe, please search for your company and claim it. If you cannot find your company, please add it. After claiming or adding your company, go to “My Account/Companies” and click on “Change Subscription” to subscribe to the BASIC or PLUS subscription`;
            setMessage2(message);
            setCanContinue(false);
          }
          break;

        case "basic":
          resCompanies = data.data.companiesClaimed.filter((company: any) => {
            return company.subscriptionLevelId === 1;
          });

          setCompanies(resCompanies);
          setAction("basic");

          if (resCompanies.length === 0 && data.data.companiesClaimed.length === 0) {
            let message = `Hello ${data.data.user.firstName}, we noticed that you haven’t claimed a company yet. Before you can subscribe, please search for your company and claim it. If you cannot find your company, please add it. After claiming or adding your company, go to “My Account/Companies” and click on “Change Subscription” to subscribe to the BASIC or PLUS subscription.`;
            setMessage2(message);
            setCanContinue(false);
          }
          if (resCompanies.length === 0 && data.data.companiesClaimed.length > 0) {
            let newResCompanies = data.data.companiesClaimed.filter((company: any) => {
              return company.subscriptionLevelId === 2 || company.subscriptionLevelId === 3;
            });
            
            setCompanies(newResCompanies);
            let message = `Hello ${data.data.user.firstName}, Below is a list of companies that you have already claimed and upgraded to either BASIC or Plus subscription. If you would like to add more companies, please search for your next company and claim it, or add it if the company doesn’t exist in our database. After claiming or adding your company, go to “My Account/Companies” and click on “Change Subscription” to subscribe to the BASIC or PLUS subscription.`;
            setMessage2(message);
            setCanContinue(false);
          }

          if (resCompanies.length > 0 && data.data.companiesClaimed.length > 0) {
            setLink(`/company/details`);
            let message = `Hello ${data.data.user.firstName}, below is a list of companies that you have claimed with “Free” subscription. Please select the companies you would like to upgrade to “Basic” and click “Checkout”.`;
            setMessage2(message);
            setCanContinue(true);
          }
          break;

        case "premium":
          resCompanies = data.data.companiesClaimed.filter((company: any) => {
            return company.subscriptionLevelId === 1 || company.subscriptionLevelId === 2;
          });
          setAction("premium");

          if (resCompanies.length === 0 && data.data.companiesClaimed.length > 0) {
            let newResCompanies = data.data.companiesClaimed.filter((company: any) => {
              return company.subscriptionLevelId === 3;
            });
            setCompanies(newResCompanies);
            let message = `Hello ${data.data.user.firstName}, Below is a list of companies that you have already claimed and upgraded to Plus subscription. If you would like to add more companies, please search for your next company and claim it, or add it if the company doesn’t exist in our database. After claiming or adding your company, go to “My Account/Companies” and click on “Change Subscription” to subscribe to the BASIC or PLUS subscription.`;
            setMessage2(message);
            setCanContinue(false);
          }

          if (resCompanies.length > 0 && data.data.companiesClaimed.length > 0) {
            let message = `Hello ${data.data.user.firstName},  below is a list of companies that you have claimed with “Free” or “Basic” subscription. Please select the companies you would like to upgrade to “PLUS” and click “Checkout”.`;
            setMessage2(message);
            setCompanies(resCompanies);
            setCanContinue(true);
          }

          if (resCompanies.length === 0 && data.data.companiesClaimed.length === 0) {
            let message = `Hello ${data.data.user.firstName}, we noticed that you haven’t claimed a company yet. Before you can subscribe, please search for your company and claim it. If you cannot find your company, please add it. After claiming or adding your company, go to “My Account/Companies” and click on “Change Subscription” to subscribe to the BASIC or PLUS subscription.`;
            setMessage2(message);
            setCanContinue(false);
          }

          break;

        default:
          break;
      }

      setIsLoading(false);
    };
    getPlanInfo();
    localStorage.removeItem("_companies");
  }, []);

  const submitCompany = (e: any) => {
    const {values} = e;
    let companyInfo: any = {};
    values.company.map((item: any) => {
      let companyName = companiesClaimed.find((single: any) => {
        if (single.companyId == item) {
          return true;
        }
      });
      companyInfo[item] = companyName.name;
    });
    localStorage.setItem("_companies", JSON.stringify(companyInfo));

    if (action == "plus" || values.type === "plus") {
      return props.history.push("/subscription2/checkout-companies/3");
    }

    if (action == "basic" || values.type === "basic") {
      return props.history.push("/subscription2/checkout-companies/2");
    }

    if (action == "premium" || values.type === "premium") {
      return props.history.push("/subscription2/checkout-companies/3");
    }
  };

  return (
    <div className="container pt-5">
      <div className="company_box">
        <h3 className="text-center">Hindsyght - Plans</h3>
        {isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <p className="text-center">{message2}</p>
            <Formik
              initialValues={{
                company: "",
                type: "",
              }}
              enableReinitialize={true}
              validationSchema={validation_Schema}
              onSubmit={(values: any, {setErrors, setSubmitting}) => {
                submitCompany({values, setErrors, setSubmitting});
              }}
            >
              {({values, errors, touched, handleSubmit, handleChange, setFieldValue, isSubmitting}) => (
                <form onSubmit={handleSubmit} className="form_main">
                  {canContinue ? (
                    companies.map((company: any, index: number) => {
                      return (
                        <React.Fragment key={index}>
                          <div>
                            <FormControlLabel
                              control={<Checkbox name="company" value={company.companyId} onChange={handleChange} />}
                              label={company.name}
                            />
                          </div>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <ul style={{listStylePosition: "inside"}}>
                      {companies.map((company: any, index: number) => {
                        return (
                          <React.Fragment key={index}>
                            <li>{company.name}</li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  )}

                  {errors.company && touched.company ? (
                    <p className="m-0">
                      <small className="text-danger">{errors.company}</small>
                    </p>
                  ) : null}

                  {action === "free" && canContinue ? (
                    <>
                      <button
                        type="submit"
                        name="type"
                        value="basic"
                        onClick={() => {
                          setFieldValue("type", "basic");
                        }}
                        className="mr-2 submit_btn"
                        disabled={isSubmitting}
                      >
                        Upgrade to Basic
                      </button>

                      <button
                        type="submit"
                        name="type"
                        onClick={() => {
                          setFieldValue("type", "plus");
                        }}
                        value="plus"
                        className="submit_btn"
                        disabled={isSubmitting}
                      >
                        Upgrade to Plus
                      </button>
                    </>
                  ) : (
                    canContinue && (
                      <button
                        type="submit"
                        name="type"
                        value={values.type}
                        className="submit_btn"
                        disabled={isSubmitting}
                      >
                        Checkout
                      </button>
                    )
                  )}

                  <button
                        type="submit"
                        name="type"
                        className="submit_btn"
                        style={{marginLeft:"10px"}}
                        onClick={useNavigate().goBack}
                      >
                        Cancel
                      </button>

                  {/* {} */}
                </form>
              )}
            </Formik>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(SubscriptionPlan);
