import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Stars from "./Components/Stars";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import default_company from "../../images/default/default_company.png";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import DialogActions from "@material-ui/core/DialogActions";
import * as Yup from "yup";
import {Formik} from "formik";
import Pagination from "react-js-pagination";

const companySchema = Yup.object().shape({
  companies: Yup.string().required("Please select at least one company for contact."),
});

interface ConfirmationDialogRawProps {
  classes: Record<"paper", string>;
  open: boolean;
  company_name: string;
  currentPage: number;
  companies: any;
  totalItemsCount: any;
  onClose: () => void;
  handleMultipleCompany: (data: any) => void;
  handleRequestProposal: (data: any) => void;
  handleSuggestionsCompanyList: (data: any) => void;
}

const useModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        padding: "0 0 15px 0",
        margin: "0 0 15px 0",
        width: "100%",
      },
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

const CompanyListModal = (props: ConfirmationDialogRawProps) => {
  const classes = useModalStyles();
  const {
    handleRequestProposal,
    handleMultipleCompany,
    handleSuggestionsCompanyList,
    totalItemsCount,
    currentPage,
  } = props;
  const {onClose, open} = props;

  function handlePageChange(pageNumber: number) {
    handleSuggestionsCompanyList(pageNumber);
  }

  return (
    <Dialog maxWidth="sm" fullWidth={true} open={open}>
      <DialogTitle>
        {props.company_name} Alternatives
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Formik
        initialValues={{
          companies: [],
        }}
        validationSchema={companySchema}
        enableReinitialize={true}
        onSubmit={(values: any, {setErrors, setSubmitting}) => {
          handleMultipleCompany({values, setErrors, setSubmitting});
        }}
      >
        {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => (
          <form onSubmit={handleSubmit} className="form_main">
            <DialogContent dividers>
              <p className="mb-0">
                {props.company_name} is not able to receive your request. Consider one of the similar solution below.
              </p>
              <small>
                By clicking Contact, I agree and understand that my information will be sent to that seller.
              </small>
              {props.companies.map((company: any, index: number) => {
                return (
                  <SingleContactCompany
                    key={index}
                    {...company}
                    handleChange={handleChange}
                    handleRequestProposal={handleRequestProposal}
                  />
                );
              })}
              {errors.companies && touched.companies ? (
                <small className="text-danger form-text">{errors.companies}</small>
              ) : null}
            </DialogContent>
            <div className="w-100 pt-3 d-inline-block modal_pagination text-left">
              <Pagination
                hideFirstLastPages={true}
                activePage={currentPage}
                totalItemsCount={totalItemsCount || 0}
                itemsCountPerPage={10}
                pageRangeDisplayed={5}
                // prevPageText={<ChevronLeftIcon />}
                // nextPageText={<ChevronRightIcon />}
                // lastPageText="LAST"
                // firstPageText="FIRST"
                itemClass="page-item"
                hideDisabled
                linkClass="page-link"
                onChange={handlePageChange}
              />
            </div>
            <DialogActions className="text-left">
              <div className="text-left w-100">
                <button type="submit" className="contact_btn">
                  Contact
                </button>
              </div>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

const SingleContactCompany = (props: any) => {
  const overall = parseFloat(props.overall);
  const whole = Math.floor(overall);
  const half = Number((overall % whole).toFixed(1)) >= 0.4;
  const empty = 5 - whole - (half ? 1 : 0);
  const {handleRequestProposal} = props;
  return (
    <div className="company_box d-flex align-items-center">
      <Checkbox
        value={props.company_id}
        name="companies"
        onChange={props.handleChange}
        inputProps={{"aria-label": "primary checkbox"}}
      />
      <div className="company_img">{props.icon ? <img src={props.icon} /> : <img src={default_company} />}</div>
      <div className="company_info">
        <h3>{props.company_name}</h3>
        <span className="actual_rating">{props.overall}</span>
        <Stars whole={whole} half={half} empty={empty} /> ({props.reviews})
      </div>
      <button className="contact_btn" type="button" onClick={() => handleRequestProposal(props.company_id)}>
        Contact
      </button>
    </div>
  );
};

export default CompanyListModal;
