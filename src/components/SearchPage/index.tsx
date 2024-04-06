import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {connect} from "react-redux";
import qs from "qs";
import {withRouter, Link} from "react-router-dom";
import review_image from "../../images/review_image.png";
import Maps from "../GoogleMaps/Maps";

import {searchCompany, searchOnLoad, setPageOnLoad} from "../../store/ducks/companies/actions";

import Filters from "../Filters";
import CompaniesList from "../CompaniesList";
// import SearchComponent from "../shared/SearchComponent";
import appApi from "../../services/appApi";
import {Loader} from "../Loader";

import "./index.scss";

interface DispatchProps {
  searchCompany(params: any): void;
  searchOnLoad(params: any): void;
  setPageOnLoad(params: any): void;
}

interface Props {
  location: any;
  companyResponse: any;
  history: any;
  _location: any;
  companies: any;
  error: any;
  activePage: any;
  writeReview?: boolean;
}

type AllProps = DispatchProps & Props;

function SearchPage({
  location,
  searchOnLoad,
  setPageOnLoad,
  companyResponse,
  history,
  companies,
  error,
  _location,
  activePage,
  writeReview,
}: AllProps) {
  // @ts-ignore
  const [currentPage, setCurrentPage] = useState("1");
  // @ts-ignore
  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParam, setQueryParam] = useState("");
  const [locationParam, setLocationParam] = useState("");
  const [advertisementsCompanies, setAdvertisementsCompanies] = useState([]);

  useEffect(() => {
    const query = qs.parse(location.search, {ignoreQueryPrefix: true}) as any;
    handleSearch(query.page);
    setCurrentPage(query.page);
    setPageOnLoad({activePage: query.page});
  }, [window.location.href]);

  useEffect(() => {
    
    getAdvertisements();
  }, []);

  const getAdvertisements = async () => {
    try {
      const {data} = await appApi.get("/companies/get/subscibe/advertisements");
      setAdvertisementsCompanies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (writeReview) {
      return setLocationParam(_location);
    }

    const query = qs.parse(location.search, {ignoreQueryPrefix: true}) as any;

    if (!query.page) {
      history.push({
        pathname: "/search",
        search: `?q=${query.q}&location=${query.location || _location}&page=1`,
      });
    }

    if (activePage == "") {
      history.push({
        pathname: "/search",
        search: `?q=${query.q}&location=${query.location || _location}&page=1`,
      });
    }
  }, [activePage, _location]);

  function handleSearch(page: any) {
    const query = qs.parse(location.search, {ignoreQueryPrefix: true}) as any;
    setQueryParam(query.q);
    setLocationParam(query.location);
    const params = {
      query: query.q,
      location: query.location,
      distance: companyResponse.currentDistance || 3000,
      page: parseInt(page, 10),
      sortFilters: companyResponse.sort,
      filters: companyResponse.currentFilters
        ? {
            p: companyResponse.currentFilters.proficiencies,
            s: companyResponse.currentFilters.scores,
            i: companyResponse.currentFilters.industries,
          }
        : {p: [], s: [], i: []},
    };

    searchOnLoad(params);
    window.scrollTo(0, 0);
  }

  if (isLoading) {
    return (
      <>
        <div className="p-5">
          <Loader />
        </div>
      </>
    );
  } else {
    return (
      <div className="hs-search-and-profile">
        <div className="container-fluid">
          <div className="row">
            <div className="search_page">
              {writeReview ? (
                <React.Fragment>
                  <div className="text-center mt-4">
                    <img src={review_image} className="img-fluid" />
                  </div>
                  <div className="writeReview">
                    <h3 className="hs-text1 text-center body-1">
                      You&apos;re on your way to join the Hindsyght community. You can find a professional services firm
                      with specific proficiency you are looking for, write a review, or claim a company. Start by
                      searching for a company you are looking for.
                    </h3>
                  </div>
                </React.Fragment>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {/* <div className="search_box_bg">
          <Container>
            <Row>
              <SearchComponent
                classess="search-page"
                error={error}
                searchCompany={searchOnLoad}
                locationQuery={locationParam}
                query={queryParam}
                setShowProfile={setShowProfile}
              />
            </Row>
          </Container>
        </div> */}

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <Filters />
            </div>
            <div className="col-md-8 col-lg-6">
              {!writeReview && (
                <CompaniesList
                  advertisementsCompanies={advertisementsCompanies}
                  history={history}
                  setShowProfile={setShowProfile}
                />
              )}
            </div>
            <div className="col-md-12 col-lg-3">
              <div className="map-wrapper">
                {companies.length > 0 && (
                  <Maps className="bg_search" branches={companies} coordinates={companies[0].coordinates} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="company_not_found">
          <Container>
            <div className="row justify-content-center">
              <div className="col-md-7">
                <h3>Don't see what you're looking for?</h3>
                <p>
                  If you can't find the firm you're looking for, add it here! Help create an ecosystem for you and other
                  businesses to connect and share experiences!
                </p>
                <Link to="/company/details">Add a Company</Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    error: state.companies.error,
    companyResponse: state.companies.searchResponse,
    distance: state.companies.distance,
    query: state.companies.query,
    locationQ: state.companies.location,
    companies: state.companies.companiesData,
    filters: state.companies.filters,
    activePage: state.companies.activePage,
    _location: state.location.location,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  searchCompany: (params: any) => dispatch(searchCompany(params)),
  searchOnLoad: (params: any) => dispatch(searchOnLoad(params)),
  setPageOnLoad: (params: any) => dispatch(setPageOnLoad(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
