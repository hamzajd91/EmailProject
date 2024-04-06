import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { actionStatus, getCrawlStatusDetail, updateCompany } from '../../store/ducks/crawlStatus/actions';
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRetweet } from '@fortawesome/free-solid-svg-icons';


type Props = any;
const CloudServices = (props: Props) => {
  
  const id = props.location.state.id;
  const name = props.location.state.name;
  const [website, setWebsite] = useState("");
  const [visited, setVisited] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const [modal, setModal] = useState(false);
  const [linkId, setLinkId] = useState(0);


  const onclickAction = (linkId :any) => {
    setLinkId(linkId);   
    setModal(!modal);
  };

  const clickOnYes = () => {
    setModal(!modal);
    props.actionStatus(id,linkId);
  }

  useEffect(() => {
    props.getCrawlStatusDetail(id,1,"","","","","","","");
  }, []);

  function handlePageChange(pageNumber: number) {
    props.getCrawlStatusDetail(id, pageNumber, website, visited, address, phone, email, description, error);
  }

  const clickOnSubmit = () => {
    props.getCrawlStatusDetail(id, 1, website, visited, address, phone, email, description, error);
  }

  const clickOnUpdate = () => {
    props.updateCompany(id);
  }

  return (
    <>
      {/* BEGIN: Content */}
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper">
          <div className="card">
            <div className="card-header d-block">
              <div className="row">
                <div className="col-12">
                  <h4 className="card-title">Crawler Process Id : {id}</h4>
                </div>
                <div className="col-12 mt-1">
                  <h4 className="card-title">Proficiency: {name}</h4>
                </div>
                <div className="col-12 mt-1">
                  <h5 className="text-bold-500 font-medium-1 mb-0">Filters</h5>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="location11">Website Field</label>
                    <select
                      data-placeholder="Select a state..."
                      className="select2-icons form-control"
                      id="select1-icons"
                      onChange={option => setWebsite(option.target.value)}
                    >
                      <option selected>All Records</option>
                      <option value="website-1">Empty</option>
                      <option value="website-2">Non Empty</option>
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="location11">Visited Field</label>
                    <select
                      data-placeholder="Select a state..."
                      className="select2-icons form-control"
                      id="select2-icons"
                      onChange={option => setVisited(option.target.value)}
                    >
                      <option selected>All Records</option>
                      <option value="visited-1">True</option>
                      <option value="visited-2">False</option>
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="location11">Address Field</label>
                    <select
                      data-placeholder="Select a state..."
                      className="select2-icons form-control"
                      id="select3-icons"
                      onChange={option => setAddress(option.target.value)}
                    >
                      <option selected>All Records</option>
                      <option value="address-1">Empty</option>
                      <option value="address-2">Non Empty</option>
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="location11">Phone Field</label>
                    <select
                      data-placeholder="Select a state..."
                      className="select2-icons form-control"
                      id="select4-icons"
                      onChange={option => setPhone(option.target.value)}
                    >
                      <option selected>All Records</option>
                      <option value="phone-1">Empty</option>
                      <option value="phone-2">Non Empty</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="location11">
                      {/* selected */}
                      Email Field
                    </label>
                    <select
                      data-placeholder="Select a state..."
                      className="select2-icons form-control"
                      id="select5-icons"
                      onChange={option => setEmail(option.target.value)}
                    >
                      <option selected>All Records</option>
                      <option value="email-1">Empty</option>
                      <option value="email-2">Non Empty</option>
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="location11">Description Field</label>
                    <select
                      data-placeholder="Select a state..."
                      className="select2-icons form-control"
                      id="select6-icons"
                      onChange={option => setDescription(option.target.value)}
                    >
                      <option selected>All Records</option>
                      <option value="desc-1">Empty</option>
                      <option value="desc-2">Non Empty</option>
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="location11">Error Field</label>
                    <select
                      data-placeholder="Select a state..."
                      className="select2-icons form-control"
                      id="select7-icons"
                      onChange={option => setError(option.target.value)}
                    >
                      <option selected>All Records</option>
                      <option value="error-1">Empty</option>
                      <option value="error-2">Non Empty</option>
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <div className="d-flex align-items-center justify-content-end">
                    <button className="btn bgMain text-white waves-effect waves-light" onClick={clickOnSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between my-1">
                <p className="mb-0 text-bold-500 font-medium-1">
                  Viewing {props.getCrawlStatusDetailData.page * 10 - 9}-
                  {props.getCrawlStatusDetailData.page * 10 < props.getCrawlStatusDetailData.total
                    ? props.getCrawlStatusDetailData.page * 10
                    : props.getCrawlStatusDetailData.total}{" "}
                  of {props.getCrawlStatusDetailData.total} links
                </p>
                <button
                  type="button"
                  className="btn bgMain text-white ml-2 waves-effect waves-light ml-auto"
                  onClick={clickOnUpdate}
                >
                  Update
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-striped w-100 table-min-width-xl">
                  <thead className="thead-dark">
                    <tr>
                      <th>Sr#</th>
                      <th>LinkId</th>
                      <th className="min-width-150">Company Name</th>
                      <th>Website</th>
                      <th>IsVisited</th>
                      <th className="min-width-210">CrawledAt</th>
                      <th className="min-width-270">Description</th>
                      <th>Email</th>
                      <th className="min-width-60">Phone</th>
                      <th className="min-width-260">Address</th>
                      <th>FacebookUrl</th>
                      <th>YoutubeUrl</th>
                      <th>LinkedInUrl</th>
                      <th>TwitterUrl</th>
                      <th>CrawledError</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(props.getCrawlStatusDetailData.crawlLinks || []).map((item: any, index: any) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.id || "-"}</td>
                        <td>{item.companyName || "-"}</td>
                        <td>
                          <a className="textTheme" target="_blank">
                            {item.link || "-"}
                          </a>
                        </td>
                        <td>{item.isVisited || "-"}</td>
                        <td>{item.crawledAt || "-"}</td>
                        <td>
                          <p className="text-line-clamp m-0">{item.crawledDescription || "-"}</p>
                        </td>
                        <td>{item.crawledEmail || "-"}</td>
                        <td>{item.crawledPhone || "-"}</td>
                        <td>{item.crawledAddress || "-"}</td>
                        <td>
                          <p className="text-truncate m-0">{item.crawledFbLink || "-"}</p>
                        </td>
                        <td>
                          <p className="text-truncate m-0">{item.crawledYoutubeLink || "-"}</p>
                        </td>
                        <td>
                          <p className="text-truncate m-0">{item.crawledLinkedInLink || "-"}</p>
                        </td>
                        <td>{item.crawledTwitterLink || "-"}</td>
                        <td>{item.crawledError || "-"}</td>
                        <td onClick={() => onclickAction(item.id)}>
                          <FontAwesomeIcon icon={faRetweet} className="fa-lg mr-1" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 text-bold-500 font-medium-1">
                  Page {props.getCrawlStatusDetailData.page || 1} of{" "}
                  {Math.ceil(props.getCrawlStatusDetailData.total / 10)}
                </p>
                <Pagination
                  hideFirstLastPages={true}
                  activePage={props.getCrawlStatusDetailData.page || 1}
                  totalItemsCount={props.getCrawlStatusDetailData.total || 0}
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
        </div>

        <Modal show={modal} onHide={() => onclickAction(0)}>
          <Modal.Header closeLabel="Close">
            <Modal.Title>Return Link</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to return this link?</Modal.Body>
          <Modal.Footer>
            <Button className="navbarColor" onClick={clickOnYes}>
              Yes
            </Button>
            <Button color="secondary" onClick={() => onclickAction(0)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* END: Content */}
    </>
  );
};


  const mapDispatchToProps = (dispatch: Dispatch) => ({
    getCrawlStatusDetail: (
      id: any,
      page: number,
      website: any,
      visited: any,
      address: any,
      phone: any,
      email: any,
      description: any,
      error: any
    ) => dispatch(getCrawlStatusDetail(id, page, website, visited, address, phone, email, description, error)),

    updateCompany: (params: any) => dispatch(updateCompany(params)),
    actionStatus: (id: any, linkId : any) => dispatch(actionStatus(id, linkId)),
  });

  const mapStateToProps = (state: ApplicationState) => {
    const data = state.crawlStatus.getCrawlStatusDetail;
    
    return {
      loading: state.crawlStatus.loading,
      getCrawlStatusDetailData: state.crawlStatus.getCrawlStatusDetail,
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(CloudServices);
