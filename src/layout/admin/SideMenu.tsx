import React from 'react';
import {
  faBuilding,
  faPhoneSquare,
  faPlusSquare,
  faPrint,
  faDesktop,
  faSubscript,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const SideMenu = () => {
  const location = useLocation();

  console.log('-----location-----', location);


  return (
    <>
      {/* BEGIN: Main Menu */}
      <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto">
              <a className="navbar-brand" href="#">
                {/* <!-- <div className="brand-logo"></div>  */}
                <h2 className="brand-text mb-0">Hindsyght</h2>
              </a>
            </li>
            <li className="nav-item nav-toggle">
              <a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
                <i className="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon" />
                <i
                  className="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block primary"
                  data-ticon="icon-disc"
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="shadow-bottom" />
        <div className="main-menu-content">
          <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
            <li className="nav-item">
              <Link to="/admin" className={location.pathname === "/admin" ? "bgMain text-white rounded shadow-md" : ""}>
                <FontAwesomeIcon icon={faDesktop} className="mx-3 fa-lg" />
                <span className="menu-title" data-i18n="Dashboard">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/firms"
                className={
                  location.pathname === "/admin/firms" || location.pathname === "/admin/firms/editFirm"
                    ? "bgMain text-white rounded shadow-md"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faBuilding} className="mx-3 fa-lg" />
                <span className="menu-title" data-i18n="Dashboard">
                  Firms
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/traction-report"
                className={
                  location.pathname === "/admin/traction-report" ||
                  location.pathname === "/admin/traction-report/detail"
                    ? "bgMain text-white rounded shadow-md"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faPrint} className="mx-3 fa-lg" />
                <span className="menu-title" data-i18n="Documentation">
                  Traction Report
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/firmAdvertisement"
                className={
                  location.pathname === "/admin/firmAdvertisement" ? "bgMain text-white rounded shadow-md" : ""
                }
              >
                <FontAwesomeIcon icon={faPrint} className="mx-3 fa-lg" />
                <span className="menu-title" data-i18n="Raise Support">
                  Firms Advertisements
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/newSubscription"
                className={location.pathname === "/admin/newSubscription" ? "bgMain text-white rounded shadow-md" : ""}
              >
                <FontAwesomeIcon icon={faPrint} className="mx-3 fa-lg" />
                <span className="menu-title" data-i18n="Raise Support">
                  Subscription
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/exportCompanyData"
                className={
                  location.pathname === "/admin/exportCompanyData" ? "bgMain text-white rounded shadow-md" : ""
                }
              >
                <FontAwesomeIcon icon={faPrint} className="mx-3 fa-lg" />
                <span className="menu-title" data-i18n="Raise Support">
                  Export Company Data
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/addFirm"
                className={location.pathname === "/admin/addFirm" ? "bgMain text-white rounded shadow-md" : ""}
              >
                <FontAwesomeIcon icon={faPlusSquare} className="mx-3 fa-lg" />
                <span className="menu-title" data-i18n="Raise Support">
                  Add Firm
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/crawlStatus"
                className={location.pathname === "/admin/crawlStatus" ? "bgMain text-white rounded shadow-md" : ""}
              >
                <FontAwesomeIcon icon={faPrint} className="mx-3 fa-lg" />
                <span className="menu-title" data-i18n="Raise Support">
                  Crawl Status
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/contact-info"
                className={
                  location.pathname === "/admin/contact-info" ||
                  location.pathname === "/admin/contact-info/add-contact" ||
                  location.pathname === "/admin/contact-info/edit-contact"
                    ? "bgMain text-white rounded shadow-md"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faPhoneSquare} className="mx-3 fa-lg" />
                <span className="menu-title" data-i18n="Raise Support">
                  Contact Info
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* END: Main Menu */}
    </>
  );
};

export default SideMenu;
