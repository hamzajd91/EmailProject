import React from "react";
// Material Ui Components
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import {Checkbox} from "@material-ui/core";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {Col, Row, Container} from "react-bootstrap";
import filterObject from "../../../interfaces/filterObject";
import ratingOptions from "../../../data/ratingOptions";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

// Redux Related imports
import * as actions from "../../../store/ducks/companies/actions";
import {ApplicationState} from "../../../store";
import "./index.scss";
interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

// theme Style Material
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    panelHead: {
      boxShadow: "none",
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  })
);

const Filters = (props: any) => {
  let industries = [];
  const {companies, distance} = props;

  if (companies.filters) {
    // eslint-disable-next-line prefer-destructuring
    industries = companies.filters.industries;
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
  const classes = useStyles();

  const handleRatingChange = (e: any) => {
    const params = {
      query: props.query,
      location: props.location,
      distance: props.distance,
      filters,
      sortFilters: sort,
    };

    filters.s = e.target.value;
    params.filters = filters;
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

  const handleIndustryChange = (e: any) => {
    const params = {
      query: props.query,
      location: props.location,
      distance: props.distance,
      filters,
      sortFilters: sort,
    };
    filters.i = e.target.value;
    // eslint-disable-next-line no-self-assign
    filters = filters;
    props.loadMore(params);
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
      {props.companiesData.length > 0 && (
        <div className="result_filter">
          <Container>
            <Row>
              <Col md={4}>
                <FormControl style={{width: "100%"}}>
                  <label>Distance</label>
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
                    <button type="button" onClick={clearDistance}>
                      clear
                    </button>
                    <p id="distance_label">Show companies up to {distance} miles away</p>
                  </div>
                </FormControl>
              </Col>
              <Col md={4}>
                <FormControl style={{width: "100%"}}>
                  <InputLabel>Rating</InputLabel>
                  <Select
                    multiple
                    value={scoresFilter}
                    onChange={handleRatingChange}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    input={<Input />}
                    renderValue={(selected: any) => {
                      return (
                        <div className={classes.chips}>
                          {selected.map((value: any) => (
                            <Chip
                              className={classes.chip}
                              key={value}
                              label={(ratingOptions.find((o: any) => o.value === value) as any).label}
                            />
                          ))}
                        </div>
                      );
                    }}
                  >
                    {ratingOptions.map((rating, key) => {
                      return (
                        <MenuItem key={key.toString()} value={rating.value}>
                          <Checkbox checked={scoresFilter.indexOf(rating.value) > -1} />
                          <ListItemText primary={rating.label} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <div className="clear_filter">
                    <button type="button" onClick={clearRatingChange}>
                      clear
                    </button>
                  </div>
                </FormControl>
              </Col>
              <Col md={4}>
                <FormControl style={{width: "100%"}}>
                  <InputLabel id="Industries_Multiple">Industries</InputLabel>
                  <Select
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    multiple
                    value={currentFilters ? currentFilters.industries : []}
                    onChange={handleIndustryChange}
                    input={<Input id="select-multiple-chip-2" />}
                    renderValue={(selected: any) => {
                      return (
                        <div className={classes.chips}>
                          {selected.map((value: any) => {
                            return <Chip className={classes.chip} key={value} label={value} />;
                          })}
                        </div>
                      );
                    }}
                  >
                    {industries.map((industry: any, key: any) => {
                      const checked = !!currentFilters.industries.some((d: any) => d === industry.name);
                      return (
                        <MenuItem key={key.toString()} value={industry.name}>
                          <Checkbox checked={checked} />
                          <ListItemText primary={`${industry.name} ( ${industry.count}  )`} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <div className="clear_filter">
                    <button type="button" onClick={handleIndustryChange}>
                      clear
                    </button>
                  </div>
                </FormControl>
              </Col>
            </Row>
          </Container>
        </div>
      )}
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
