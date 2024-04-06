import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ApplicationState} from "../../store";
import Pagination from "react-js-pagination";
import { getAdvertisements } from '../../store/ducks/advertisements/actions';
import Loading from '../../admin/assets/images/Loading';

type Props = any;
let pageCount = 1;

const FirmAdvertisement = (props: Props) => {

  useEffect(() => {
      props.getAdvertisements(1);
    }, []);

      function handlePageChange(pageNumber: number) {
        pageCount = pageNumber;
        
        props.getAdvertisements(pageNumber);
      }

        return (
          <div className="app-content content">
            {props.loading && <Loading />}
            <div className="content-overlay" />
            <div className="header-navbar-shadow" />
            <div className="content-wrapper">
              <div className="content-body">
                {/* Description  */}
                <section id="description" className="card">
                  <div className="card-header">
                    <Link to="/admin/firmAdvertisement/addAdvertisements">
                      <button type="button" className="btn bgMain text-white ml-2 waves-effect waves-light ml-auto">
                        Add Advertisements
                      </button>
                    </Link>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped w-100">
                          <thead className="thead-dark">
                            <tr>
                              <th>Firm ID</th>
                              <th>Firm Name</th>
                              <th>Amount Ad Paid</th>
                              <th>Validity Date From</th>
                              <th>Validity Date To</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(props.getAdvertisementsData.data || []).map((item: any, index: any) => (
                              <tr key={index}>
                                <td>{item.company_id}</td>
                                <td>{item.company_name}</td>
                                <td>{item.amount}</td>
                                <td>{item.add_start}</td>
                                <td>{item.add_end}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0 text-bold-500 font-medium-1">
                          Page {props.getAdvertisementsData.page || 1} of{" "}
                          {Math.ceil(props.getAdvertisementsData.total / 10)}
                        </p>
                        <Pagination
                          hideFirstLastPages={true}
                          activePage={props.getAdvertisementsData.page || 1}
                          totalItemsCount={props.getAdvertisementsData.total || 0}
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
          </div>
        );
};

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAdvertisements: (params: any) => dispatch(getAdvertisements(params)),
  });

  const mapStateToProps = (state: ApplicationState) => {
    const data = state.advertisements.getAdvertisements;
    
    return {
      loading: state.advertisements.loading,
      getAdvertisementsData: state.advertisements.getAdvertisements,
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(FirmAdvertisement);
