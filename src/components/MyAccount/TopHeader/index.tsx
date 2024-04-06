import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import account_image from "../../../images/account/account.png";
import bookmark from "../../../images/account/bookmark.png";
import companies from "../../../images/account/companies.png";
import reviews from "../../../images/account/reviews.png";
import dashboard from "../../../images/account/dashboard.png";
import settings from "../../../images/account/settings.png";
import "./index.scss";
import {connect} from "react-redux";
import {ApplicationState} from "../../../store";
import {Dispatch} from "redux";
import {checkHasCompany} from "../../../store/ducks/companies/actions";

class TopHeader extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  checkActiveClass = () => {
    return this.props.location.pathname.startsWith("/user/reviews/invitation");
  };

  componentDidMount() {
    this.props.checkHasCompany();
  }

  render() {
    return (
      <div className="account_top_header">
        <div className="container">
          <ul className="account_top_header_links">
            {this.props.userHasCompany && (
              <li>
                <NavLink exact activeClassName="active" to="/user/dashboard">
                  <img src={dashboard} />
                  <span className="link-wrapper">Dashboard</span>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink exact activeClassName="active" to="/user">
                <img src={account_image} />
                <span className="link-wrapper">My Account</span>
              </NavLink>
            </li>

            <li>
              <NavLink exact activeClassName="active" to="/user/reviews">
                <img src={reviews} />
                <span className="link-wrapper">Reviews</span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink exact className={`${this.checkActiveClass() ? "active" : ""}`} to="/user/reviews/invitation">
                <span>
                  <svg
                    enableBackground="new 0 0 24 24"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m20.5 20c-.082 0-.164-.014-.242-.04l-19.75-6.75c-.284-.098-.482-.354-.506-.653-.022-.299.135-.583.4-.722l22.5-11.75c.251-.129.554-.109.782.054.23.164.349.442.308.722l-2.75 18.5c-.033.22-.162.414-.353.53-.118.072-.253.109-.389.109zm-17.854-7.645 17.244 5.894 2.401-16.152z" />
                    <path d="m9.5 23c-.078 0-.157-.012-.233-.037-.309-.102-.517-.389-.517-.713v-6.75c0-.189.072-.373.201-.512l13.75-14.75c.282-.304.759-.319 1.061-.037.303.282.319.757.037 1.061l-13.549 14.533v4.168l2.503-3.407c.245-.332.715-.406 1.049-.16.334.245.405.715.16 1.049l-3.857 5.25c-.145.195-.371.305-.605.305z" />
                  </svg>
                </span>
                <span className="link-wrapper">Review Invitation</span>
              </NavLink>
            </li> */}

            <li>
              <NavLink exact activeClassName="active" to="/user/bookmarks">
                <img src={bookmark} />
                <span className="link-wrapper">Bookmarks</span>
              </NavLink>
            </li>

            {this.props.userHasCompany && (
              <li>
                <NavLink exact activeClassName="active" to="/user/companies">
                  <img src={companies} />
                  <span className="link-wrapper">Companies</span>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink exact activeClassName="active" to="/user/settings">
                <img src={settings} />
                <span className="link-wrapper">Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: ApplicationState) => {
  return {
    userHasCompany: state.companies.userHasCompany,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkHasCompany: () => dispatch(checkHasCompany()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
