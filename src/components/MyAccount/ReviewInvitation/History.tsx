import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import appApi from "../../../services/appApi";
import moment from "moment";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExcelExport from "./ExcelExport";
import {Helmet} from "react-helmet";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import {enUS} from "date-fns/locale";
import {DatePicker} from "react-nice-dates";
import "react-nice-dates/build/style.css";

interface Data {
  customer_email: string;
  customer_name: string;
  companyName: string;
  status: string;
  createdAt: string;
}

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  hideSortIcon: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {id: "customer_email", numeric: false, hideSortIcon: true, disablePadding: false, label: "Customer email"},
  {id: "customer_name", numeric: true, hideSortIcon: false, disablePadding: false, label: "Customer name"},
  {id: "companyName", numeric: true, hideSortIcon: false, disablePadding: false, label: "Company"},
  {id: "status", numeric: true, hideSortIcon: true, disablePadding: false, label: "Status"},
  {id: "createdAt", numeric: true, hideSortIcon: false, disablePadding: false, label: "Created"},
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;

  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => {
          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.hideSortIcon ? (
                <>{headCell.label}</>
              ) : (
                <TableSortLabel
                  hideSortIcon={headCell.hideSortIcon}
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("desc");
  const [isLoading, setIsLoading] = React.useState(true);

  const [orderBy, setOrderBy] = React.useState<keyof Data>("createdAt");
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [allCompanies, setAllCompanies] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const [date, setDate] = React.useState();
  const [company, setCompany] = React.useState("");

  React.useEffect(() => {
    const filter = {
      company,
      date,
    };
    getData(page, orderBy, order, filter);
    getCompaniesList();
  }, []);

  const getCompaniesList = async () => {
    const response = await appApi.get("/users/claimed/companies");
    setAllCompanies(response.data);
  };

  const getData = async (page: number, orderBy: string, order: string, filter: any) => {
    page = page + 1;
    const date = filter.date ? moment(filter.date).format("YYYY-MM-DD HH:mm:ss.SSS[Z]") : "";
    setIsLoading(true);
    const response = await appApi.get(
      `/users/get/review/invitations?page=${page}&date=${date}&company=${filter.company}&order[]=${orderBy}&order[]=${order}`
    );
    setData(response.data.data);
    setPage(response.data.page - 1);
    setTotal(response.data.total);
    setIsLoading(false);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    const filter = {
      company,
      date,
    };
    getData(page, property, isAsc ? "desc" : "asc", filter);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    const filter = {
      company,
      date,
    };
    getData(newPage, orderBy, order, filter);
  };

  const changeDate = (date: any) => {
    setDate(date);
    const filter = {
      company,
      date: date,
    };
    getData(page, orderBy, order, filter);
  };

  const handleCompanyChange = (e: any) => {
    setCompany(e.target.value);
    const filter = {
      company: e.target.value,
      date,
    };
    setPage(0);
    getData(0, orderBy, order, filter);
  };

  return (
    <div className="mt-5 mb-5">
      <Helmet>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <title>Invitations History</title>
        <meta name="title" content={`Invitations History`} />
      </Helmet>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className="p-4 d-flex border-bottom align-items-center">
            <h5 className="mb-0">Invitations History</h5>
            <ExcelExport />
          </div>
          <div className="p-4 border-bottom">
            <div className="row">
              <div className="col-md-4 mb-sm-3 mb-md-0">
                <DatePicker date={date} maximumDate={new Date()} onDateChange={(date: any) => changeDate(date)} locale={enUS}>
                  {({inputProps}) => {
                    return <TextField label="Date" className="w-100" variant="outlined" {...inputProps} />;
                  }}
                </DatePicker>
              </div>
              <div className="col-md-4">
                <TextField
                  select
                  label="Company"
                  className="w-100"
                  SelectProps={{MenuProps: {disableScrollLock: true}}}
                  value={company}
                  onChange={handleCompanyChange}
                  variant="outlined"
                >
                  <MenuItem value="">All</MenuItem>
                  {allCompanies.map((_company: any, index: number) => {
                    return (
                      <MenuItem key={index} value={_company.companyId}>
                        {_company.companyName}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </div>
            </div>
          </div>
          <TableContainer>
            {isLoading ? <LinearProgress /> : null}

            <Table className={classes.table} aria-labelledby="tableTitle" size={"medium"} aria-label="enhanced table">
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={total}
              />
              <TableBody>
                {data.map((row: any, index: number) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.customer_email}
                      </TableCell>
                      <TableCell align="right">{row.customer_name}</TableCell>
                      <TableCell align="right">{row.companyName}</TableCell>
                      <TableCell align="right">
                        {row.status == "success" && <span className="badge badge-success">Success</span>}
                        {row.status == "failed" && <span className="badge badge-danger">Failed</span>}
                        {row.status == "pending" && <span className="badge badge-warning">pending</span>}
                      </TableCell>
                      <TableCell align="right">{moment(row.createdAt).format("DD-MM-YYYY")}</TableCell>
                    </TableRow>
                  );
                })}
                {isLoading && data.length == 0 ? (
                  <TableRow style={{height: 100}}>
                    <TableCell colSpan={5} />
                  </TableRow>
                ) : null}

                {data.length == 0 && !isLoading ? (
                  <TableRow style={{height: 100}}>
                    <TableCell align="center" colSpan={5}>
                      <svg width="130" height="80" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient x1="52.348%" y1="74.611%" x2="52.348%" y2="-17.635%" id="a">
                            <stop stopColor="#DEDEDE" stopOpacity="0" offset="0%" />
                            <stop stopColor="#A9A9A9" stopOpacity=".3" offset="100%" />
                          </linearGradient>
                          <linearGradient x1="44.79%" y1="100%" x2="44.79%" y2="0%" id="b">
                            <stop stopColor="#FFF" stopOpacity="0" offset="0%" />
                            <stop stopColor="#96A1C5" stopOpacity=".373" offset="100%" />
                          </linearGradient>
                          <linearGradient x1="50%" y1="100%" x2="50%" y2="-19.675%" id="c">
                            <stop stopColor="#FFF" stopOpacity="0" offset="0%" />
                            <stop stopColor="#919191" stopOpacity=".15" offset="100%" />
                          </linearGradient>
                          <linearGradient x1="50%" y1="0%" x2="50%" y2="44.95%" id="d">
                            <stop stopColor="#5389F5" offset="0%" />
                            <stop stopColor="#416FDC" offset="100%" />
                          </linearGradient>
                          <linearGradient x1="63.345%" y1="100%" x2="63.345%" y2="-5.316%" id="e">
                            <stop stopColor="#DCE9FF" offset="0%" />
                            <stop stopColor="#B6CFFF" offset="100%" />
                          </linearGradient>
                          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="f">
                            <stop stopColor="#7CA5F7" offset="0%" />
                            <stop stopColor="#C4D6FC" offset="100%" />
                          </linearGradient>
                        </defs>
                        <g transform="translate(-1.866 .364)" fill="none" fillRule="evenodd">
                          <path
                            d="M27.94 14.864c1.326-4.192 2.56-6.802 3.7-7.831 3.157-2.848 7.522-1.298 8.45-1.076 3.26.782 2.2-4.364 4.997-5.41 1.864-.697 3.397.155 4.6 2.556C50.752.863 52.375-.163 54.556.02c3.272.277 4.417 11.328 8.913 8.909 4.497-2.42 10.01-2.973 12.365.623.509.778.704-.429 4.166-4.55C83.462.88 86.914-.936 93.996 1.464c3.22 1.09 5.868 4.045 7.947 8.864 0 6.878 5.06 10.95 15.178 12.213 15.179 1.895 3.397 18.214-15.178 22.993-18.576 4.78-61.343 7.36-84.551-4.716C1.92 32.769 5.436 24.117 27.939 14.864z"
                            fill="url(#a)"
                            opacity=".8"
                          />
                          <ellipse fill="url(#b)" cx="66" cy="69.166" rx="27.987" ry="6.478" />
                          <path
                            d="M113.25 77.249c-21.043 5.278-92.87-.759-100.515-3.516-3.721-1.343-7.075-3.868-10.061-7.576a2.822 2.822 0 0 1 2.198-4.593h125.514c2.605 6.938-3.107 12.166-17.136 15.685z"
                            fill="url(#c)"
                            opacity=".675"
                          />
                          <g fillRule="nonzero">
                            <path
                              d="M43.396 12.098L33.825.906a2.434 2.434 0 0 0-1.837-.86h-20.58c-.706 0-1.377.324-1.837.86L0 12.098v6.144h43.396v-6.144z"
                              fill="url(#d)"
                              transform="translate(44.08 39.707)"
                            />
                            <path
                              d="M40.684 18.468L32.307 8.72a2.136 2.136 0 0 0-1.622-.725H12.711c-.617 0-1.22.256-1.622.725l-8.377 9.748v5.354h37.972v-5.354z"
                              fill="url(#e)"
                              transform="translate(44.08 39.707)"
                            />
                            <path
                              d="M43.396 25.283c0 .853-.384 1.62-.99 2.134l-.123.1a2.758 2.758 0 0 1-1.67.56H2.784c-.342 0-.669-.062-.971-.176l-.15-.06A2.802 2.802 0 0 1 0 25.282V12.165h10.529c1.163 0 2.1.957 2.1 2.118v.015c0 1.162.948 2.099 2.111 2.099h13.916a2.113 2.113 0 0 0 2.111-2.107c0-1.166.938-2.125 2.1-2.125h10.53z"
                              fill="url(#f)"
                              transform="translate(44.08 39.707)"
                            />
                          </g>
                        </g>
                      </svg>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
          {data.length == 0 ? null : (
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={total}
              rowsPerPage={10}
              page={page}
              onChangePage={handleChangePage}
            />
          )}
        </Paper>
      </div>
    </div>
  );
}
