import React, {Component, useState} from "react";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Formik} from "formik";
import {Dispatch} from "redux";
import {Link} from "react-router-dom";
import {Form as BootstrapForm} from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import {setCustomerForReview} from "../../../../store/ducks/review_invitaions/actions";
import {ApplicationState} from "../../../../store";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "../index.scss";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Validation schema
const validation_Schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email address.")
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
});

class CreateCustomerList extends Component<any, any> {
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

  handleEmailAndName = ({values, setErrors, setSubmitting, resetForm}: any) => {
    const {
      review_invitaions: {customers},
    } = this.props;
    const customer = customers.find((customer: any) => customer.email == values.email);
    if (customer) {
      setErrors({email: "Email address already exists."});
    } else {
      if (customers.length == 100) {
        this.setState({
          snackbar: true,
          snackbar_varient: "error",
          snackbar_message: "You can not invite 100 more than 100 customers.",
        });
      } else {
        customers.push(values);
        this.props.setCustomerForReview(customers);
        this.setState({
          form_data: {
            email: "",
            name: "",
          },
        });
        resetForm();
      }
    }
  };

  removeCustommer = (index: any) => {
    const {
      review_invitaions: {customers},
    } = this.props;
    // let new_customer = customers.filter((customer: any) => customer.index != index);
    customers.splice(index, 1);
    this.props.setCustomerForReview(customers);
  };

  clearAllData = () => {
    this.props.setCustomerForReview([]);
  };

  continueToNext = () => {
    const {
      review_invitaions: {customers},
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

  handleSnackBar = () => {
    this.setState({
      snackbar: false,
    });
  };

  render() {
    const {form_data, snackbar, snackbar_message, snackbar_varient} = this.state;
    const {review_invitaions} = this.props;
    const {companyId} = this.props.match.params;

    return (
      <>
        <Snackbar open={snackbar} autoHideDuration={6000} onClose={this.handleSnackBar}>
          <Alert onClose={this.handleSnackBar} severity={snackbar_varient}>
            {snackbar_message}
          </Alert>
        </Snackbar>
        <h4 className="mb-2">
          <b>Type in your customer information</b>
        </h4>
        <p className="mb-4">
          <small>
            Add your customers one by one. Simply type in the relevant information: names, email addresses, and when
            you're all set, hit the ‘Add' button. You can also import a csv file by clicking on 'Import CSV’ button
            below.
          </small>
        </p>

        <div className="row">
          <div className="col-md-12 mb-3">
            <Formik
              initialValues={form_data}
              enableReinitialize={true}
              validationSchema={validation_Schema}
              onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
                this.handleEmailAndName({values, setErrors, setSubmitting, resetForm});
              }}
            >
              {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => {
                return (
                  <form onSubmit={handleSubmit} className="form_main">
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr className="table-active">
                          <th>Email</th>
                          <th>Name</th>
                          <th></th>
                          <th>Error</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <BootstrapForm.Group className="m-0">
                              <BootstrapForm.Control
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                              />
                              {errors.email && touched.email ? (
                                <BootstrapForm.Text className="text-danger">{errors.email}</BootstrapForm.Text>
                              ) : null}
                            </BootstrapForm.Group>
                          </td>
                          <td>
                            <BootstrapForm.Group className="m-0">
                              <BootstrapForm.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={values.name}
                                onChange={handleChange}
                              />
                              {errors.name && touched.name ? (
                                <BootstrapForm.Text className="text-danger">{errors.name}</BootstrapForm.Text>
                              ) : null}
                            </BootstrapForm.Group>
                          </td>
                          <td className="text-center">
                            <button type="submit" className="btn btn-primary">
                              Add
                            </button>
                          </td>
                          <td></td>
                        </tr>

                        {review_invitaions.customers.map((customer: any, index: number) => {
                          const _customer: any = {
                            ...customer,
                            index: index,
                          };

                          return (
                            <SingleCustomer
                              setCustomerForReview={this.props.setCustomerForReview}
                              removeCustommer={this.removeCustommer}
                              key={index}
                              allCustomers={review_invitaions.customers}
                              customer={_customer}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Link className="btn btn-light m-1" to="/user/companies">
              Back
            </Link>
            <Link to={`/user/reviews/${companyId}/invitation/csv`} className="btn btn-primary m-1">
              Import CSV
            </Link>

            {review_invitaions.customers.length > 0 && (
              <>
                <button type="button" className="btn btn-danger m-1" onClick={() => this.clearAllData()}>
                  Clear all data
                </button>
                <button type="button" onClick={() => this.continueToNext()} className="btn btn-primary">
                  Continue
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

function SingleCustomer(props: any) {
  const {customer, allCustomers, setCustomerForReview} = props;

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
      // const customerIndex = allCustomers.findIndex((_customer: any) => _customer.index == singleCustomer.index);
      allCustomers[singleCustomer.index] = {...singleCustomer, customers_errors: customers_errors};
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
            <CheckIcon style={{fill: "#fff"}} />
          </button>
        ) : (
          <button type="button" className="btn btn-primary btn-sm m-1" onClick={() => setIsEdit(true)}>
            <EditIcon style={{fill: "#fff"}} />
          </button>
        )}
        <button
          type="button"
          className="btn btn-danger btn-sm m-1"
          onClick={() => props.removeCustommer(singleCustomer.index)}
        >
          <DeleteOutlineIcon style={{fill: "#fff"}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerList);
