import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { getTractionReport,getTractionByDateReport } from '../../store/ducks/tractionReport/actions';
import Loading from '../../admin/assets/images/Loading';

type Props = any;

const TractionReport = (props: Props) => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    props.getTractionByDateReport();
  }, []);

  const clickOnSearch = (e :any) => {
    e.preventDefault();
    if(startDate !== "" && endDate !== "") {
      props.getTractionReport(startDate + "/" + endDate);
    }
  } 

  useEffect(() => {
    setStartDate(props.getTractionReportData.start)
    setEndDate(props.getTractionReportData.end)
  }, [props.getTractionReportData]);

  return (
    <>
      {props.loading && <Loading />}
      {/* BEGIN: Content */}
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper">
          <div className="content-body">
            {/* Description  */}
            <section id="description" className="card">
              <div className="card-header">
                <h4 className="card-title">Hindsyght Traction Report</h4>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped w-100 table-min-width">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Users</th>
                          <th scope="col">New Users</th>
                          <th scope="col">Bounce %</th>
                          <th scope="col">Signups</th>
                          <th scope="col">Reviews</th>
                          <th scope="col">Claims</th>
                          <th scope="col">Free</th>
                          <th scope="col">Basic</th>
                          <th scope="col">Plus</th>
                          <th scope="col">Companies</th>
                        </tr>
                      </thead>

                      {props.getTractionReportByDate.week !== undefined ? (
                         <tbody>
                         <tr>
                           <th scope="row">
                             Current week <small> ( {props.getTractionReportByDate.week.start}</small> -<small>{  props.getTractionReportByDate.week.end } )</small>
                           </th>
                           <td>{ props.getTractionReportByDate.week.users}</td>
                           <td>{props.getTractionReportByDate.week.gaNewUsers}</td>
                           <td>{props.getTractionReportByDate.week.gaBounceRate}%</td>
                           <td>{props.getTractionReportByDate.week.gaUsers}</td>
                           <td>{props.getTractionReportByDate.week.reviews}</td>
                           <td>{props.getTractionReportByDate.week.claims}</td>
                           <td>{props.getTractionReportByDate.week.free}</td>
                           <td>{props.getTractionReportByDate.week.basic}</td>
                           <td>{props.getTractionReportByDate.week.plus}</td>
                           <td>{props.getTractionReportByDate.week.companies}</td>
                         </tr>
                         <tr>
                           <th scope="row">
                             Current Week - 1<small> ( {props.getTractionReportByDate.week1.start}</small> -<small>{props.getTractionReportByDate.week1.end} )</small>
                           </th>
                           <td>{props.getTractionReportByDate.week1.users}</td>
                           <td>{props.getTractionReportByDate.week1.gaNewUsers}</td>
                           <td>{props.getTractionReportByDate.week1.gaBounceRate}%</td>
                           <td>{props.getTractionReportByDate.week1.gaUsers}</td>
                           <td>{props.getTractionReportByDate.week1.reviews}</td>
                           <td>{props.getTractionReportByDate.week1.claims}</td>
                           <td>{props.getTractionReportByDate.week1.free}</td>
                           <td>{props.getTractionReportByDate.week1.basic}</td>
                           <td>{props.getTractionReportByDate.week1.plus}</td>
                           <td>{props.getTractionReportByDate.week1.companies}</td>
                         </tr>
                         <tr>
                           <th scope="row">
                             Current Week - 2<small> ({props.getTractionReportByDate.week2.start}</small> -<small>{props.getTractionReportByDate.week2.end} )</small>
                           </th>
                           <td>{props.getTractionReportByDate.week2.users}</td>
                           <td>{props.getTractionReportByDate.week2.gaNewUsers}</td>
                           <td>{props.getTractionReportByDate.week2.gaBounceRate}%</td>
                           <td>{props.getTractionReportByDate.week2.gaUsers}</td>
                           <td>{props.getTractionReportByDate.week2.reviews}</td>
                           <td>{props.getTractionReportByDate.week2.claims}</td>
                           <td>{props.getTractionReportByDate.week2.free}</td>
                           <td>{props.getTractionReportByDate.week2.basic}</td>
                           <td>{props.getTractionReportByDate.week2.plus}</td>
                           <td>{props.getTractionReportByDate.week2.companies}</td>
                         </tr>
                         <tr>
                           <th scope="row">
                             Current Week - 3<small> ({props.getTractionReportByDate.week3.start}</small> -<small>{props.getTractionReportByDate.week3.end} )</small>
                           </th>
                           <td>{props.getTractionReportByDate.week3.users}</td>
                           <td>{props.getTractionReportByDate.week3.gaNewUsers}</td>
                           <td>{props.getTractionReportByDate.week3.gaBounceRate}%</td>
                           <td>{props.getTractionReportByDate.week3.gaUsers}</td>
                           <td>{props.getTractionReportByDate.week3.reviews}</td>
                           <td>{props.getTractionReportByDate.week3.claims}</td>
                           <td>{props.getTractionReportByDate.week3.free}</td>
                           <td>{props.getTractionReportByDate.week3.basic}</td>
                           <td>{props.getTractionReportByDate.week3.plus}</td>
                           <td>{props.getTractionReportByDate.week3.companies}</td>
                         </tr>
                       </tbody>
                      ):''}
                     
                    </table>
                  </div>

                  {/* <hr> */}

                  <div className="my-2">
                    <h4 className="text-bold-500 mb-1">Custom date ranges</h4>
                    <form onSubmit={clickOnSearch}>
                      <div className="d-flex align-items-center justify-content-end mb-2 mr-2">
                        <div className="d-flex align-items-center mr-3">
                          <p className="mb-0 mr-2">Start date: </p>
                          <div>
                            <input
                              type="date"
                              className="form-control pickadate"
                              onChange={e => {
                                setStartDate(e.target.value);
                              }}
                              value={ 
                                startDate
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center mr-3">
                          <p className="mb-0 mr-2">End date: </p>
                          <div>
                            <input
                              type="date"
                              className="form-control pickadate"
                              onChange={e => {
                                setEndDate(e.target.value);
                              }}
                              value={ 
                                endDate
                              }
                              required
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn bgMain waves-effect waves-light text-white">
                          Search
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-striped w-100 table-min-width">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Users</th>
                          <th scope="col">New Users</th>
                          <th scope="col">Bounce %</th>
                          <th scope="col">Signups</th>
                          <th scope="col">Reviews</th>
                          <th scope="col">Claims</th>
                          <th scope="col">Free</th>
                          <th scope="col">Basic</th>
                          <th scope="col">Plus</th>
                          <th scope="col">Companies</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Search Results</th>

                          <td>
                            <span className="ga-users table-link">
                             
                               {(props.getTractionReportData || {}).gaUsers}
                            </span>
                          </td>
                          <td>
                            <span className="ga-new-users table-link">
                              {(props.getTractionReportData || {}).gaNewUsers}
                            </span>
                          </td>
                          <td>
                            <span className="ga-bounce-rate table-link">
                              {props.getTractionReportData.gaBounceRate !== undefined ? (Number(props.getTractionReportData.gaBounceRate)).toFixed(2) :''}%
                            </span>
                          </td>
                          <td>
                            <span className="users table-link">
                              <Link to={{
                                pathname: '/admin/traction-report/detail', state: {
                                  sDate: startDate,
                                  eDate:endDate,
                                  date:  startDate+"T00:00:00Z"+"/"+endDate+"T23:59:59Z",
                                  type: 'users',
                                  tbltitle: [
                                    'id','First name','Last name','email','company','title','industry','location','headline','create at','verified'
                                  ]
                                }
                              }} className="users">
                                {(props.getTractionReportData || {}).users}
                              </Link>
                            </span>
                          </td>
                          <td>
                            <span className="table-link reviews">
                              <Link to={{
                                pathname: '/admin/traction-report/detail', state: {
                                  sDate: startDate,
                                  eDate:endDate,
                                  date: startDate+"T00:00:00Z"+"/"+endDate+"T23:59:59Z",
                                  type: 'reviews',
                                  tbltitle: [
                                    'company name','user name','user id','user email','review date','company address','company country','company email','company city','company id'
                                  ]
                                }
                              }} className="text-dark">
                                {(props.getTractionReportData || {}).reviews}
                              </Link>
                            </span>
                          </td>
                          <td>
                            <span className="table-link claims">
                              <Link to={{
                                pathname: '/admin/traction-report/detail', state: {
                                  sDate: startDate,
                                  eDate:endDate,
                                  date: startDate+"T00:00:00Z"+"/"+endDate+"T23:59:59Z",
                                  type: 'claims',
                                  tbltitle: [
                                    'company name','user name','user id','claim date','company address','company country','company email','company city','company id'
                                  ]
                                }
                              }} className="text-dark">
                                {(props.getTractionReportData || {}).claims}
                              </Link>
                            </span>
                          </td>
                          <td>
                            <span className="table-link free">
                              <Link to={{
                                pathname: '/admin/traction-report/detail', state: {
                                  sDate: startDate,
                                  eDate:endDate,
                                  date: startDate+"T00:00:00Z"+"/"+endDate+"T23:59:59Z",
                                  type: 'free',
                                  tbltitle: [
                                    'company name','company address','company country','company email','company city','company id','payment date','strip customer'
                                  ]
                                }

                              }} className="text-dark">
                                {(props.getTractionReportData || {}).free}
                              </Link>
                            </span>
                          </td>
                          <td>
                            <span className="table-link basic">
                              <Link to={{
                                pathname: '/admin/traction-report/detail', state: {
                                   sDate: startDate,
                                  eDate:endDate,
                                  date:  startDate+"T00:00:00Z"+"/"+endDate+"T23:59:59Z",
                                  type: 'basic',
                                  tbltitle: [
                                    'company name','company address','company country','company email','company city','coupon','company id','payment date','strip customer'
                                  ]
                                }
                              }} className="text-dark">
                                {(props.getTractionReportData || {}).basic}
                              </Link>
                            </span>
                          </td>
                          <td>
                            <span className="table-link plus">
                              <Link to={{
                                pathname: '/admin/traction-report/detail', state: {
                                  sDate:startDate,
                                  eDate:endDate,
                                  date:startDate+"T00:00:00Z"+"/"+endDate+"T23:59:59Z",
                                  type:'plus',
                                  tbltitle: [
                                    'company name','company address','company country','company email','company city','company id','payment date','strip customer'
                                  ]
                                }
                              }} className="text-dark">
                                {(props.getTractionReportData || {}).plus}
                              </Link>
                            </span>
                          </td>
                          <td>
                            <span className="table-link companies">
                              <Link to={{
                                pathname: '/admin/traction-report/detail', state: {
                                  sDate: startDate,
                                  eDate:endDate,
                                  date:  startDate+"T00:00:00Z"+"/"+endDate+"T23:59:59Z",
                                  type: 'companies',
                                  tbltitle: [
                                    'name','address','address2','city','state','postal code','country','phone','website','tagline','year founded','created at','email'
                                  ]
                                }
                              }} className="text-dark">
                                {(props.getTractionReportData || {}).companies}
                              </Link>
                            </span>
                          </td>
                        </tr>
                        <tr />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            {/* Description  */}
          </div>
        </div>
      </div>

      {/* END: Content */}
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTractionReport: (params: any) => dispatch(getTractionReport(params)),
  getTractionByDateReport: () => dispatch(getTractionByDateReport()),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.tractionReport.getTractionReport;
  console.log('successdata>>>>',data);
  return {
    loading: state.tractionReport.loading,
    getTractionReportData: state.tractionReport.getTractionReport,
    getTractionReportByDate: state.tractionReport.getTractionReportByDate,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TractionReport);
