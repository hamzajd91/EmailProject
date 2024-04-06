import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { addcrawlStatus, getcrawlStatus } from '../../store/ducks/crawlStatus/actions';
import Pagination from "react-js-pagination";
import Loading from '../../admin/assets/images/Loading';
import {Button, Modal} from "react-bootstrap";
import { getProficiencies } from '../../store/ducks/addFirms/actions';


type Props = any;
let pageCount = 1;

const CrawlStatus = (props: Props) => {

  const [modal, setModal] = useState(false);
  const [proficiencies, setProficiencies] = useState("");

  useEffect(() => {
    props.getcrawlStatus(1);
    props.getProficiencies();
  }, []);

  const onclickAddNewCrawler = () => {
    setModal(!modal);
  };

  const addCrawl = () => {
    if(proficiencies !== ""){
      props.addcrawlStatus(proficiencies);
      setProficiencies("");
      setModal(!modal);
    }
  };

  function handlePageChange(pageNumber: number) {
    pageCount = pageNumber;
    props.getcrawlStatus(pageNumber);
  }


  return (
    <div className="app-content content">
      {props.loading && <Loading />}
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <div className="content-wrapper">
        <div className="content-body">
          {/* Description  */}
          <section className="card">
            <div className="card-header">
              <h4 className="card-title">Processes</h4>
            </div>
            <div className="d-flex align-items-center justify-content-between px-2">
              <p className="mb-0 text-bold-500 font-medium-1 ml-3">
                Viewing {pageCount * 10 - 9}-
                {pageCount * 10 < props.getcrawlStatusData.total ? pageCount * 10 : props.getcrawlStatusData.total} of{" "}
                {props.getcrawlStatusData.total} processes
              </p>
              <button
                type="button"
                className="btn bgMain text-white mr-3 waves-effect waves-light ml-auto"
                onClick={onclickAddNewCrawler}
              >
                Add new Crawler
              </button>
            </div>
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive max-height-630">
                  <table className="table table-striped w-100 table-min-width-md">
                    <thead className="thead-dark">
                      <tr>
                        <th>Sr #</th>
                        <th>PID</th>
                        {/* <th>ProcessId</th>  */}
                        <th>Proficiency</th>
                        <th>StartedAt</th>
                        <th>EndedAt</th>
                        <th>Status</th>
                        <th>Total Fetched</th>
                        <th>Total Crawled</th>
                        <th>Remaining Crawled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(props.getcrawlStatusData.processes || []).map((item: any, index: any) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>
                            <Link
                              className="textTheme"
                              to={{
                                pathname: "/admin/crawlStatus/cloudServices",
                                state: {
                                  id: item.id,
                                  name: item.proficiency,
                                },
                              }}
                            >
                              {item.processId}
                            </Link>
                          </td>
                          <td>
                            <Link
                              className="textTheme"
                              to={{
                                pathname: "/admin/crawlStatus/cloudServices",
                                state: {
                                  id: item.id,
                                  name: item.proficiency,
                                },
                              }}
                            >
                              {item.proficiency}
                            </Link>
                          </td>
                          <td>{item.startedAt}</td>
                          <td>{item.endedAt}</td>
                          <td>{item.status}</td>
                          <td>{item.totalFetched}</td>
                          <td>{item.totalCrawled}</td>
                          <td>{item.totalNotCrawled}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 text-bold-500 font-medium-1">
                    Page {props.getcrawlStatusData.page || 1} of {Math.ceil(props.getcrawlStatusData.total / 10)}
                  </p>
                  <Pagination
                    hideFirstLastPages={true}
                    activePage={props.getcrawlStatusData.page || 1}
                    totalItemsCount={props.getcrawlStatusData.total || 0}
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
          {/* Description  */}
        </div>
      </div>

      <Modal show={modal} onHide={onclickAddNewCrawler}>
        <Modal.Header closeLabel="Close">
          <Modal.Title>Add New Crawler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="proficiencies">Please select proficiencies :</label>
            <select
              required
              name="proficiencies"
              onChange={option => setProficiencies(option.target.value)}
              className={"select2 form-control"}
            >
              {(props.getProficienciesData || []).map((item: any, index: any) => (
                <>
                  <option value={item.name}>{item.name}</option>
                </>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="navbarColor"
            onClick={() => {
              addCrawl();
            }}
          >
            Add Crawler
          </Button>
          <Button color="secondary" onClick={onclickAddNewCrawler}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    getcrawlStatus: (params: any) => dispatch(getcrawlStatus(params)),
    addcrawlStatus: (params: any) => dispatch(addcrawlStatus(params)),
    getProficiencies: (params: any) => dispatch(getProficiencies()),
  });

  const mapStateToProps = (state: ApplicationState) => {
    const data = state.crawlStatus.getCrawlStatus;

    return {
      loading: state.crawlStatus.loading,
      getcrawlStatusData: state.crawlStatus.getCrawlStatus,
      getProficienciesData: state.addFirms.getProficiencies,
    };
  };
  

  export default connect(mapStateToProps, mapDispatchToProps)(CrawlStatus);
