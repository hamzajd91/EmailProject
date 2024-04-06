import React from "react";
import Workbook from "react-xlsx-workbook";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import appApi from "../../../services/appApi";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
const excelRef: any = React.createRef();

class ExcelExport extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  setData = (data: any) => {
    this.setState(
      {
        data: data,
      },
      () => {
        excelRef.current.click();
      }
    );
  };

  render() {
    return (
      <>
        <ButtonLoader setData={this.setData} />
        <Workbook
          filename={`${moment().format("DD-MM-YYYY_h-hh")}_HINDSYGHT.xlsx`}
          element={<button className="d-none" ref={excelRef}></button>}
        >
          <Workbook.Sheet data={this.state.data} name={moment().format("DD-MM-YYYY_h-hh")}>
            <Workbook.Column label="Customer Email" value="customer_email" />
            <Workbook.Column label="Customer Name" value="customer_name" />
            <Workbook.Column label="Company Name" value="companyName" />
            {/* <Workbook.Column label="Created" value="createdAt" /> */}
          </Workbook.Sheet>
        </Workbook>
      </>
    );
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonProgress: {
      color: "#fff",
      verticalAlign: "top",
    },
  })
);

function ButtonLoader(props: any) {
  const classes = useStyles();
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const exportExcel = async () => {
    setButtonLoading(true);
    try {
      const response = await appApi.get(`/users/get/review/invitations/all`);
      props.setData(response.data);
    } catch (error) {
      props.setData([]);
    }
    setButtonLoading(false);
  };
  return (
    <button className="ml-auto btn btn-primary" disabled={buttonLoading} onClick={() => exportExcel()}>
      {buttonLoading ? (
        <CircularProgress className={classes.buttonProgress} size={24} />
      ) : (
        <svg aria-hidden="true" focusable="false" width="20px" height="20px" viewBox="0 0 24 24">
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m1.8 18H14l-2-3.4l-2 3.4H8.2l2.9-4.5L8.2 11H10l2 3.4l2-3.4h1.8l-2.9 4.5l2.9 4.5M13 9V3.5L18.5 9H13z"
            fill="#fff"
          />
        </svg>
      )}
    </button>
  );
}

export default ExcelExport;
