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
import Loading from '../assets/images/Loading';
import { getContactInfo, deleteContactInfo } from '../../store/ducks/contactInfo/actions';

type Props = any;

const ContactInfo = (props: Props) => {
  const [modal, setModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');
  const [deletePosition, setDeletePosition] = useState(-1);
  const [searchText, setsearchText] = useState('');
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    setPageNo(1);
    props.getContactInfo(pageNo, '');
  }, []);

  function handlePageChange(pageNumber: number) {
    setPageNo(pageNumber);
    props.getContactInfo(pageNumber, '');
  }

  const onCloseModel = () => {
    setModal(!modal);
  };

  const clickOnSearch = () => {
    props.getContactInfo(pageNo, searchText);
  };

  const onDeleteItem = () => {
    props.deleteCompanyInfo({ id: deleteItem });
  };

  useEffect(() => {
    if (deletePosition !== -1) {
      props.getContactInfo(pageNo, searchText);
      setDeletePosition(-1);
    }
  }, [props.deleteCompanyInfoData]);

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
              <div className="card-header align-items-center">
                <p className="mb-0 text-bold-500 font-medium-1 align-items-center">
                  Viewing
                  {' '}
                  {props.getContactInfoData.page * 10 - 9}
                  -
                  {props.getContactInfoData.page * 10 < props.getContactInfoData.total
                    ? props.getContactInfoData.page * 10
                    : props.getContactInfoData.total}
                  {' '}
                  of
                  {' '}
                  {props.getContactInfoData.total}
                  {' '}
                  contact
                </p>
                <div className="d-flex flex-row align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                    onChange={(e) => {
                      setsearchText(e.target.value);
                      {
                        if (e.target.value === '') {
                          props.getContactInfo(1, '');
                        }
                      }
                    }}
                  />
                  <button type="button" className="btn bgMain text-white ml-2" onClick={clickOnSearch}>
                    Search
                  </button>
                  <Link to={{
                    pathname: '/admin/contact-info/add-contact',
                    state: {
                      isEdit: false
                    },
                  }}
                    className="btn bgMain text-white ml-2" style={{ whiteSpace: 'nowrap' }}>

                    Add Contact

                  </Link>




                </div>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped w-100">
                      <thead className="thead-dark">
                        <tr>
                          <th>Contact FullName</th>
                          <th>Title</th>
                          <th>Company name</th>
                          <th>Website</th>
                          <th>Primary email</th>
                          <th>Linkedin</th>
                          <th>Email 1</th>
                          <th>Email 2</th>
                          <th>Email 3</th>
                          <th>Email 4</th>
                          <th>Email 5</th>
                          <th>Email 6</th>
                          <th>Email 7</th>
                          <th>Email 8</th>
                          <th>Email 9</th>
                          <th>Email 10</th>
                          <th>Personal email</th>
                          <th>Personal email2</th>
                          <th>Contact phone1</th>
                          <th>Contact phone2</th>
                          <th>Country</th>
                          <th>Company location</th>
                          <th>Company city</th>
                          <th>Company state</th>
                          <th>Company state abbr</th>
                          <th>Company annual revenue</th>
                          <th>Company industry</th>
                          <th>Company linkedin profileUrl</th>
                          <th>Company revenue range</th>
                          <th>Company staff count</th>
                          <th>Company staff countRange</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(props.getContactInfoData.companies || []).map((item: any, index: any) => (
                          <tr key={index}>
                            <td>{item.contactFullName || '-'}</td>
                            <td>{item.title || '-'}</td>
                            <td>{item.companyName || '-'}</td>
                            <td>
                              <a className="textTheme" target="_blank">
                                {item.website || '-'}
                              </a>
                            </td>
                            <td>{item.primaryEmail || '-'}</td>
                            <td>{item.linkedIn || '-'}</td>
                            <td>{item.email1 || '-'}</td>
                            <td>{item.email2 || '-'}</td>
                            <td>{item.email3 || '-'}</td>
                            <td>{item.email4 || '-'}</td>
                            <td>{item.email5 || '-'}</td>
                            <td>{item.email6 || '-'}</td>
                            <td>{item.email7 || '-'}</td>
                            <td>{item.email8 || '-'}</td>
                            <td>{item.email9 || '-'}</td>
                            <td>{item.email10 || '-'}</td>
                            <td>{item.personalEmail1 || '-'}</td>
                            <td>{item.personalEmail2 || '-'}</td>
                            <td>{item.contactPhone1 || '-'}</td>
                            <td>{item.contactPhone2 || '-'}</td>
                            <td>{item.country || '-'}</td>
                            <td>{item.companyLocation || '-'}</td>
                            <td>{item.companyCity || '-'}</td>
                            <td>{item.companyState || '-'}</td>
                            <td>{item.companyStateAbbr || '-'}</td>
                            <td>{item.companyAnnualRevenue || '-'}</td>
                            <td>{item.companyIndustry || '-'}</td>
                            <td>{item.companyLinkedinProfileUrl || '-'}</td>
                            <td>{item.companyRevenueRange || '-'}</td>
                            <td>{item.companyStaffCount || '-'}</td>
                            <td>{item.companyStaffCountRange || '-'}</td>
                            <td className="text-align-center d-flex flex-row">
                              <Link
                                to={{
                                  pathname: '/admin/contact-info/edit-contact',
                                  state: {
                                    data: item,
                                    isEdit: true
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
                                  onCloseModel();
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
                      {props.getContactInfoData.page || 1}
                      {' '}
                      of
                      {' '}
                      {Math.ceil(props.getContactInfoData.total / 10)}
                    </p>
                    <Pagination
                      hideFirstLastPages
                      activePage={props.getContactInfoData.page || 1}
                      totalItemsCount={props.getContactInfoData.total || 0}
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
        <Modal show={modal} onHide={onCloseModel}>
          <Modal.Header closeLabel="Close">
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete firms?</Modal.Body>
          <Modal.Footer>
            <Button
              className="navbarColor"
              onClick={() => {
                onCloseModel();
                onDeleteItem();
              }}
            >
              Yes
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                onCloseModel();
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
  getContactInfo: (page: any, search: any) => dispatch(getContactInfo(page, search)),
  deleteCompanyInfo: (id: any) => dispatch(deleteContactInfo(id)),
});

const mapStateToProps = (state: ApplicationState) => {
  console.log(state);
  return {
    loading: state.contactInfo.loading,
    getContactInfoData: state.contactInfo.getContactInfo,
    deleteCompanyInfoData: state.contactInfo.deleteContactInfo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
