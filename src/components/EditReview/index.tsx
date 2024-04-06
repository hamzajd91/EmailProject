import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { ApplicationState } from "../../store";
import { authLogin } from "../../store/ducks/login/actions";
import "./index.scss";
import { Link } from "react-router-dom";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import appApi from "../../services/appApi";
import { Loader } from "../Loader";
const writeReviews: any = require("../../data/writeReviews.json");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      borderColor: "#fff",
      width: "100%",
    },
    select: {
      borderColor: "#fff !important",
      background: "#fff",
      "&:focus": {
        background: "#fff",
      },
    },
    outlined: {
      borderColor: "#fff",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

function WriteReview(props: any) {
  const classes = useStyles();
  const [termsErr, setTermsErr] = React.useState("");
  const [anonymousReview, setAnonymousReview] = React.useState(false);
  const [ratingValue, setRatingValue] = React.useState<any>({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });
  const [termsChecked, setChecked] = React.useState(false);

  const handleChange = () => {
    setAnonymousReview(!anonymousReview);
  };

  const [open, setOpen] = React.useState(false);
  const [isPosting, setIsPosting] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [additionalFeedback, setAdditionalFeedback] = React.useState("");
  const [companyData, setCompanyData] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [termsModal, setTermsModal] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [activeStep, setActiveStep] = React.useState(1);
  const [disabled, setDisabled] = React.useState<any>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });
  const [stepError, setStepError] = React.useState<any>({
    step: "",
    error: "",
  });

  const handleAddressChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAddress(event.target.value as string);
  };

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!termsChecked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nextStep = () => {
    const radioValue = document.querySelector(`input[name="${activeStep}"]:checked`) as HTMLInputElement;
    if (radioValue == null || radioValue.value == "") {
      setStepError({ step: activeStep, error: "Please enter a score for this category of work." });
    } else {
      let nextStep = activeStep + 1;
      setStepError({ step: "", error: "" });
      setRatingValue({
        ...ratingValue,
        [activeStep]: radioValue.value,
      });
      setActiveStep(nextStep);
    }
  };

  const postReview = async () => {
    if (termsChecked == false) {
      return setTermsErr("Please agree to the Terms of Use");
    }
    setTermsErr("");

    const formData: any = {
      isAnonymous: anonymousReview,
      categories: [],
      questions: [{ id: 5, answer: additionalFeedback }],
    };

    Object.keys(ratingValue).map((rate: any, index: number) => {
      const categoryData = {
        id: rate,
        score: (Object.values(ratingValue) as any)[index],
      };
      formData.categories.push(categoryData);
    });

    try {
      const reviewId = props.match.params.reviewId;
      await appApi.put(`reviews/${reviewId}`, formData);
      props.history.push(`/user/reviews`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    const getCompanyInfo = async () => {
      const reviewId = props.match.params.reviewId;
      const reviewResult = await appApi.get(`reviews/${reviewId}`);

      let newratingValue: any = {};
      reviewResult.data.review.categories.forEach((element: { categoryId: number; score: number }) => {
        let cat: any = element.categoryId;
        newratingValue[cat] = element.score;
      });

      setAdditionalFeedback(reviewResult.data.review.answers[0].answer);
      setRatingValue(newratingValue);
      setCompanyData(reviewResult.data.company);
      setAddress(reviewResult.data.company.id);
      setDisabled({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      });
      setIsLoading(false);
    };
    getCompanyInfo();
  }, []);

  const changeActiveStep = (step: any) => {
    if (ratingValue[step] == activeStep || step < activeStep || ratingValue[step] != "") {
      setActiveStep(Number(step));
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const setValue = (currentStep: any, value: any) => {
    console.log(currentStep, value);

    setRatingValue({
      ...ratingValue,
      [currentStep]: value,
    });
    setDisabled({
      ...disabled,
      [activeStep]: false,
    });
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="text-center pt-5 pb-5">
          <Loader />
        </div>
      ) : (
        <div className="light_review_bg">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="review_agency">
                  <h3 className="text-center">Review {companyData.name}</h3>
                  <p>
                    Please provide a description of your experience below. Your review will help others in their
                    business decisions. Remember to provide as much detail as possible, and keep it real.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="anonymous_Review_Block">
                  <div className="d-flex w-100">
                    <div className="an_revoew_label">
                      <h3>Anonymous Review?</h3>
                      <button onClick={handleClickOpen("paper")}>
                        <HelpOutlineIcon />
                      </button>
                    </div>
                    <div className="ml-auto">
                      <label className="switch">
                        <input type="checkbox" checked={anonymousReview} onChange={handleChange} />
                        <span className="slider round"></span>
                      </label>
                      {/* <FormControlLabel
                        control={<PurpleSwitch size="small" checked={anonymousReview} onChange={handleChange} />}
                        label=""
                      /> */}
                    </div>
                  </div>
                  <h6 style={{ color: "#fff", marginBottom: "15px", marginTop: "15px" }}>Select a location to review</h6>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      classes={{
                        root: classes.select,
                      }}
                      disabled
                      value={address}
                      onChange={handleAddressChange}
                    >
                      <MenuItem value={companyData.id}>
                        {companyData.address1} {companyData.city}, {companyData.state}
                      </MenuItem>
                      {/* {companyData.branches.map((data: any, index: any) => {
                        return (
                          <MenuItem value={data.id} key={index}>
                            {data.address1} {data.city}, {data.state}
                          </MenuItem>
                        );
                      })} */}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-5">
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="option_box">
                  {writeReviews.categories.map((category: any, index: number) => {
                    return (
                      <div
                        className={`review_que ${activeStep == category.categoryId ? "review_que_active" : ""}`}
                        onClick={() => changeActiveStep(category.categoryId)}
                        key={index}
                      >
                        <h5 className={`question ${activeStep == category.categoryId ? "active" : ""}`}>
                          <img src={require(`../../images/review/${category.scores.icon}.png`)} />{" "}
                          {category.categoryName}{" "}
                          {ratingValue[category.categoryId] && `- ${ratingValue[category.categoryId]}`}
                        </h5>
                        {/* <span className={`count ${activeStep == category.categoryId ? "active" : ""}`}>
                          {ratingValue[category.categoryId]}
                        </span> */}
                      </div>
                    );
                  })}
                  <div className={`review_que ${activeStep == 6 ? "review_que_active" : ""}`}>
                    <h5 className={`question ${activeStep == 6 ? "active" : ""}`}>
                      <img src={require(`../../images/review/feedback.png`)} /> Feedback
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <form id="rating_form">
                  {writeReviews.categories.map((category: any, index: number) => {
                    return (
                      <div className={`opt ${activeStep == category.categoryId ? "active" : ""}`} key={index}>
                        <div className="review_options">
                          {Object.entries(category.scores).map((option: any, index: number) => {
                            const cat_op = category.categoryId;
                            return (
                              option[0] != "icon" && (
                                <p key={index} onClick={() => setValue(category.categoryId, option[0])}>
                                  <input
                                    type="radio"
                                    value={option[0]}
                                    defaultChecked={ratingValue[cat_op] == option[0]}
                                    id={`${category.categoryName}_${option[0]}`}
                                    name={category.categoryId}
                                  />

                                  <label htmlFor={`${category.categoryName}_${option[0]}`} className={`single_option`}>
                                    <span
                                      className={`option_number ${ratingValue[cat_op] == option[0] ? "active" : null}`}
                                    >
                                      {option[0]}
                                    </span>{" "}
                                    {option[1]}
                                  </label>
                                </p>
                              )
                            );
                          })}
                          {stepError.step == category.categoryId ? (
                            <small className="text-danger">{stepError.error}</small>
                          ) : (
                            ""
                          )}
                          <div className="text-center">
                            {activeStep != 1 && (
                              <button className="next_btn mr-2" type="button" onClick={prevStep}>
                                Previous
                              </button>
                            )}
                            <button
                              className="next_btn"
                              type="button"
                              onClick={nextStep}
                              disabled={disabled[activeStep]}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className={`opt ${activeStep == 6 ? "active" : ""}`}>
                    <div className="review_options">
                      <div className="terms">
                        <TextField
                          required
                          style={{ width: "100%" }}
                          label="Additional Feedback (optional)"
                          defaultValue=""
                          multiline
                          variant="outlined"
                          rows={5}
                          className="mb-3"
                          onChange={e => {
                            setAdditionalFeedback(e.target.value);
                          }}
                          inputProps={{ maxLength: 1000 }}
                          helperText="Words limit 1000."
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={termsChecked}
                              onChange={handleTermsChange}
                              name="agreement"
                              color="primary"
                            />
                          }
                          label={
                            <p>
                              I certify that this review is my genuine opinion based on my own experience with the
                              company. I submit the review in accordance with Hindsyght's{" "}
                              {/* <button type="button" onClick={() => setTermsModal(true)}>
                              
                            </button> */}
                              <Link to="/terms">Terms of Use</Link>. I am not an employee of this company or one of its
                              direct competitors. I also confirm that, if I was offered an incentive in exchange for
                              providing the review, the offer did not influence the content of this review.
                            </p>
                          }
                        />
                      </div>
                      {termsErr && <small className="text-danger">{termsErr}</small>}
                      <br />
                      {isPosting ? (
                        <button className="next_btn" type="button" disabled={isPosting}>
                          Please wait...
                        </button>
                      ) : (
                        <button className="next_btn" type="button" onClick={postReview} disabled={isPosting}>
                          Post Review
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="sub_page_title">
            <h2>Review Guidelines</h2>
          </div>
          <div className="container mt-5">
            <div className="review_guide">
              <p>
                Thanks for giving back to this business community. Your review will help others make decisions on
                selecting a business partner.
              </p>
              <p>
                We want to make the review process as easy as possible and have created a 5-star scale across 5
                different review categories. You can simply click on the rating based on the message that best fits your
                experience within each category.
              </p>
              <p>
                We also provide an area for you to add your own personal input. You can provide any additional feedback
                that you would like to share to make your review authentic. For insights on how to write a good review,
                please read our{" "}
                <button type="button" onClick={() => setTermsModal(true)}>
                  General Guidelines
                </button>
                . for more details.
              </p>
              <p>
                Hindsyght likes to keep things professional and respectful. we’ve a no tolerance policy on aggressive
                or discriminatory language including threats, harassment, lewdness, hate speech, and profanity.
              </p>
              <p>Thanks for keeping Hindsyght a great place to view and share information.</p>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={termsModal}
        onClose={() => setTermsModal(false)}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">General Guidelines</DialogTitle>
        <DialogContent dividers={scroll === "paper"} className="modal_contents_">
          <p>
            Hindsyght allows users to contribute the content based on the experiences they had with professional
            services firms through reviews. Being professional is the expectation for this community. Please follow
            these guidelines to ensure everyone can benefit from this site and create a helpful, balanced, and authentic
            community.
          </p>
          <p>What to do:</p>
          <ul>
            <li>
              The best reviews are authentic. They include honest narrative, sufficient detail, and helpful tips for
              others to see. Your review should be truthful and constitute your own personal opinion and experience. We
              don’t take sides when it comes to factual disputes, so we expect you to stand behind your statements.
            </li>
            <li>
              Your reviews should be relevant and appropriate. Reviews should not be about matters that don't address
              the core customer experience. We encourage you to think about your experience from a few perspectives and
              include both a pro and a con to provide a balanced review.
            </li>
            <li>
              We want to hear about your firsthand experience, not what you heard from others. Tell your story without
              broad generalizations and allegations.
            </li>
            <li>
              Your review should be factually correct. Feel free to provide your opinions, but don't exaggerate or
              misrepresent your experience. We don't take sides when it comes to factual disputes, so we expect you to
              stand behind your review.
            </li>
            <li>
              Review updates should reflect a new experience or interaction with the business. Don't tell the same old
              story you've already told. If you'd like to add new insight to an old experience, just edit your review
              instead of creating a new update.
            </li>
          </ul>
          <p>What not to do:</p>
          <ul>
            <li>
              We don't approve reviews that include profanities, threats, harassment, or discriminatory language
              targeted at an individual or group. We also do not allow reviews that include negative comments about
              identifiable individuals.
            </li>
            <li>
              Your contributions should not be biased. We do not approve writing reviews of your own company, your
              friends’ or relatives’ company, your peers or competitors in your industry.
            </li>
            <li>Please don’t publicize other people’s private information.</li>
            <li>Don’t copy content from other sites or users.</li>
            <li>You should not use removing or posting your review as a way to extract benefit from a company.</li>
            <li>
              We do not accept reviews that reveal confidential, non-public internal company information. These include,
              but not limited to, financial results, budgets, source code, customer lists, manufacturing techniques,
              R&amp;D activities, and technical know-how.
            </li>
            <li>
              To protect user privacy, do not identify yourself or include any contact information (about yourself or
              others) in your posts.Î
            </li>
          </ul>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <div className="d-flex w-100 align-items-center">
            <Typography variant="h6" className="modal_title_">
              Anonymous Review Information
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" className="ml-auto">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" className="modal_description" tabIndex={-1}>
            By selecting this option, "Verified User" will replace your name on the review. A non-personal email account
            such as your work email is required if you sign up with Hindsyght using your personal email.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    profile: state.profile,
    login: state.login,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authLogin: (params: any) => dispatch(authLogin(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);
