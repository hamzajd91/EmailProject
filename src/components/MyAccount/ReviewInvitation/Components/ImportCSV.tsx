import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Form as BootstrapForm } from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { setCustomerForReview } from "../../../../store/ducks/review_invitaions/actions";
import { ApplicationState } from "../../../../store";
import { CSVReader } from "react-papaparse";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import "./../index.scss";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const buttonRef: any = React.createRef();

class ImportCSV extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      snackbar: false,
      snackbar_varient: "",
      snackbar_message: "",
      form_data: {
        email: "",
        name: "",
      },
    };
  }

  removeCustommer = (index: any) => {
    const {
      review_invitaions: { customers },
    } = this.props;
    customers.splice(index, 1);
    // let new_customer = customers.filter((customer: any) => customer.index != index);
    this.props.setCustomerForReview(customers);
  };

  handleOpenDialog = (e: any) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data: any, file: any) => {
    if (file.name.split(".").pop() == "csv") {
      let customers: any = [];

      for (const [i, ct] of data.entries()) {
        if (i == 0) {
          continue;
        }

        // Skip black entry...
        if (ct.data[0] == "" || ct.data[0].length == 0) {
          continue;
        }

        if (customers.length == 100) {
          this.setState({
            snackbar: true,
            snackbar_varient: "error",
            snackbar_message:
              "There is a limit of 100 records that you can send.  we’ve truncated the list to the first 100 records.",
          });
          break;
        }
        let customers_errors: any = [];

        if (isEmpty(ct.data[0] || "")) {
          customers_errors.push("Email address is required.");
        }

        if (!isEmpty(ct.data[0] || "") && !isEmail(ct.data[0] || "")) {
          customers_errors.push("Email address not valid.");
        }

        if (isEmpty(ct.data[1] || "")) {
          customers_errors.push("Name is required.");
        }

        const customer = customers.find((_customer: any) => _customer.email == ct.data[0]);

        if (!customer) {
          customers.push({
            email: ct.data[0] || "",
            name: ct.data[1] || "",
            customers_errors: customers_errors,
          });
        }
      }
      this.props.setCustomerForReview(customers);
    } else {
      this.setState({
        snackbar: true,
        snackbar_varient: "error",
        snackbar_message: "There was an error processing your file. Please check your file and try again.",
      });
    }
  };

  handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    this.setState({
      snackbar: true,
      snackbar_varient: "error",
      snackbar_message: "There was an error processing your file. Please check your file and try again.",
    });
  };

  clearAllData = () => {
    this.props.setCustomerForReview([]);
  };

  handleSnackBar = () => {
    this.setState({
      snackbar: false,
    });
  };

  continueToNext = () => {
    const {
      review_invitaions: { customers },
    } = this.props;

    const customerIndex = customers.findIndex(
      (_customer: any) => _customer.customers_errors && _customer.customers_errors.length != 0
    );

    if (customerIndex < 0) {
      this.props.nextStep();
    } else {
      this.setState({
        snackbar: true,
        snackbar_varient: "error",
        snackbar_message: "Please fix above issues and try again.",
      });
    }
  };

  render() {
    const { snackbar, snackbar_message, snackbar_varient } = this.state;
    const { review_invitaions, companyInfo } = this.props;

    return (
      <>
        <Snackbar open={snackbar} autoHideDuration={6000} onClose={this.handleSnackBar}>
          <Alert onClose={this.handleSnackBar} severity={snackbar_varient}>
            {snackbar_message}
          </Alert>
        </Snackbar>
        <h4 className="mb-2">
          <b>Import customers from csv</b>
        </h4>
        <p className="mb-2">
          Please format your csv with 2 columns: (1) email address, (2) name. Make sure the first row is used as the
          column description. We will import the record starting from the second row.
        </p>
        <div className="row mb-2">
          <div className="col">
            <div className="import_btn">
              <CSVReader
                ref={buttonRef}
                onFileLoad={this.handleOnFileLoad}
                onError={this.handleOnError}
                noClick
                noDrag
                noProgressBar={true}
              >
                {({ file }: any) => (
                  <button type="button" onClick={this.handleOpenDialog} className="btn btn-primary m-1">
                    Import CSV
                  </button>
                )}
              </CSVReader>
            </div>
            {review_invitaions.customers.length > 0 && (
              <button type="button" className="btn btn-danger m-1" onClick={() => this.clearAllData()}>
                Clear all data
              </button>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <table className="table table-hover table-bordered">
              <thead>
                <tr className="table-active">
                  <th>Email</th>
                  <th>Name</th>
                  <th></th>
                  <th>Errors</th>
                </tr>
              </thead>
              <tbody>
                {review_invitaions.customers &&
                  review_invitaions.customers.map((customer: any, index: number) => {
                    const _customer = {
                      ...customer,
                      index,
                    };
                    return (
                      <SingleCustomer
                        setCustomerForReview={this.props.setCustomerForReview}
                        key={index}
                        allCustomers={review_invitaions.customers}
                        removeCustommer={this.removeCustommer}
                        customer={_customer}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
          {review_invitaions.customers && review_invitaions.customers.length > 0 ? (
            <div className="col-12 mb-3">
              <small>
                <b>Note : </b> If the preview looks correct, please click Continue.
              </small>
            </div>
          ) : null}

          <div className="col-12">
            <Link to={`/user/reviews/${companyInfo.companyId}/invitation/send`} className="btn btn-primary m-1">
              Back
            </Link>
            {review_invitaions.customers && review_invitaions.customers.length > 0 ? (
              <button type="button" className="btn btn-primary m-1" onClick={() => this.continueToNext()}>
                Continue
              </button>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

function SingleCustomer(props: any) {
  const { customer, allCustomers, setCustomerForReview } = props;

  const [singleCustomer, setSingleCustomer]: any = useState(customer);
  const [isEdit, setIsEdit] = useState(false);

  function handleChange(e: any, index: any) {
    setSingleCustomer({
      ...singleCustomer,
      [e.target.name]: e.target.value,
    });
  }

  function checkEmailAndName() {
    let customers_errors: any = [];
    if (isEmpty(singleCustomer.email || "")) {
      customers_errors.push("Email address is required.");
    }

    if (!isEmail(singleCustomer.email || "")) {
      customers_errors.push("Email address not valid.");
    }

    if (isEmpty(singleCustomer.name || "")) {
      customers_errors.push("Name is required.");
    }

    setSingleCustomer({
      ...singleCustomer,
      customers_errors: customers_errors,
    });

    if (customers_errors.length === 0) {
      const customer = allCustomers.findIndex(
        (_customer: any, index: number) => _customer.email == singleCustomer.email && index != singleCustomer.index
      );

      if (customer >= 0) {
        customers_errors.push(["Email address alredy exist."]);
      }

      setSingleCustomer({
        ...singleCustomer,
        customers_errors: customers_errors,
      });

      // const customerIndex = allCustomers.findIndex(
      //   (_customer: any, index: number) => _customer.index == singleCustomer.index
      // );

      allCustomers[singleCustomer.index] = { ...singleCustomer, customers_errors: customers_errors };
      setCustomerForReview(allCustomers);
    } else {
      // const customerIndex = allCustomers.findIndex((_customer: any) => _customer.index == singleCustomer.index);
      allCustomers[singleCustomer.index] = {
        ...singleCustomer,
        customers_errors: customers_errors,
      };
      setCustomerForReview(allCustomers);
    }
    setIsEdit(false);
  }

  return (
    <tr>
      <td className="align-middle">
        {isEdit ? (
          <BootstrapForm.Control
            type="text"
            name="email"
            placeholder="Email"
            value={singleCustomer.email}
            onChange={(e: any) => handleChange(e, singleCustomer.index)}
          />
        ) : (
          singleCustomer.email
        )}
      </td>
      <td className="align-middle">
        {isEdit ? (
          <BootstrapForm.Control
            type="text"
            name="name"
            placeholder="Name"
            value={singleCustomer.name}
            onChange={(e: any) => handleChange(e, singleCustomer.index)}
          />
        ) : (
          singleCustomer.name
        )}
      </td>
      <td className="align-middle text-center">
        {isEdit ? (
          <button type="button" className="btn btn-primary btn-sm m-1" onClick={() => checkEmailAndName()}>
            <CheckIcon style={{ fill: "#fff" }} />
          </button>
        ) : (
          <button type="button" className="btn btn-primary btn-sm m-1" onClick={() => setIsEdit(true)}>
            <EditIcon style={{ fill: "#fff" }} />
          </button>
        )}
        <button
          type="button"
          className="btn btn-danger btn-sm m-1"
          onClick={() => props.removeCustommer(singleCustomer.index)}
        >
          <DeleteOutlineIcon style={{ fill: "#fff" }} />
        </button>
      </td>
      <td className="align-middle">
        {singleCustomer.customers_errors && singleCustomer.customers_errors.length > 0 ? (
          <ul className="error_customer">
            {singleCustomer.customers_errors.map((err: any, i: number) => {
              return <li key={i}>{err}</li>;
            })}
          </ul>
        ) : null}
      </td>
    </tr>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    review_invitaions: state.review_invitaions,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCustomerForReview: (params: any) => dispatch(setCustomerForReview(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportCSV);
