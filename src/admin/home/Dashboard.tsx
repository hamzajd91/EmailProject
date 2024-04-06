import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {
 faBell, faEdit, faFlag, faStar, faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { Button, Card, Modal } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store';
import { getDashboard } from '../../store/ducks/addFirms/actions';
import Loading from '../assets/images/Loading';

type Props = any;

const Dashboard = (props: Props) => {
  const [modal, setModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');
  const [deletePosition, setDeletePosition] = useState(-1);
  const [searchText, setsearchText] = useState('');
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    props.getDashboard("");
  }, []); 


  const onclickLogout = () => {
    setModal(!modal);
  };


  return (
    <>
      {/* <div className="container"> */}
      <div className="app-content content">
        {props.loading && <Loading />}
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper">
          <div className="content-body">
            <div className="row match-height">
              {/* Total Firms */}
              <div className="col-xxl-2 col-xl-3 col-sm-6">
                <Card>
                  <div className="text-center text-info py-4 p-2 mt-1">
                    <p className="text-size fw-bolder font-weight-bold font-medium-5">
                      {props.getDashboardData.industryCount || 0}
                    </p>
                    <p className="mt-2 fw-bolder">Total Industry</p>
                  </div>
                </Card>
              </div>
              {/* Total Company */}
              <div className="col-xxl-2 col-xl-3 col-sm-6">
                <Card>
                  <div className="text-center text-danger py-4 p-2 mt-1">
                    <p className="text-size fw-bolder font-weight-bold font-medium-5">
                      {props.getDashboardData.firmCount || 0}
                    </p>
                    <p className="mt-2">Total Firms</p>
                  </div>
                </Card>
              </div>
              {/* Total Users*/}
              <div className="col-xxl-2 col-xl-3 col-sm-6">
                <Card>
                  <div className="text-center text-secondary py-4 p-2 mt-1">
                    <p className="text-size fw-bolder font-weight-bold font-medium-5">
                      {props.getDashboardData.userCount || 0}
                    </p>
                    <p className="mt-2">Total Users</p>
                  </div>
                </Card>
              </div>
              {/* Total Review*/}
              <div className="col-xxl-2 col-xl-3 col-sm-6">
                <Card>
                  <div className="text-center text-warning py-4 p-2 mt-1">
                    <p className="text-size fw-bolder font-weight-bold font-medium-5">
                      {props.getDashboardData.reviews || 0}
                    </p>
                    <p className="mt-2">Total Review</p>
                  </div>
                </Card>
              </div>
              {/* Total Patient Company*/}
              <div className="col-xxl-2 col-xl-3 col-sm-6">
                <Card>
                  <div className="text-center text-success py-4 p-2 mt-1">
                    <p className="text-size fw-bolder font-weight-bold font-medium-5">
                      {props.getDashboardData.userCompanies || 0}
                    </p>
                    <p className="mt-2">User's Total Company</p>
                  </div>
                </Card>
              </div>
              {/* Total Subscription */}
              <div className="col-xxl-2 col-xl-3 col-sm-6">
                <Card>
                  <div className="text-center text-primary py-4 p-2 mt-1">
                    <p className="text-size fw-bolder font-weight-bold font-medium-5">
                      {props.getDashboardData.subcriptionCount || 0}
                    </p>
                    <p className="mt-2 fw-bolder">Total Subscription</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};


const mapDispatchToProps = (dispatch: Dispatch) => ({
  getDashboard: (params: any, text: string) => dispatch(getDashboard(params)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.addFirms.getDashboardData;
  const deleteData = state.addFirms.deleteCompany;

  console.log("----data---", data);
  

  return {
    loading: state.addFirms.loading,
    getDashboardData: state.addFirms.getDashboardData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
