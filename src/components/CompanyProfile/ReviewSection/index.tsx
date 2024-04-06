import React, {useState, useRef} from "react";

import "./index.scss";
import {Col, Row, OverlayTrigger, Popover} from "react-bootstrap";
import Moment from "react-moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck} from "@fortawesome/free-solid-svg-icons";
import Report from "../../CompanyModals/Report";
import Stars from "./Stars";
import Categories from "../../../data/writeReviews.json";
import defaultUser from "../../../images/user-circle-solid.svg";
import infoCircle from "../../../images/information-outline.svg";

function Review(props: any) {
  const reportRef = useRef(null);
  const verifiedRef = useRef(null);
  const categoriesData: any = Categories.categories;
  const {permissions, loggedInUser, reviewGroup} = props;
  const {writeReview} = permissions;
  const {user, review, company} = reviewGroup;
  const [voted, setVoted] = useState(review.voted);
  const [voteScore, setVoteScore] = useState(review.voteScore);
  const whole = Math.floor(review.overall);
  const half = Number((review.overall % whole).toFixed(1)) >= 0.4;
  const empty = 5 - whole - (half ? 1 : 0);
  const [reportModal, setReportModal] = useState(false);

  const openReportModal = () => {
    const reportButton: any = reportRef.current;
    reportButton.click();
    setReportModal(true);
  };

  const closeReportModal = () => {
    setReportModal(false);
  };

  const handleAddVote = (reviewId: any) => {
    const {setHelpfulReview} = props;
    setHelpfulReview(reviewId);
    setVoted(1);
    setVoteScore(voteScore + 1);
  };

  const handleRemoveVote = (reviewId: any) => {
    const {removeHelpfulReview} = props;
    removeHelpfulReview(reviewId);
    setVoted(0);
    setVoteScore(voteScore - 1);
  };

  const handleBrokenImage = (e: any) => {
    e.target.src = defaultUser;
  };

  return (
    <>
      <Report show={reportModal} closeReportModal={closeReportModal} />

      <div className="container">
        <div className="s_review_info">
          <div className="profile">
            {review.isAnonymous === true ? (
              <span className="user_avatar">
                <span>
                  <FontAwesomeIcon
                    style={{
                      fontSize: "25px",
                      marginLeft: "12px",
                      marginTop: "12px",
                    }}
                    icon={faUserCheck}
                  />
                </span>
              </span>
            ) : (
              <span className="user_avatar">
                <img
                  onError={e => handleBrokenImage(e)}
                  src={user.picture ? user.picture : defaultUser}
                  alt="userpic"
                />
              </span>
            )}
          </div>
          <div className="other_information">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="user_information">
                  {review.isAnonymous === true ? (
                    <React.Fragment>
                      <span className="review_heading">
                        <span className="name">{"Verified User"}</span>
                        <OverlayTrigger
                          rootClose
                          trigger="click"
                          key="right-end"
                          placement="right-end"
                          overlay={
                            <Popover className="verified_popover_container" id={`popover-positioned-${review.id}`}>
                              {
                                "This user chose to remain anonymous and has gone through Hindsyght’s validation process"
                              }
                            </Popover>
                          }
                        >
                          <img
                            style={{marginLeft: "10px"}}
                            ref={verifiedRef}
                            className="claim_info_btn"
                            src={infoCircle}
                            alt=""
                          />
                        </OverlayTrigger>
                      </span>
                    </React.Fragment>
                  ) : (
                    <span className="name">
                      {user.firstName} {`${user.lastName[0]}.`}
                    </span>
                  )}
                  <h6>
                    <Moment format="MMMM D, YYYY">{review.createdAt}</Moment>
                  </h6>
                  <small>
                    {company.city}, {company.state}
                  </small>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="review_star">
                  <span className="label">Review:</span>
                  <div className="ratings">
                    <Stars whole={whole} half={half} empty={empty} />
                  </div>
                </div>
              </div>
            </div>
            <div className="review_information">
              <span>
                {review.categories.map(
                  (category: any, i: any) =>
                    `${
                      categoriesData.find(
                        (record: {categoryId: any}) => parseInt(record.categoryId, 0) === category.categoryId
                      ).scores[category.score]
                    } `
                )}
              </span>
              {review.answers[0].answer && <p className="mt-2 mb-0">{review.answers[0].answer}</p>}
            </div>

            <div className="row mt-3">
              <div className="col">
                {writeReview && loggedInUser !== user.id && (
                  <button
                    type="button"
                    onClick={() => {
                      if (voted > 0) {
                        handleRemoveVote(review.id);
                      } else {
                        handleAddVote(review.id);
                      }
                    }}
                    className={`helpful mr-2 btn btn-sm ${voted > 0 ? "upvoted" : "upvote"} `}
                  >
                    {voted > 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <defs>
                          <clipPath id="clip-Thumb">
                            <rect width="32" height="32" />
                          </clipPath>
                        </defs>
                        <g id="Thumb" clipPath="url(#clip-Thumb)">
                          <path
                            id="thumbs-up_2_"
                            data-name="thumbs-up (2)"
                            d="M14.516,9.3V5.129A3.129,3.129,0,0,0,11.387,2L7.215,11.387V22.861H18.981a2.086,2.086,0,0,0,2.086-1.773L22.506,11.7A2.086,2.086,0,0,0,20.42,9.3Zm-7.3,13.559H4.086A2.086,2.086,0,0,1,2,20.775v-7.3a2.086,2.086,0,0,1,2.086-2.086H7.215"
                            transform="translate(4 4)"
                            fill="#005cb9"
                          />
                        </g>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <g id="Group_369" data-name="Group 369" transform="translate(-272 -3432)">
                          <rect
                            id="Rectangle_230"
                            data-name="Rectangle 230"
                            width="32"
                            height="32"
                            transform="translate(272 3432)"
                            fill="none"
                          />
                          <path
                            id="thumbs-up_2_"
                            data-name="thumbs-up (2)"
                            d="M14,9V5a3,3,0,0,0-3-3L7,11V22H18.28a2,2,0,0,0,2-1.7l1.38-9a2,2,0,0,0-2-2.3ZM7,22H4a2,2,0,0,1-2-2V13a2,2,0,0,1,2-2H7"
                            transform="translate(276.5 3436.5)"
                            fill="none"
                            stroke="#005cb9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </g>
                      </svg>
                    )}{" "}
                    Helpful
                  </button>
                )}
              </div>
              <div className="col text-right voted_review">
                <span>{voteScore} Helpful votes</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="review_divider" />
      </div>

      {/* <div className="container single_review">
        <div className="d-flex mt-2 help_reviews">
          <span className="buttons ml-auto">
            <OverlayTrigger
              rootClose
              trigger="click"
              key="top"
              placement="top"
              overlay={
                <Popover id={`popover-positioned-${"top"}`}>
                  <Popover.Content>
                    <div
                      role="button"
                      tabIndex={-1}
                      onKeyDown={() => {}}
                      onClick={openReportModal}
                      className="report_review"
                    >
                      Report review
                    </div>
                  </Popover.Content>
                </Popover>
              }
            >
              <div ref={reportRef} className="report_icon btn-sm btn btn-primary">
                &#8942;
              </div>
            </OverlayTrigger>
          </span>
        </div>
      </div> */}
    </>
  );
}
export default Review;
