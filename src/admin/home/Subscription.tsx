import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Loading from '../../admin/assets/images/Loading';
import { ApplicationState } from "../../store";
import { changeAnalytics, changeSubscription, getSubscription } from "../../store/ducks/advertisements/actions";

type Props = any;

const Subscription = (props: Props) => {
  const data = (props.getSubscriptionData[0] || {})
  
  useEffect(() => {
    props.getSubscription();
  }, []);

  const changePeriod = (name : any, checked : boolean) => {
    const obj = {plan: name, status: checked};
    props.changeSubscription(obj);
  };
  const changePeriodAnalytic = (name: any, checked: boolean) => {
    const obj = {plan: name, status: checked};
    props.changeAnalytics(obj);
  };
  
    return (
      <>
        <div className="app-content content">
          {props.loading && <Loading />}
          <div className="content-overlay" />
          <div className="header-navbar-shadow" />
          <div className="content-wrapper">
            <div className="content-body">
              {/* Description */}
              <div className="row">
                <div className="col-6">
                  <div className="card">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-striped mb-0">
                            <thead className="thead-dark">
                              <tr>
                                <th>Display in alternatives if plan is expired.</th>
                                <th>Subscription</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(props.getSubscriptionData || []).map((item: any, index: any) => (
                                <tr key={index}>
                                  <td>
                                    <label className="switch">
                                      <input
                                        type="checkbox"
                                        checked={item.display_on_alternatives}
                                        onChange={() => changePeriod(index + 1, !item.display_on_alternatives)}
                                      />
                                      <span className="slider round"></span>
                                    </label>
                                  </td>
                                  <td>{item.name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-striped mb-0">
                            <thead className="thead-dark">
                              <tr>
                                <th>Allow user to show analytics reports in Dashboard.</th>
                                <th>Subscription</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(props.getSubscriptionData || []).map((item: any, index: any) => (
                                <tr key={index}>
                                  <td>
                                    <label className="switch">
                                      <input
                                        type="checkbox"
                                        checked={item.analytics_reports}
                                        onChange={() => changePeriodAnalytic(index + 1, !item.analytics_reports)}
                                      />
                                      <span className="slider round"></span>
                                    </label>
                                  </td>
                                  <td>{item.name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Description  */}
            </div>
          </div>
        </div>
      </>
    );
};


const mapDispatchToProps = (dispatch: Dispatch) => ({
  getSubscription: (params: any) => dispatch(getSubscription()),
  changeSubscription: (params: any) => dispatch(changeSubscription(params)),
  changeAnalytics: (params: any) => dispatch(changeAnalytics(params)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.advertisements.getSubscription;  
  return {
    loading: state.advertisements.loading,
    getSubscriptionData: state.advertisements.getSubscription,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
