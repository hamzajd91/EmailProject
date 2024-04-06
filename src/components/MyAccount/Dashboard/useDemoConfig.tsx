import React, {Component} from "react";
import moment from "moment";
import appApi from "../../../services/appApi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {Chart} from "react-google-charts";
import {Loader} from "../../Loader";

class Dashboard extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      isView: false,
      selection: {
        startDate: moment()
          .startOf("week")
          .toDate(),
        endDate: moment()
          .endOf("week")
          .toDate(),
        key: "selection",
      },
    };
  }

  async componentDidMount() {
    this.generateReport();
  }

  generateReport = async () => {
    const ranges = this.enumerateDaysBetweenDates(
      moment()
        .subtract(10, "days")
        .toDate(),
      moment()
        .add(2, "days")
        .toDate()
    );
    const {data} = await appApi.get("/analytics/data");

    const companies = data.selected_companies.reduce((pV: any, cV: any) => {
      const _uCompany = data.userCompanies.find((_c: any) => _c.id == cV);
      pV.push(_uCompany.name.toString());
      return pV;
    }, []);

    const graphData: any = [];

    if (data.view.length === 0) {
      ranges.forEach((_date: any) => {
        const dataArray: any = [];
        dataArray.push(_date);
        companies.forEach(() => {
          dataArray.push(0);
        });
        graphData.push(dataArray);
      });
    } else {
      this.setState({
        isView: true,
      });
      ranges.forEach((_date: any) => {
        const dataArray: any = [];
        dataArray.push(_date);
        data.selected_companies.forEach((company: any) => {
          const companyData = data.view.find((_data: any) => _data.id == company);
          if (companyData) {
            const _d = companyData.data.find((_c: any) => _c.date == _date);
            if (_d) {
              dataArray.push(_d.count);
            } else {
              dataArray.push(0);
            }
          }
        });
        graphData.push(dataArray);
      });
    }

    this.setState({
      data: [["Date", ...companies], ...graphData],
    });
  };

  enumerateDaysBetweenDates = (startDate: Date, endDate: Date) => {
    const dates = [];
    const currDate = moment(startDate).startOf("day");
    const lastDate = moment(endDate).startOf("day");

    while (currDate.add(1, "days").diff(lastDate) < 0) {
      dates.push(currDate.clone().format("YYYY-MM-DD"));
    }

    return dates;
  };

  render() {
    const {data, isView} = this.state;

    return (
      <React.Fragment>
        <div className="card_box">
          {/* <DateRangePicker
            onChange={(item: any) => {
              this.setState({
                selection: item.selection,
              });
            }}
            maxDate={new Date()}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={[this.state.selection]}
            direction="horizontal"
            inputRanges={[]}
            onShownDateChange={dates => {
              console.log(dates);
            }}
          /> */}
          <div
            style={{
              width: `100%`,
              height: `500px`,
            }}
          >
            <Chart
              width={"100%"}
              height={500}
              chartType="LineChart"
              loader={<Loader />}
              legendToggle
              data={data}
              options={{
                intervals: {style: "sticks"},
                vAxis: {
                  minValue: 0,
                  title: "Total number of times the company profile appears in a search result",
                  viewWindow: {min: 0, max: !isView ? 2 : undefined},
                },
                hAxis: {minValue: 0, title: "Date", viewWindow: {min: 0}},
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
