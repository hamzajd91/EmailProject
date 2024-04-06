import React, {useState, useEffect} from "react";
import {Row, Col, OverlayTrigger, Popover, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./index.scss";
import {Profile, Permissions} from "../../../store/ducks/companyProfile/types";
import Address from "./Address";

interface Props {
  profile: Profile;
  handleCoordinates: Function;
  permissions: Permissions;
  showMore(): void;
}
export function DescriptionSection(props: Props) {
  // @ts-ignore
  const [coordinates, setCoordinates] = useState(props.profile.coordinates);
  const [showMore, setShowMore] = useState(true);
  const {permissions} = props;
  useEffect(() => {
    props.handleCoordinates(coordinates);
  }, []);

  return (
    <React.Fragment>
      <div className="profile_desc_wrap">
        <Container>
          <div className="profile_desc">
            <p className="heading">About {props.profile.name} </p>
            <p className="text">
              {/* {} */}

              {props.profile.tagline && showMore && props.profile.tagline.length > 500
                ? props.profile.tagline.substring(0, 500)
                : props.profile.tagline
                ? props.profile.tagline
                : "No description provided for this company."}

              {props.profile.tagline && showMore && props.profile.tagline.length > 500 && (
                <>
                  ...
                  <span
                    style={{marginLeft: 12, color: "#2a84b3"}}
                    onClick={() => {
                      props.showMore();
                      setShowMore(false);
                    }}
                  >
                    Show more
                  </span>
                </>
              )}

              {props.profile.tagline && !showMore && props.profile.tagline.length > 500 && (
                <>
                  <span
                    style={{marginLeft: 12, color: "#2a84b3"}}
                    onClick={() => {
                      props.showMore();
                      setShowMore(true);
                    }}
                  >
                    Show Less
                  </span>
                </>
              )}
            </p>
            {permissions.canEdit && (
              <div className="edit-details" id="edit-details" title="">
                <button
                  // onClick={() => {
                  //   window.location.href = `${process.env.REACT_APP_NODE_CLIENT_HOST}/company/details/${props.profile.id}`;
                  // }}
                  className="btn"
                >
                  <Link to={`/profile/edit/${props.profile.id}`} className="btn  ">
                    {/* <Link to={`/profile/${profile.id}/edit`} >EDIT DETAILS</Link> */}
                    EDIT DESCRIPTION{" "}
                  </Link>
                </button>
              </div>
            )}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

export function MapAddress(props: Props) {
  const [coordinates, setCoordinates] = useState(props.profile.coordinates);
  const {permissions} = props;
  useEffect(() => {
    props.handleCoordinates(coordinates);
  }, []);
  const handleCoordinates = (newCoordinates: any) => {
    setCoordinates(newCoordinates);
    props.handleCoordinates(newCoordinates);
  };
  return (
    <Row className="profile_desc_location_wrapper">
      <Col className="profile_location_wrapper" sm={12} md={12}>
        <div className="profile_location">
          {permissions.canEditBranches ? (
            <div className="edit-branch">
              <button
                onClick={() => {
                  window.location.href = `${process.env.REACT_APP_CLIENT_HOST}/company/branches/${props.profile.id}`;
                }}
                className="btn"
              >
                ADD OR EDIT LOCATIONS
              </button>
            </div>
          ) : permissions.canEdit ? (
            <OverlayTrigger
              rootClose
              trigger="click"
              key="right-end"
              placement="right-end"
              overlay={
                <Popover className="claim_popover_container" id={`popover-positioned-${"right-end"}`}>
                  <div>
                    To add a Branch, you must be a BASIC or PLUS subscriber. Click{" "}
                    <a href={`${process.env.REACT_APP_CLIENT_HOST}/company/${props.profile.id}/subscribe`}>here</a> to
                    upgrade.
                  </div>
                </Popover>
              }
            >
              <div className="edit-branch" id="edit-branch" title="">
                <button className="btn  disabled">ADD OR EDIT LOCATIONS</button>
              </div>
            </OverlayTrigger>
          ) : null}

          <div className="header_quarters">
            <p>Headquarters</p>
            <div
              className={`company-branch ${
                coordinates === props.profile.coordinates ? "active-googlemaps-branch" : ""
              }`}
              onClick={() => {
                handleCoordinates(props.profile.coordinates);
              }}
            >
              <Address profile={props.profile} />
            </div>
          </div>

          <div className="locations" style={{maxHeight: "400px", overflow: "auto"}}>
            <p>Locations</p>
            {!props.profile.parentId ? (
              props.profile.branches!.length === 0 ? (
                <span> {`${props.profile.name} has only 1 office location.`} </span>
              ) : (
                props.profile.branches!.map((branch: any, index: number) => (
                  <React.Fragment key={index}>
                    <div
                      className={`company-branch ${
                        coordinates === branch.coordinates ? "active-googlemaps-branch" : ""
                      }`}
                      onClick={() => {
                        handleCoordinates(branch.coordinates);
                      }}
                    >
                      <Address profile={branch} />
                      <br />
                    </div>
                    <hr className="branch-divider" />
                  </React.Fragment>
                ))
              )
            ) : (
              <span> {`${props.profile.name} has only 1 office location.`} </span>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}

// export {DescriptionSection, MapAddress};
