/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, {Component} from "react";

import axios from "axios";
import InputMask from "react-input-mask";
import "./index.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {RouteComponentProps, Link} from "react-router-dom";
import countries from "../../data/countries.json";
import {getDetails, saveDetails} from "../../store/ducks/companyProfile/actions";
import {ApplicationState} from "../../store";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

interface DispatchProps {
  getDetails(params: any): void;
  saveDetails(data: any): void;
  saveProficiency(data: any): void;
}
interface StateProps {
  details: any;
  loading: boolean;
}
interface State {
  alertModal: boolean;
  redirectToSubscription: boolean;
  companyId: any;
  companyName: any;
  industry: any;
  address1: any;
  address2: any;
  city: any;
  state: any;
  postalCode: any;
  country: any;
  phone: any;
  repName: any;
  repEmail: any;
  website: any;
  supportEmail: any;
  yearFounded: any;
  fb?: any;
  linkedin?: any;
  twitter?: any;
  youtube?: any;
  tagline?: any;
  industries: any[];
  proficiencies: any[];
  proficiencyIds: any[];
  maxProf: any;
  suggestions: any[];
  profError: boolean;
  isSubmitted: boolean;
  formErrors: any;
  textCount: number;
  countryErr: string;
  addressErr: string;
  cityErr: string;
}
type Props = DispatchProps & StateProps & RouteComponentProps;
class EditCompanyProfile extends Component<Props, State> {
  profInput = React.createRef<HTMLInputElement>();

  state: State = {
    alertModal: false,
    redirectToSubscription: false,
    companyId: null,
    companyName: "",
    industry: "0",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    repName: "",
    repEmail: "",
    website: "",
    supportEmail: "",
    yearFounded: "",
    fb: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    tagline: "",
    industries: [],
    proficiencies: [],
    proficiencyIds: [],
    maxProf: 1,
    suggestions: [],
    profError: false,
    isSubmitted: false,
    formErrors: {},
    textCount: 0,
    countryErr: "",
    addressErr: "",
    cityErr: "",
  };

  componentDidMount() {
    const {match, getDetails} = this.props;

    const params = match.params as any;
    this.setState({companyId: params.id});
    getDetails({id: params.id});
  }

  validURL = (str: any) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  validateForm = () => {
    const errors = {
      name: "",
      address1: "",
      city: "",
      state: "",
      postCode: "",
      phone: "",
      website: "",
      repEmail: "",
      supportEmail: "",
      fbLink: "",
      ytLink: "",
      linkedinLink: "",
      twitterLink: "",
      country: "",
    };
    const {
      companyName,
      address1,
      city,
      state,
      postalCode,
      phone,
      website,
      fb,
      linkedin,
      twitter,
      youtube,
      repEmail,
      supportEmail,
      cityErr,
      countryErr,
      addressErr,
    } = this.state;
    let formIsValid = true;
    if (countryErr !== "" || cityErr !== "" || addressErr !== "") {
      formIsValid = false;
    }

    if (companyName === "") {
      formIsValid = false;
      errors.name = "Company Name is required.";
    }

    if (address1 === "") {
      formIsValid = false;
      errors.address1 = "Line 1 of company address is required.";
    }

    if (city === "") {
      formIsValid = false;
      errors.city = "Company city required.";
    }

    if (state === "") {
      formIsValid = false;
      errors.state = "Company state required.";
    }

    if (state !== "" && state.trim().length !== 2) {
      formIsValid = false;
      errors.state = "Company state length must be 2 letters";
    }

    if (postalCode === "") {
      formIsValid = false;
      errors.postCode = "Company Zipcode is required.";
    }

    if (phone === "") {
      formIsValid = false;
      errors.phone = "Company phone number is required.";
    }
    // eslint-disable-next-line valid-typeof
    if (typeof phone !== undefined) {
      if (phone.indexOf("_") !== -1) {
        formIsValid = false;
        errors.phone = "Not a valid phone number";
      }
    }

    if (website === "") {
      formIsValid = false;
      errors.website = "Company website required.";
    }

    if (website !== "") {
      const check = this.validURL(website);

      if (!check) {
        formIsValid = false;
        errors.website = "Invalid website URL.";
      }
    }

    if (fb !== "" && fb !== undefined) {
      const re = new RegExp("^((?:http://)?|(?:https://)?)?(?:www\\.)?facebook\\.com", "i");

      if (!re.test(fb)) {
        formIsValid = false;
        errors.fbLink = "Invalid facebook URL.";
      }
    }

    if (linkedin !== "" && linkedin !== undefined) {
      const re = new RegExp("^((?:http://)?|(?:https://)?)?(?:www\\.)?linkedin\\.com", "i");

      if (!re.test(linkedin)) {
        formIsValid = false;
        errors.linkedinLink = "Invalid linkedin URL ";
      }
    }

    if (twitter !== "" && twitter !== undefined) {
      const re = new RegExp("^((?:http://)?|(?:https://)?)?(?:www\\.)?twitter\\.com", "i");
      if (!re.test(twitter)) {
        formIsValid = false;
        errors.twitterLink = "Invalid twitter URL";
      }
    }

    if (youtube !== "" && youtube !== undefined) {
      const re = new RegExp("^((?:http://)?|(?:https://)?)?(?:www\\.)?youtube\\.com", "i");
      if (!re.test(youtube)) {
        formIsValid = false;
        errors.ytLink = "Invalid youtube URL";
      }
    }

    if (repEmail !== "") {
      // regular expression for email validation
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(repEmail)) {
        formIsValid = false;
        errors.repEmail = "Not a valid email address.";
      }
    }
    if (supportEmail !== "") {
      // regular expression for email validation
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(supportEmail)) {
        formIsValid = false;
        errors.supportEmail = "Not a valid email address.";
      }
    }

    this.setState({formErrors: errors});
    return formIsValid;
  };

  removeTags = (index: any) => {
    const {proficiencies} = this.state;

    this.setState({
      proficiencies: proficiencies.filter((prof: any) => prof.id !== index),
    });
  };

  handleSuggestions = (event: any) => {
    const {proficiencies} = this.state;
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: {Authorization: token || ""},
    };

    if (event.target.value) {
      axios
        .get(`${process.env.REACT_APP_NODE_CLIENT_HOST}/proficiencies?query=${event.target.value}`, options)
        .then(({data}) => {
          let result: any = [];
          let foundDuplicate = false;
          if (data.data.length > 0) {
            if (proficiencies.length > 0) {
              proficiencies.some(existingItem => {
                result = data.data.filter((item: any) => {
                  if (existingItem.id !== item.id) {
                    return item;
                  }
                  foundDuplicate = true;
                });
                return foundDuplicate;
              });
              this.setState({suggestions: result});
            } else {
              this.setState({suggestions: data.data});
            }
          }
        });
    }
  };

  addTags = (event: any) => {
    const {proficiencies, maxProf} = this.state;
    const {details} = this.props;
    const proficiencyText = event.target.value;
    if ((event.keyCode === 13) && event.target.value !== "") {
      event.preventDefault();
      const token = JSON.parse(localStorage.getItem("_token") as any);
      const options = {
        headers: {Authorization: token || ""},
      };
      // console.log(proficiencies)
      // console.log(proficiencyText.toLowerCase())
      const body = {
        name: proficiencyText,
        companyId: details.company.id,
      };
      axios.post(`${process.env.REACT_APP_NODE_CLIENT_HOST}/proficiencies`, body).then(response => {
        const {data} = response;
        this.setState({
          proficiencies: [...proficiencies, data],
          suggestions: [],
        });
      });
      // axios
      //   .get(`${process.env.REACT_APP_NODE_CLIENT_HOST}/ajax/proficiency?query=${event.target.value}`, options)
      //   .then(({data}) => {
      //     let exists = false;
      //     if (proficiencies.length < maxProf) {
      //       if (data.data.length > 0) {
      //         for (let index = 0; index < data.data.length && !exists; index += 1) {
      //           const element = data.data[index];
      //           if (!proficiencies.some(e => e.id === element.id)) {
      //             if (proficiencyText.toLowerCase() === element.name.toLowerCase()) {
      //               exists = true;
      //               Element = element;
      //               this.setState({
      //                 proficiencies: [...proficiencies, element],
      //                 suggestions: [],
      //               });
      //             }
      //           }
      //         }
      //       }
      //       //console.log(proficiencies)
      //       //console.log(proficiencyText.toLowerCase())
      //       if (!proficiencies.some(e => e.name.toLowerCase() === proficiencyText.toLowerCase())) {
      //         if (!exists) {
      //           const body = {
      //             name: proficiencyText,
      //             companyId: details.company.id,
      //           };
      //           axios.post(`${process.env.REACT_APP_NODE_CLIENT_HOST}/proficiencies`, body).then(response => {
      //             const {data} = response;
      //             this.setState({
      //               proficiencies: [...proficiencies, data],
      //               suggestions: [],
      //             });
      //           });
      //         }
      //       }

      //       this.setState({profError: false});
      //     } else {
      //       this.setState({profError: true});
      //     }
      //   });

      // eslint-disable-next-line no-param-reassign
      event.target.value = "";
    }
  };

  handleSuggestionClick = (e: any, r: any) => {
    const {proficiencies, maxProf} = this.state;

    if (proficiencies.length < maxProf) {
      this.setState({
        proficiencies: [...proficiencies, r],
      });
      this.setState({profError: false});
    } else {
      this.setState({profError: true});
    }
    this.setState({suggestions: []});

    if (this.profInput.current !== null) {
      this.profInput.current.value = "";
    }
  };

  handleOnChange = (e: any) => {
    this.setState({[e.target.name]: e.target.value} as any);
  };

  handleOnChangeCountry = (e: any) => {
    this.setState({[e.target.name]: e.target.value} as any);
    this.validateCountry(e.target.value);
  };

  getCountry = (addrComponents: any) => {
    for (let i = 0; i < addrComponents.length; i += 1) {
      if (addrComponents[i].types[0] === "country") {
        return addrComponents[i].short_name;
      }
      if (addrComponents[i].types.length === 2) {
        if (addrComponents[i].types[0] === "political") {
          return addrComponents[i].short_name;
        }
      }
    }
    return false;
  };

  validateCountry = (country: any) => {
    const {address1, city} = this.state;

    if (address1 && city && country) {
      const selectedCountry = country;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${`${address1} ${city}`}&key=AIzaSyB5jCGq0kSpxlaqAeMIJeFczLTKLfid1f4`
        )
        .then(response => {
          if (response.data.results.length > 0) {
            const address = this.getCountry(response.data.results[0].address_components);
            if (!(selectedCountry[0] === address[0])) {
              const err = "Address or city is not found in the selected country";
              this.setState({countryErr: err});
              this.setState({cityErr: ""});
              this.setState({addressErr: ""});
            } else {
              this.setState({countryErr: ""});
              this.setState({cityErr: ""});
              this.setState({addressErr: ""});
            }
          } else {
            this.setState({cityErr: "Invalid city name"});
            this.setState({addressErr: "Invalid address"});
          }
        });
    } else {
      const err = "First write address and city then select country";
      this.setState({countryErr: err});
    }
  };

  handleTextCount = (e: any) => {
    this.setState({textCount: e.target.value.length} as any);
  };

  onSubmit = (e: any) => {
    e.preventDefault();

    const {
      companyName,
      address1,
      address2,
      city,
      state,
      country,
      repName,
      postalCode,
      phone,
      website,
      fb,
      linkedin,
      twitter,
      youtube,
      yearFounded,
      repEmail,
      supportEmail,
      industry,
      tagline,
      companyId,
      proficiencies,
    } = this.state;

    const {details, saveDetails, history} = this.props;

    const profArray: any = [];
    proficiencies.map((prof: any, index: any) => {
      if(details.company.subscriptionFeatures.proficiencies > index){
        profArray.push(prof.id);
      }
    });


    const body = {
      companyId: details.company.id,
      name: companyName,
      address1,
      address2,
      city,
      state,
      postalCode,
      country,
      phone,
      repName,
      repEmail,
      website,
      email: supportEmail,
      yearFounded,

      social: {
        fb,
        linkedin,
        twitter,
        youtube,
      },

      tagline,
      proficiency: "",
      industries: Number(industry) !== 0 ? [Number(industry)] : [],
      proficiencies: profArray,
    };

    if (this.validateForm() === false) {
      return false;
    }

    saveDetails(body);
    this.setState({isSubmitted: true});
    setTimeout(() => {
      if (this.state.redirectToSubscription) {
        history.push(`/company/${companyId}/subscribe`);
      } else {
        history.push(`/profile/${companyId}`);
      }
    }, 3000);
  };

  openAlert = () => {
    this.setState({
      alertModal: true,
    });
  };

  closeAlert = () => {
    this.setState({
      alertModal: false,
    });
  };

  saveInputs = () => {
    this.setState({
      redirectToSubscription: true,
      alertModal: false,
    });

    const form = document.getElementById("company_submit_btn") as any;
    form.click();
  };

  canselSaveInputs = () => {
    const {companyId} = this.state;
    window.location.href = `${process.env.REACT_APP_CLIENT_HOST}/company/${companyId}/subscribe`;
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    console.log(nextProps);

    const {details} = nextProps;
    const {proficiencyIds} = this.state;
    const viewProficiencies:any[] = [];

    if (details.company !== undefined) {
      if (details.company.proficiencies.length > 0) {
        details.company.proficiencies.map((prof: any, index: any) => {
          this.setState({
            proficiencyIds: [...proficiencyIds, prof.id],
          });
          if(details.company.subscriptionFeatures.proficiencies > index){
              viewProficiencies.push(prof);
          }

        });
      }
      this.setState({
        companyName: details.company.name,
        address1: details.company.address1,
        address2: details.company.address2,
        city: details.company.city,
        state: details.company.state,
        postalCode: details.company.postalCode,
        country: details.company.country,
        phone: details.company.phone,
        repName: details.company.repName,
        repEmail: details.company.repEmail,
        website: details.company.website,
        supportEmail: details.company.email,
        yearFounded: details.company.yearFounded,
        fb: details.company.social.fb,
        linkedin: details.company.social.linkedin,
        twitter: details.company.social.twitter,
        youtube: details.company.social.youtube,
        tagline: details.company.tagline,
        industry:
          details.company !== undefined && details.company.industries.length > 0
            ? details.company.industries[0].id
            : "0",
        industries: details.industries,
        proficiencies: viewProficiencies,
        maxProf: details.maxProf,
        textCount: details.company.tagline !== null ? details.company.tagline.length : 0,
      });
    }
  }

  render() {
    const {
      companyName,
      address1,
      address2,
      city,
      state,
      country,
      repName,
      postalCode,
      phone,
      website,
      fb,
      linkedin,
      twitter,
      youtube,
      yearFounded,
      suggestions,
      profError,
      textCount,
      repEmail,
      supportEmail,
      addressErr,
      cityErr,
      countryErr,
      industry,
      tagline,
      companyId,
      industries,
      proficiencies,
      formErrors,
      isSubmitted,
    } = this.state;
    const {details} = this.props;
    return (
      <div className="container pt-3 editCompanyForm">
        <Dialog
          open={this.state.alertModal}
          keepMounted
          onClose={this.closeAlert}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Do you want to save your input?"}</DialogTitle>
          <DialogActions>
            <button className="btn yes_btn" onClick={this.saveInputs}>
              Yes
            </button>
            <button className="no_btn btn" onClick={this.canselSaveInputs}>
              No
            </button>
          </DialogActions>
        </Dialog>

        <form
          onSubmit={this.onSubmit}
          method="post"
          id="company_form"
          className="card card-body"
          encType="multipart/form-data"
        >
          <div className="section-1">
            <h3>Edit Company</h3>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="form-group field">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    onChange={this.handleOnChange}
                    name="companyName"
                    className="form-control"
                    id="company-name"
                    value={companyName}
                  />
                  {formErrors && formErrors.name && (
                    <div className="invalid require-name">
                      {formErrors.name} <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <select
                    onChange={this.handleOnChange}
                    value={
                      details.company !== undefined && details.company.industries.length !== 0 ? industry : industry
                    }
                    className="industry form-control"
                    name="industry"
                  >
                    <option value="0">Not sure</option>
                    {industries.length > 0 &&
                      industries.map((industry: any) => (
                        <option value={industry.id} key={industry.key}>
                          {industry.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group field">
                  <label htmlFor="address1">Headquarters Address 1</label>
                  <input
                    onChange={this.handleOnChange}
                    type="text"
                    name="address1"
                    className="form-control"
                    id="address1"
                    value={address1}
                  />
                  {formErrors && formErrors.address1 && (
                    <div className="invalid require-address1">
                      {formErrors.address1}{" "}
                      <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                  {addressErr && (
                    <div className="invalid">
                      {addressErr} <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="form-group field">
                  <label htmlFor="address2">Headquarters Address 2 (Optional)</label>
                  <input
                    type="text"
                    onChange={this.handleOnChange}
                    name="address2"
                    className="form-control"
                    id="address2"
                    value={address2}
                  />
                </div>
                <div className="form-group field">
                  <label htmlFor="city">City/Town</label>
                  <input
                    type="text"
                    onChange={this.handleOnChange}
                    name="city"
                    className="form-control"
                    id="city"
                    value={city}
                  />
                  {formErrors && formErrors.city && (
                    <div className="invalid require-address1">
                      {formErrors.city} <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                  {cityErr && (
                    <div className="invalid">
                      {cityErr} <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="state">State/Province/Region</label>
                      <input
                        type="text"
                        onChange={this.handleOnChange}
                        name="state"
                        className="form-control"
                        id="state"
                        maxLength={2}
                        value={state}
                      />
                      {formErrors && formErrors.state && (
                        <div className="invalid require-state">
                          {formErrors.state}{" "}
                          <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="postalCode">Zip Code/Postal Code</label>
                      <input
                        type="text"
                        onChange={this.handleOnChange}
                        name="postalCode"
                        className="form-control"
                        id="postalCode"
                        value={postalCode}
                      />
                      {formErrors && formErrors.postCode && (
                        <div className="invalid require-postCode">
                          {formErrors.postCode}{" "}
                          <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    onChange={this.handleOnChangeCountry}
                    value={country || ""}
                    className="country form-control"
                    name="country"
                  >
                    {Object.entries(countries).map(([key, value]) => (
                      <option value={key}>{value}</option>
                    ))}
                  </select>
                  {countryErr && (
                    <div className="invalid">
                      {countryErr} <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Headquarters Phone Number</label>
                  <InputMask
                    type="text"
                    name="phone"
                    className="form-control"
                    minLength={10}
                    mask="(999) 999-9999"
                    onChange={this.handleOnChange}
                    value={phone}
                  />
                  {formErrors && formErrors.phone && (
                    <div className="invalid require-phone">
                      {formErrors.phone} <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="repName">Location Contact Representative Name (Optional)</label>
                  <input
                    type="text"
                    name="repName"
                    onChange={this.handleOnChange}
                    className="form-control"
                    id="repName"
                    value={repName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="repEmail">Contact Representative Email (Optional)</label>
                  <input
                    type="text"
                    name="repEmail"
                    onChange={this.handleOnChange}
                    className="form-control"
                    id="repEmail"
                    value={repEmail}
                  />
                  {formErrors && formErrors.repEmail && (
                    <div className="invalid require-repEmail">
                      {formErrors.repEmail}{" "}
                      <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="website">Company Website</label>
                  <input
                    type="text"
                    onChange={this.handleOnChange}
                    name="website"
                    className="form-control"
                    id="website"
                    value={website}
                  />
                  {formErrors && formErrors.website && (
                    <div className="invalid require-website">
                      {formErrors.website} <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="support_email">Company General Support Email (Optional)</label>
                  <input
                    type="text"
                    onChange={this.handleOnChange}
                    name="support_email"
                    className="form-control"
                    id="email"
                    value={supportEmail}
                  />
                  {formErrors && formErrors.supportEmail && (
                    <div className="invalid require-support_email">
                      {formErrors.supportEmail}{" "}
                      <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="proficiency">Proficiencies</label>
                  <div>
                    {proficiencies.map((prof: any, key: any) => (
                      <li className=" badge badge-primary badge-pill tags" key={prof.key}>
                        <span id={prof.id}>
                          {prof.name}{" "}
                          <span
                            role="button"
                            tabIndex={key.toString()}
                            onKeyDown={() => {}}
                            onClick={() => this.removeTags(prof.id)}
                            className="remove"
                          >
                            &times;
                          </span>
                        </span>
                      </li>
                    ))}
                    <input
                      onKeyUp={event => this.handleSuggestions(event)}
                      onKeyDown={event => this.addTags(event)}
                      type="text"
                      onChange={this.handleOnChange}
                      name="proficiency"
                      ref={this.profInput}
                      autoComplete="off"
                      className="form-control"
                      id="proficiency"
                    />
                    {profError && (
                      <div className="max-prof-error">
                        You have reached your proficiency quota. Need more proficiencies?{" "}
                        <a onClick={() => this.openAlert()}>Upgrade</a> to the next tier.
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                      </div>
                    )}

                    {suggestions.length > 0 && (
                      <div className="suggestions">
                        {suggestions.map((r: any, key: any) => (
                          <div
                            role="button"
                            tabIndex={key.toString()}
                            onKeyDown={() => {}}
                            onClick={e => {
                              this.handleSuggestionClick(e, r);
                            }}
                          >
                            {r.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="yearFounded">Year Founded (Optional)</label>
                  <input
                    type="number"
                    onChange={this.handleOnChange}
                    name="yearFounded"
                    className="form-control"
                    id="year-founded"
                    value={yearFounded || ""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fb">Facebook Business URL (Optional)</label>
                  <input
                    type="text"
                    name="fb"
                    onChange={this.handleOnChange}
                    className="form-control"
                    id="fb-url"
                    value={fb}
                  />
                  {formErrors && formErrors.fbLink && (
                    <div className="invalid">
                      {formErrors.fbLink} <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn URL (Optional)</label>
                  <input
                    type="text"
                    onChange={this.handleOnChange}
                    name="linkedin"
                    className="form-control"
                    id="linkedin-url"
                    value={linkedin}
                  />
                  {formErrors && formErrors.linkedinLink && (
                    <div className="invalid">
                      {formErrors.linkedinLink}{" "}
                      <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="twitter">Twitter URL (Optional)</label>
                  <input
                    type="text"
                    onChange={this.handleOnChange}
                    name="twitter"
                    className="form-control"
                    id="twitter-url"
                    value={twitter}
                  />
                  {formErrors && formErrors.twitterLink && (
                    <div className="invalid">
                      {formErrors.twitterLink}{" "}
                      <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="youtube">YouTube URL (Optional)</label>
                  <input
                    type="text"
                    onChange={this.handleOnChange}
                    name="youtube"
                    className="form-control"
                    id="youtube-url"
                    value={youtube}
                  />
                  {formErrors && formErrors.ytLink && (
                    <div className="invalid">
                      {formErrors.ytLink} <FontAwesomeIcon className="exclaim-triangle" icon={faExclamationTriangle} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="section-2">
            <h3>Edit About</h3>
            <div className="form-group">
              <label htmlFor="tagline">Company Description</label>
              <textarea
                name="tagline"
                onKeyUp={this.handleTextCount}
                onChange={this.handleOnChange}
                className="form-control"
                id="tagline"
                value={tagline}
                maxLength={1000}
                rows={10}
              />
              <div className="text-length">
                <span className="current">{textCount}</span>
                /1000
              </div>
            </div>
          </div>
          <hr />
          <div className="section-3 text-right">
            <Link className="cancel btn" to={`/profile/${companyId}`}>
              Cancel
            </Link>
            <button
              title="Save & Finish"
              type="submit"
              id="company_submit_btn"
              className={`btn submit-btn ${isSubmitted ? "disabled" : ""} `}
            >
              {isSubmitted && (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}{" "}
              Save &amp; Finish
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state: ApplicationState) => ({
  details: state.profile.details,
  loading: state.profile.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getDetails: (params: any) => dispatch(getDetails(params)),
  saveDetails: (data: any) => dispatch(saveDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyProfile);
