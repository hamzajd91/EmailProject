import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {
 faBell, faEdit, faFlag, faStar, faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store';
import { getCompany, deleteCompany } from '../../store/ducks/addFirms/actions';
import Loading from '../assets/images/Loading';

type Props = any;

const Home = (props: Props) => {
  const [modal, setModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');
  const [deletePosition, setDeletePosition] = useState(-1);
  const [searchText, setsearchText] = useState('');
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    setPageNo(1);
    props.getCompany(pageNo, '');
  }, []);

  function handlePageChange(pageNumber: number) {
    setPageNo(pageNumber);
    props.getCompany(pageNo, searchText);
  }

  const onclickLogout = () => {
    setModal(!modal);
  };

  const clickOnSearch = () => {
    props.getCompany(1, searchText);
  };

  const onDeleteItem = () => {
    props.deleteCompany({ id: deleteItem });
  };

  useEffect(() => {
     if (deletePosition !== -1) {
       onclickLogout();
       props.getCompany(pageNo, searchText);
       setDeletePosition(-1);
      // props.deleteCompanyData.splice(deletePosition,1);
     }
  }, [props.deleteCompanyData]);

  return (
    <>
      {/* <div className="container"> */}
      <div className="app-content content">
        {props.loading && <Loading />}
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper">
          <div className="content-body">
            {/* Description  */}
            <section className="card">
              <div className="card-header align-items-end">
                <p className="mb-0 text-bold-500 font-medium-1">
                  Viewing
                  {' '}
                  {props.getCompanyData.page * 10 - 9}
-
                  {props.getCompanyData.page * 10 < props.getCompanyData.total
                    ? props.getCompanyData.page * 10
                    : props.getCompanyData.total}
                  {' '}
                  of
                  {' '}
                  {props.getCompanyData.total}
                  {' '}
companies
                </p>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                    onChange={(e) => {
                      setsearchText(e.target.value);
                      {
                        if (e.target.value === '') {
                          props.getCompany(1, '');
                        }
                      }
                    }}
                  />
                  <div>
                    <button type="button" className="btn bgMain text-white ml-2" onClick={clickOnSearch}>
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped w-100">
                      <thead className="thead-dark">
                        <tr>
                          <th>Name</th>
                          <th>Address</th>
                          <th>City/State</th>
                          <th>Phone</th>
                          <th>Postal Code</th>
                          <th>Website</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(props.getCompanyData.data || []).map((item: any, index: any) => (
                          <tr key={index}>
                            <td>{item.name || '-'}</td>
                            <td>{item.address1 || '-'}</td>
                            <td>{(item.city, item.state) || '-'}</td>
                            <td>{item.phone || '-'}</td>
                            <td>{item.postalCode || '-'}</td>
                            <td>
                              <a className="textTheme" target="_blank">
                                {item.website || '-'}
                              </a>
                            </td>
                            <td className="text-align-center">
                              <Link to={{
                                pathname: '/admin/firms/editFirm',
                                state: {
                                  data: item,
                                },
                              }}
                              >

                                <FontAwesomeIcon icon={faEdit} className="fa-lg mr-1" />
                              </Link>
                              {/* <a href="javascript:void(0)" title="Edit">

                              onClick={() => {
                                  console.log('data>>>',item);
                                }}

                                <FontAwesomeIcon icon={faEdit} className="fa-lg mr-1" onClick={() => {
                                  console.log('data>>>',item);
                                }}/>
                              </a> */}
                              <button
                                type="button"
                                className="border-0 bg-transperent"
                                onClick={() => {
                                setDeleteItem(item.id);
                                setDeletePosition(index);
                                onclickLogout();
                              }}
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 text-bold-500 font-medium-1">
                      Page
                      {' '}
                      {props.getCompanyData.page || 1}
                      {' '}
of
                      {' '}
                      {Math.ceil(props.getCompanyData.total / 10)}
                    </p>
                    <Pagination
                      hideFirstLastPages
                      activePage={props.getCompanyData.page || 1}
                      totalItemsCount={props.getCompanyData.total || 0}
                      itemsCountPerPage={10}
                      pageRangeDisplayed={5}
                      itemClass="page-item"
                      hideDisabled
                      linkClass="page-link"
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* Description */}
          </div>
        </div>
        <Modal show={modal} onHide={onclickLogout}>
          <Modal.Header closeLabel="Close">
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete firms?</Modal.Body>
          <Modal.Footer>
            <Button
              className="navbarColor"
              onClick={() => {
                onDeleteItem();
              }}
            >
              Yes
            </Button>
            <Button
              color="secondary"
              onClick={() => {
             onclickLogout();
            }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* </div> */}
    </>
  );
};


const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCompany: (params: any, text: string) => dispatch(getCompany(params, text)),
  deleteCompany: (params: any) => dispatch(deleteCompany(params)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.addFirms.getCompany;
  const deleteData = state.addFirms.deleteCompany;

  return {
    loading: state.addFirms.loading,
    getCompanyData: state.addFirms.getCompany,
    deleteCompanyData: state.addFirms.deleteCompany,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
