import React, {useEffect} from "react";
import "./index.scss";
import {Link} from "react-router-dom";
import Stars from "../CompanyProfile/ReviewSection/Stars";
import genericLogo from "../../images/generic_logo.jpg";
import {Company} from "../../store/ducks/companies/types";
import urlGenerate from "../../services/urlGenerate";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ProgressBar from "react-bootstrap/ProgressBar";
import appApi from "../../services/appApi";
export interface Props {
  company: Company;
  handleRequestProposal: (data: any) => void;
}

function CompanyItem({company, handleRequestProposal}: Props) {
  const [showMore, setShowMore] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [ratingInfo, setRatingInfo] = React.useState({
    info: {five: "0", four: "0", three: "0", two: "0", one: "0"},
    total: "0",
  });
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const {name, address1, score, state, id, parent, reviewTotal} = company;
  const whole = Math.floor(Number(score));
  const half = Math.floor(Number(score)) % whole >= 0.4;
  const empty = 5 - whole - (half ? 1 : 0);
  let {icon, tagline} = company;

  icon = parent ? (parent.icon ? parent.icon : genericLogo) : icon || genericLogo;

  tagline = tagline || (parent ? parent.tagline : "");

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const getRatingInfo = async () => {
    setIsLoading(true);
    const {data} = await appApi.get(`/companies/${company.id}/rating/info`);
    setRatingInfo(data);
    setIsLoading(false);
  };

  const handleToggle = () => {
    setOpen(!open);
    if (!open) {
      getRatingInfo();
    }
  };

  return (
    <React.Fragment>
      <div className="company_card">
        <div className="row">
          <div className="col-md-9">
            <div className="row align-items-end">
              <div className="company_image">
                <div>
                  <img src={icon} alt={name} />
                </div>
              </div>
              <div className="company_info">
                <div className="company_name">
                  <Link to={`/profile/${urlGenerate(name)}/${id}`}>{name}</Link>
                </div>

                <button
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  style={{backgroundColor: "transparent", border: "none"}}
                >
                  <div className="d-flex" onClick={handleToggle}>
                    <div className="starts">
                      <Stars whole={whole} half={half} empty={empty} />
                    </div>
                    <div className="total_review">{reviewTotal} reviews</div>
                  </div>
                </button>
                <Popper
                  open={open}
                  style={{zIndex: 1000}}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({TransitionProps, placement}) => (
                    <Grow
                      {...TransitionProps}
                      style={{transformOrigin: placement === "bottom" ? "center top" : "center bottom"}}
                    >
                      <Paper className="popover_paper c-box--arrow-top">
                        <ClickAwayListener onClickAway={handleClose}>
                          {isLoading ? (
                            <MenuList>
                              <p className="text-center mb-0">Please wait...</p>
                            </MenuList>
                          ) : (
                            <MenuList>
                              <MenuItem>
                                <div className="progress_bar">
                                  <div className="label">5 Star</div>
                                  <div className="pr">
                                    <ProgressBar variant="warning" now={Number(ratingInfo.info.five)} />
                                  </div>
                                  <div className="percentage">{parseFloat(ratingInfo.info.five).toFixed(2)}%</div>
                                </div>
                              </MenuItem>
                              <MenuItem>
                                <div className="progress_bar">
                                  <div className="label">4 Star</div>
                                  <div className="pr">
                                    <ProgressBar variant="warning" now={Number(ratingInfo.info.four)} />
                                  </div>
                                  <div className="percentage">{parseFloat(ratingInfo.info.four).toFixed(2)}%</div>
                                </div>
                              </MenuItem>
                              <MenuItem>
                                <div className="progress_bar">
                                  <div className="label">3 Star</div>
                                  <div className="pr">
                                    <ProgressBar variant="warning" now={Number(ratingInfo.info.three)} />
                                  </div>
                                  <div className="percentage">{parseFloat(ratingInfo.info.three).toFixed(2)}%</div>
                                </div>
                              </MenuItem>
                              <MenuItem>
                                <div className="progress_bar">
                                  <div className="label">2 Star</div>
                                  <div className="pr">
                                    <ProgressBar variant="warning" now={Number(ratingInfo.info.two)} />
                                  </div>
                                  <div className="percentage">{parseFloat(ratingInfo.info.two).toFixed(2)}%</div>
                                </div>
                              </MenuItem>
                              <MenuItem>
                                <div className="progress_bar">
                                  <div className="label">1 Star</div>
                                  <div className="pr">
                                    <ProgressBar variant="warning" now={Number(ratingInfo.info.one)} />
                                  </div>
                                  <div className="percentage">{parseFloat(ratingInfo.info.one).toFixed(2)}%</div>
                                </div>
                              </MenuItem>
                              <hr />
                              <MenuItem>
                                <Link className="review_l" to={`/profile/${urlGenerate(name)}/${id}`}>
                                  See {ratingInfo.total} HINDSYGHT reviews
                                </Link>
                              </MenuItem>
                            </MenuList>
                          )}
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
                <div className="company_address">
                  {address1} {state}
                </div>
              </div>
            </div>

            <div className="mb-3 w-100">
              <div className="company_tagline">
                {tagline && !showMore && tagline.length > 200 ? tagline.substring(0, 200) + "..." : tagline}

                {tagline && !showMore && tagline.length > 200 && (
                  <>
                    <div
                      className="continue_reading"
                      onClick={() => {
                        setShowMore(!showMore);
                      }}
                    >
                      Continue reading
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <Link className="write_review_link" to={`/company/profile/${id}/writeReview`}>
              Write a review
            </Link>
            <button className="request_info_link" onClick={() => handleRequestProposal(id)}>
              Request Info
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CompanyItem;
