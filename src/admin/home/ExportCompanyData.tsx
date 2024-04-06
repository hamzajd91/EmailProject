import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';

import {
 Slider, Rail, Handles, Tracks,
} from 'react-compound-slider';

import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import { Handle, Track, TooltipRail } from './components';
import { getExportCompany, getProficiencies } from '../../store/ducks/addFirms/actions';
import { ApplicationState } from '../../store';
import Loading from '../../admin/assets/images/Loading';
import { toast } from 'react-toastify';
import Select from "react-select";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";

type Props = any;
 let dummyWorkingArray: {value: any; label: any}[] = [];
 let arrayHelpers: {value: any; label: any}[] = [];
 let subscription: {value: any; label: any}[] = [];
 let subscriptionFinal: {value: any; label: any}[] = [];

const ExportCompanyData = (props: Props) => {

  const [startPoint, setStartPoint] = useState("A");
  const [endPoint, setEndPoint] = useState("A");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [dateClaimed, setDateClaimed] = useState("");
  const [dateSubscribed, setDateSubscribed] = useState("");

  const [enddate, setendDate] = useState("");
  const [enddateClaimed, setendDateClaimed] = useState("");
  const [enddateSubscribed, setendDateSubscribed] = useState("");


  const values: number[] = [0, 0];
  const domain: number[] = [0, 26];

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map(x => String.fromCharCode(x));

  const sliderStyle: React.CSSProperties = {
    position: "relative",
    width: "80%",
    margin: "5% 5%",
  };

  useEffect(() => {
    props.getProficiencies();
    subscription.push({value: 1, label: "Free"});
    subscription.push({value: 2, label: "Basic"});
    subscription.push({value: 3, label: "Plus"});
  }, []);
  
  useEffect(() => {

    if(props.getExportCompanyData.length !== 0){
      saveAsExcel();
    }else{
      // toast.error("No data found")
    }
  }, [props.getExportCompanyData]);

  const clickOnExportCompnay = () => {
    const proficiency: {}[] = [];
    const subscri: {}[] = [];
    for (let index = 0; index < arrayHelpers.length; index++) {
      proficiency.push(arrayHelpers[index].value);
    }  
    for (let index = 0; index < subscriptionFinal.length; index++) {
      subscri.push(subscriptionFinal[index].value);
    }  
   
    props.getExportCompany(
      startPoint,
      endPoint,
      proficiency.join(","),
      subscri.join(","),
      address,
      date,
      dateClaimed,
      dateSubscribed,
      enddate,
      enddateClaimed,
      enddateSubscribed
    );
  }

  const onUpdate = (update: any) => {
    setStartPoint(alphabet[update[0]]);
    setEndPoint(alphabet[update[1]]);
  };



  const XlsxPopulate = require("xlsx-populate");

  const getSheetData = (data: any, header: any) => {
    const fields = Object.keys(data[0]);
    const sheetData = data.map((row: {[x: string]: any}) =>
      fields.map(fieldName => (row[fieldName] ? row[fieldName] : ""))
    );
    sheetData.unshift(header);
    return sheetData;
  };

  async function saveAsExcel() {
    const header = [
      "Company Name",
      "Address",
      "Phone",
      "Contact Name",
      "Contact email address",
      "Contact phone number",
      "Contact Title",
      "Subscription Type",
      "Proficiencies",
      "Date Claimed",
      "Date Subscribed",
    ];

    XlsxPopulate.fromBlankAsync().then(async (workbook: any) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(props.getExportCompanyData, header);
      const totalColumns = sheetData[0].length;

      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range(`A1:${endColumn}1`).style("fill", "BFBFBF");
      range.style("border", true);
      return workbook.outputAsync().then((res: any) => {
        saveAs(res, "file.xlsx");
      });
    });
  }

  function handleEvent(event : any, picker :any) {
    setDateSubscribed(moment(picker.startDate._d).format("YYYY-DD-MM"));
    setendDateSubscribed(moment(picker.endDate._d).format("YYYY-DD-MM"));
  }
  function handleEvent1(event : any, picker :any) {
    setDateClaimed(moment(picker.startDate._d).format("YYYY-DD-MM"));
    setendDateClaimed(moment(picker.endDate._d).format("YYYY-DD-MM"));
  }
  function handleEvent2(event : any, picker :any) {
    setDate(moment(picker.startDate._d).format("YYYY-DD-MM"));
    setendDate(moment(picker.endDate._d).format("YYYY-DD-MM"));
  }

  return (
    <>
      {/* BEGIN: Content */}
      <div className="app-content content">
        {props.loading && <Loading />}
        {props.getProficienciesData.map((item: any, index: any) => {
          dummyWorkingArray.push({value: item.id, label: item.name});
        })}
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper">
          <div className="content-body">
            {/* Description  */}
            <section className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="card text-white bg-danger mb-3">
                    <div className="card-header font-medium-4">Warning</div>
                    <div className="card-body pt-1">
                      <p className="card-text">
                        Export company data will take sometime for complete. Please do not refresh your browser during
                        process. Each sheets in exported file will have 50000 records.
                      </p>
                    </div>
                  </div>

                  <div style={{height: 60, width: "100%"}}>
                    <Slider
                      mode={1}
                      step={1}
                      domain={domain}
                      rootStyle={sliderStyle}
                      onUpdate={onUpdate}
                      values={values}
                    >
                      <Rail>{railProps => <TooltipRail {...railProps} />}</Rail>
                      <Handles>
                        {({handles, activeHandleID, getHandleProps}) => (
                          <div className="slider-handles">
                            {handles.map(handle => (
                              <Handle
                                key={handle.id}
                                handle={handle}
                                domain={domain}
                                isActive={handle.id === activeHandleID}
                                getHandleProps={getHandleProps}
                              />
                            ))}
                          </div>
                        )}
                      </Handles>
                      <Tracks left={false} right={false}>
                        {({tracks, getTrackProps}) => (
                          <div className="slider-tracks">
                            {tracks.map(({id, source, target}) => (
                              <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
                            ))}
                          </div>
                        )}
                      </Tracks>
                    </Slider>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <fieldset className="mb-2">
                        <div className="my-1" id="slider-with-input" />
                        <div className="row">
                          <div className="col-xl-1 col-lg-2 col-md-3 col-12 slider-select">
                            <label className="form-control d-inline-block mt-2">{startPoint}</label>
                          </div>
                          <div className="col-xl-1 col-lg-2 col-md-3 col-12">
                            <label className="form-control d-inline-block mt-2">{endPoint}</label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Company Address (City or State)</label>
                        <div className="controls">
                          <input
                            type="text"
                            name="text"
                            onChange={e => setAddress(e.target.value)}
                            className="form-control"
                            placeholder="Company Address City"
                          />
                          <div className="help-block" />
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Proficiencies</label>
                        <Select
                          isMulti
                          options={dummyWorkingArray}
                          onChange={(e: any) => {
                            arrayHelpers = e;
                          }}
                        >
                          {/* {(props.getProficienciesData || []).map((item: any, index: any) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))} */}
                        </Select>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Subscription Type</label>
                        <Select
                          isMulti
                          options={subscription}
                          onChange={(e: any) => {
                            subscriptionFinal = e;
                          }}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Date Signed Up</label>
                        <div className="d-flex align-items-center">
                          <DateRangePicker onEvent={handleEvent2}>
                            <input
                              type="text"
                              name="value_from_start_date"
                              className="form-control"
                              data-datepicker="separateRange"
                            />
                          </DateRangePicker>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label>Date Claimed</label>
                        <div className="d-flex align-items-center">
                          <DateRangePicker onEvent={handleEvent1}>
                            <input
                              type="text"
                              name="value_from_start_date"
                              className="form-control"
                              data-datepicker="separateRange"
                            />
                          </DateRangePicker>
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="form-group">
                        <label>Date Subscribed</label>
                        <div className="d-flex align-items-center">
                          <DateRangePicker onEvent={handleEvent}>
                            <input
                              type="text"
                              name="value_from_start_date"
                              className="form-control"
                              data-datepicker="separateRange"
                            />
                          </DateRangePicker>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={clickOnExportCompnay}
                    type="button"
                    className="btn bgMain text-white waves-effect waves-light"
                  >
                    Export Company Data
                  </button>
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
  getExportCompany: (
    startPoint: "",
    endPoint: "",
    proficiencies: "",
    subscription_type: "",
    address: "",
    date: "",
    dateClaimed: "",
    dateSubscribed: "",
    enddate: "",
    enddateClaimed: "",
    enddateSubscribed: ""
  ) =>
    dispatch(
      getExportCompany(
        startPoint,
        endPoint,
        proficiencies,
        subscription_type,
        address,
        date,
        dateClaimed,
        dateSubscribed,
        enddate,
        enddateClaimed,
        enddateSubscribed
      )
    ),
  getProficiencies: (params: any) => dispatch(getProficiencies()),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.addFirms.getExportCompany; 

  return {
    loading: state.addFirms.loading,
    getExportCompanyData: state.addFirms.getExportCompany,
    getProficienciesData: state.addFirms.getProficiencies,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportCompanyData);
