import React, {Component} from "react";
import "./index.scss";
import Stars from "./Component/Stars";
import bookmark from "../../../images/account/md/bookmark.png";
import default_company from "../../../images/default/default_company.png";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import appApi from "../../../services/appApi";
import {Loader} from "../../Loader";
import {Link} from "react-router-dom";
import Dialog, {DialogProps} from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import no_bookamrks from "../../../images/account/no_bookamrks.png";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import {Formik} from "formik";
import {Helmet} from "react-helmet";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {}

interface State {
  isLoading: boolean;
  favorites: any;
  currnet_page: number;
  total_page: number;
  limit: number;
  totalFavorites: number;
  modal_state: boolean;
  modal_title?: string;
  company_id?: any;
  snackbar?: boolean;
  editModal: boolean;
  scroll: DialogProps["scroll"];
  editInfo: EditInterface;
}

interface EditInterface {
  id?: any;
  notes?: string;
  name?: string;
}

class Bookmarks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal_state: false,
      scroll: "paper",
      editModal: false,
      snackbar: false,
      isLoading: false,
      currnet_page: 1,
      total_page: 1,
      limit: 10,
      totalFavorites: 0,
      company_id: "",
      favorites: [],
      editInfo: {
        id: "",
        notes: "",
        name: "",
      },
    };
  }

  updateReview = async (e: any) => {
    const {id} = this.state.editInfo;
    const {values, setSubmitting} = e;
    try {
      await appApi.post(`/companies/${id}/favorite`, values);

      let objIndex = this.state.favorites.findIndex((obj: any) => obj.id == id);
      this.state.favorites[objIndex].notes = values.notes;

      this.setState({
        editModal: !this.state.editModal,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  handleOpenEditModal = (id: any, name: any, notes: any) => {
    this.setState({
      editModal: true,
      editInfo: {
        id,
        name,
        notes,
      },
    });
  };

  handleEditModal = () => {
    this.setState({
      editModal: false,
    });
  };

  componentDidMount() {
    const limit = this.state.limit;
    const page = this.state.currnet_page;
    this.getBookMarks(page, limit);
  }

  handleSnackBarClose = () => {
    this.setState({
      snackbar: false,
    });
  };

  getBookMarks = async (page: any, limit: any) => {
    try {
      const params = {
        limit,
        page,
      };
      this.setState({
        isLoading: true,
      });
      const response = await appApi.get("users/favoritedCompanies", {params});

      this.setState({
        isLoading: false,
        currnet_page: page,
        total_page: response.data.pages,
        totalFavorites: response.data.totalFavorites,
        favorites: this.state.favorites.concat(response.data.favorites),
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        currnet_page: page,
        total_page: this.state.total_page,
        totalFavorites: this.state.totalFavorites,
        favorites: this.state.favorites,
      });
    }
  };

  loadMoreData = () => {
    const {currnet_page, limit} = this.state;
    const page = currnet_page + 1;
    this.getBookMarks(page, limit);
  };

  handleModal = (e?: any, name?: string) => {
    console.log(e, name);
    if (!isNaN(e)) {
      this.setState({
        modal_state: !this.state.modal_state,
        modal_title: name,
        company_id: e,
      });
    } else {
      this.setState({
        modal_state: !this.state.modal_state,
        modal_title: "",
        company_id: "",
      });
    }
  };

  confirmRemove = async () => {
    try {
      const companyId: any = this.state.company_id;
      await appApi.delete(`/companies/${companyId}/favorite`);
      let favorites = this.state.favorites.filter(function(obj: any) {
        return obj.id !== companyId;
      });
      this.setState({
        modal_state: !this.state.modal_state,
        favorites: favorites,
        snackbar: true,
      });
    } catch (error) {}
  };

  render() {
    const {totalFavorites, isLoading, favorites} = this.state;
    const upperCompanyNumber = favorites.length;
    const lowerCompanyNumber = favorites.length > 0 ? 1 : 0;
    const handleModal = this.handleModal;
    const handleOpenEditModal = this.handleOpenEditModal;
    return (
      <React.Fragment>
        <Helmet>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <title>Bookmarks</title>
          <meta name="title" content={`Bookmarks`} />
        </Helmet>
        <Snackbar open={this.state.snackbar} autoHideDuration={6000} onClose={this.handleSnackBarClose}>
          <Alert onClose={this.handleSnackBarClose} severity="success">
            {this.state.modal_title} has been removed.
          </Alert>
        </Snackbar>

        <div className="pt-5 pb-5">
          {favorites.length == 0 && isLoading == false ? (
            <div className="text-center">
              <img src={no_bookamrks} style={{maxWidth: "350px", width: "100%"}} />
              <h6 className="mt-4">No Bookmarks.</h6>
            </div>
          ) : (
            <React.Fragment>
              <div className="bookmark_header">
                <div>
                  <img src={bookmark} />
                </div>
                <div className="bookmark_label">
                  <h3>Bookmarks</h3>
                  <span>
                    Viewing {lowerCompanyNumber} - {upperCompanyNumber} of {totalFavorites}{" "}
                    {totalFavorites === 1 ? "bookmark" : "bookmarks"}
                  </span>
                </div>
              </div>

              <div className="all_bookmarks">
                {favorites.map(function(company_single: any, i: number) {
                  return (
                    <React.Fragment key={i}>
                      <Bookmark
                        {...company_single}
                        onModalClick={handleModal}
                        handleOpenEditModal={handleOpenEditModal}
                      />
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="mt-0">
                {isLoading ? (
                  <Loader />
                ) : this.state.currnet_page !== this.state.total_page ? (
                  <div className="text-center">
                    <button className="company_load_more" type="button" onClick={this.loadMoreData}>
                      Load More
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </React.Fragment>
          )}
        </div>

        <Dialog
          open={this.state.modal_state}
          onClose={this.handleModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="modal_header">
            Are you sure want to <b>{this.state.modal_title}</b> remove?
          </DialogTitle>
          <DialogActions>
            <div className="modal_footer">
              <button onClick={this.confirmRemove} className="modal_remove_btn">
                Remove
              </button>
              <button onClick={this.handleModal} className="modal_cancel_btn">
                Cancel
              </button>
            </div>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.editModal}
          onClose={this.handleEditModal}
          scroll={this.state.scroll}
          fullWidth={true}
          maxWidth={`sm`}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Edit Note for {this.state.editInfo.name}.</DialogTitle>
          <Formik
            initialValues={{
              notes: this.state.editInfo.notes,
            }}
            enableReinitialize={true}
            onSubmit={(values: any, {setErrors, setSubmitting}) => {
              this.updateReview({values, setErrors, setSubmitting});
            }}
          >
            {({values, handleSubmit, handleChange, isSubmitting}) => (
              <form onSubmit={handleSubmit} className="form_main">
                <DialogContent dividers={this.state.scroll === "paper"}>
                  <TextField
                    label="Notes"
                    style={{width: "100%"}}
                    multiline
                    rows={4}
                    name="notes"
                    onChange={handleChange}
                    defaultValue={values.notes}
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions>
                  <div className="pr-3">
                    <button type="submit" disabled={isSubmitting} className="save_btn mr-3">
                      Save
                    </button>
                    <button onClick={this.handleEditModal} className="cancel_btn" type="button">
                      Cancel
                    </button>
                  </div>
                </DialogActions>
              </form>
            )}
          </Formik>
        </Dialog>
      </React.Fragment>
    );
  }
}

function Bookmark(company: any) {
  const overall = company.score ? Math.floor(company.score) : 0;
  const whole = Math.floor(overall);
  const half = Number((overall % whole).toFixed(1)) >= 0.4;
  const empty = 5 - whole - (half ? 1 : 0);
  return (
    <React.Fragment>
      <div className="bookmarks">
        <div className="row">
          <div className="bookmark_image">
            <div className="profile_image_wrapper">
              <img src={company.icon ? company.icon : default_company}/>
            </div>
          </div>
          <div className="bookmark_info">
            <div className="info">
              <h4>
                <Link to={`/profile/${company.id}`}>{company.name}</Link>
              </h4>
              {company.industries ? <small className="origin w-100 d-inline-block">{company.industries[0]}</small> : ""}
              <span className="origin w-100 d-inline-block">
                {company.city} {company.state}
              </span>
              <div>
                <Stars whole={whole} half={half} empty={empty} />
              </div>
              <button className="remove_bookmark" onClick={() => company.onModalClick(company.id, company.name)}>
                <DeleteOutlineIcon />
              </button>
            </div>
            <div className="notes">
              <p>{company.notes ? company.notes : "Note..."}</p>
              <button
                type="button"
                onClick={() => company.handleOpenEditModal(company.id, company.name, company.notes)}
              >
                Edit Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Bookmarks;
