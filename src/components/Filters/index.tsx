import React, {useState} from "react";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import {Checkbox} from "@material-ui/core";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import filterObject from "../../interfaces/filterObject";
import ratingOptions from "../../data/ratingOptions";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Stars from "../CompanyProfile/ReviewSection/Stars";

// Redux Related imports
import * as actions from "../../store/ducks/companies/actions";
import {ApplicationState} from "../../store";

import "./index.scss";

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

const Filters = (props: any) => {
  let industries = [];
  let proficiencies = [];
  const {companies, distance} = props;

  const [showAllProficiencies, setShowAllProficiencies] = useState(true);
  const [showAllIndustries, setShowAllIndustries] = useState(true);

  if (companies.filters) {
    // eslint-disable-next-line prefer-destructuring
    industries = companies.filters.industries;
    // eslint-disable-next-line prefer-destructuring
    proficiencies = companies.filters.proficiencies;
  }
  const {currentFilters, sort} = companies;
  let scoresFilter: any;
  let filters: filterObject;
  if (currentFilters === undefined) {
    filters = {p: [], s: [], i: []};
    scoresFilter = [];
  } else {
    scoresFilter = currentFilters.scores;
    filters = {
      p: currentFilters.proficiencies,
      s: currentFilters.scores,
      i: currentFilters.industries,
    };
  }

  const handleRatingChange = (e: any) => {
    const params = {
      query: props.query,
      location: props.location,
      distance: props.distance,
      filters,
      sortFilters: sort,
    };

    if (e.target.checked == true) {
      filters.s.push(e.target.value);
      params.filters = filters;
      props.searchCompany(params);
    } else {
      filters.s.indexOf(e.target.value) !== -1 && filters.s.splice(filters.s.indexOf(e.target.value), 1);
      filters = filters;
      props.searchCompany(params);
    }
    props.loadMore(params);
  };

  const clearRatingChange = (e: any) => {
    const params = {
      query: props.query,
      location: props.location,
      distance: props.distance,
      filters,
      sortFilters: sort,
    };

    filters.s = [];
    params.filters = filters;
    props.loadMore(params);
  };

  const handleProficiencyChange = (e: any) => {
    const params = {
      query: props.query,
      location: props.location,
      distance: props.distance,
      filters,
      sortFilters: sort,
    };

    if (e.target.checked == true) {
      filters.p.push(e.target.value);
      filters = filters;
      props.loadMore(params);
    } else {
      filters.p.indexOf(e.target.value) !== -1 && filters.p.splice(filters.p.indexOf(e.target.value), 1);
      filters = filters;
      props.loadMore(params);
    }
  };

  const clearProficiencyChange = (e: any) => {
    const params = {
      query: props.query,
      location: props.location,
      distance: props.distance,
      filters,
      sortFilters: sort,
    };

    params.filters.p = [];
    filters = filters;
    props.loadMore(params);
  };

  const handleIndustryChange = (e: any) => {
    const params = {
      query: props.query,
      location: props.location,
      distance: props.distance,
      filters,
      sortFilters: sort,
    };

    if (e.target.checked == true) {
      filters.i.push(e.target.value);
      filters = filters;
      props.loadMore(params);
    } else {
      filters.i.indexOf(e.target.value) !== -1 && filters.i.splice(filters.i.indexOf(e.target.value), 1);
      filters = filters;
      props.loadMore(params);
    }
  };

  const handleDistanceChange = (event: any, newValue: number | number[]) => {
    const params = {
      query: props.query,
      location: props.location,
      distance: newValue,
      filters,
      sortFilters: sort,
    };

    props.loadMore(params);
  };

  const clearDistance = () => {
    const params = {
      query: props.query,
      location: props.location,
      distance: 3000,
      filters,
      sortFilters: sort,
    };
    props.loadMore(params);
  };

  function ValueLabelComponent({children, open, value}: Props) {
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  return (
    <React.Fragment>
      <div className="result_filter">
        <div className="row">
          <div className="col">
            <label className="filter_label">Filters</label>
          </div>
        </div>
        <div className="break_line"></div>
        <div className="row">
          <div className="col">
            <label className="filter_label">Distance</label>
          </div>
          <div className="col text-right">
            <button className="clr_btn" onClick={clearDistance}>
              Clear
            </button>
          </div>
        </div>
        <FormControl style={{width: "100%"}}>
          <div style={{position: "relative"}}>
            <Slider
              className="slider"
              ValueLabelComponent={ValueLabelComponent}
              max={3000}
              step={50}
              onChange={handleDistanceChange}
              min={50}
              aria-label="custom thumb label"
              value={Number(distance)}
            />
          </div>
          <div className="clear_filter">
            <p id="distance_label">Show companies up to {distance} miles away</p>
          </div>
        </FormControl>

        <div className="break_line"></div>

        <div className="row">
          <div className="col">
            <label className="filter_label">Rating</label>
          </div>
          <div className="col text-right">
            <button className="clr_btn" onClick={clearRatingChange}>
              Clear
            </button>
          </div>
        </div>
        <FormControl style={{width: "100%"}}>
          {ratingOptions.map((rating, key) => {
            const checked = !!scoresFilter.some((d: any) => d == rating.value);
            return (
              <FormControlLabel
                key={key}
                control={<Checkbox checked={checked} onChange={handleRatingChange} name="rating" />}
                label={<Stars whole={Number(rating.value)} half={0} empty={5 - Number(rating.value)} />}
                value={rating.value}
              />
            );
          })}
        </FormControl>

        <div className="break_line"></div>
        <div className="row">
          <div className="col">
            <label className="filter_label">Industries</label>
          </div>
          <div className="col text-right">
            <button className="clr_btn" onClick={handleIndustryChange}>
              Clear
            </button>
          </div>
        </div>
        <FormControl style={{width: "100%"}}>
          <div className={showAllIndustries ? "p_min_height" : ""}>
            {industries.map((industry: any, key: any) => {
              const checked = !!currentFilters.industries.some((d: any) => d == industry.name);
              return (
                <div className="w-100" key={key}>
                  <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleIndustryChange} name="industry" />}
                    label={`${industry.name} (${industry.count})`}
                    value={industry.name}
                  />
                </div>
              );
            })}
          </div>
        </FormControl>
        {industries.length > 5 ? (
          <div>
            <button className="show_all_btn" onClick={() => setShowAllIndustries(!showAllIndustries)}>
              {showAllIndustries ? "See all" : "See less"}
            </button>
          </div>
        ) : null}

        <div className="break_line"></div>
        <div className="row">
          <div className="col">
            <label className="filter_label">Proficiencies</label>
          </div>
          <div className="col text-right">
            <button className="clr_btn" onClick={clearProficiencyChange}>
              Clear
            </button>
          </div>
        </div>

        <FormControl style={{width: "100%"}}>
          <div className={showAllProficiencies ? "p_min_height" : ""}>
            {proficiencies.map((proficiency: any, key: any) => {
              const checked = !!currentFilters.proficiencies.some((d: any) => d === proficiency.name);
              return (
                <div className="w-100" key={key}>
                  <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleProficiencyChange} name="proficiency" />}
                    label={`${proficiency.name} (${proficiency.count})`}
                    value={proficiency.name}
                  />
                </div>
              );
            })}
          </div>
        </FormControl>
        {proficiencies.length > 5 ? (
          <div>
            <button className="show_all_btn" onClick={() => setShowAllProficiencies(!showAllProficiencies)}>
              {showAllProficiencies ? "See all" : "See less"}
            </button>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  companies: state.companies.searchResponse,
  companiesData: state.companies.companiesData,
  query: state.companies.query,
  location: state.companies.location,
  distance: state.companies.distance,
  page: state.companies.nextPage,
  activePage: state.companies.activePage,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
