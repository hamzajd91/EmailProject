import React from "react";
// import { Redirect, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CloudServices from "../../admin/crawl-status/CloudServices";
import AddFirm from "../../admin/home/AddFirm";
import CrawlStatus from "../../admin/home/CrawlStatus";
import ExportCompanyData from "../../admin/home/ExportCompanyData";
import FirmAdvertisement from "../../admin/home/FirmAdvertisement";
import Home from "../../admin/home/Home";
import Subscription from "../../admin/home/Subscription";
import TractionReport from "../../admin/home/TractionReport";
import LinkedInLogin from "../../admin/login/LinkedInLogin";
import LoginCallback from "../../admin/login/LoginCallback";
import PrivacyPolicay from "../../admin/login/PrivacyPolicay";
import ResetPwd from "../../admin/login/ResetPwd";
import SignIn from "../../admin/login/SignIn";
import SignUp from "../../admin/login/SignUp";
import Terms from "../../admin/login/Terms";
import Claims from "../../admin/traction-report/Claims";
import Footer from "./Footer";
import Header from "./Header";
import SideMenu from "./SideMenu";
import AddAdvertisement from "../../admin/home/AddAdvertisement";
import StorageService from "../../services/StorageService";
import EditFirm from "../../admin/home/EditFirm";
import ContactInfo from "../../admin/contact-info";
import AddContactInfo from "../../admin/contact-info/AddContactInfo";
import EditContactInfo from "./../../admin/contact-info/EditContactInfo";
import Dashboard from "../../admin/home/Dashboard";

const DefaultLayout = () => {
  require("../../admin/assets/scss/main.scss");
  return (
    <>
      {!StorageService.getToken() ? (
        <div>
          <div
            className="vertical-layout vertical-menu-modern 2-columns navbar-sticky fixed-footer"
            data-open="click"
            data-menu="vertical-menu-modern"
            data-col="2-columns"
          >
            <ToastContainer position="bottom-right" />

            <BrowserRouter>
              <Routes>
                <Route path="/admin">
                  <Route index element={SignIn} />
                  <Route path="/admin/signup" element={SignUp} />
                  <Route path="/admin/terms" element={Terms} />
                  <Route
                    path="/admin/privacy-policy"
                    element={PrivacyPolicay}
                  />
                  <Route path="/admin/reset-pwd" element={ResetPwd} />
                  <Route path="/admin/login/callback" element={LoginCallback} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="vertical-layout vertical-menu-modern 2-columns  navbar-sticky fixed-footer"
            data-open="click"
            data-menu="vertical-menu-modern"
            data-col="2-columns"
          >
            <SideMenu />
            <Header />
            <ToastContainer position="bottom-right" />

            <BrowserRouter>
              <Routes>
                <Route path="/admin" element={Dashboard} />
                <Route path="/admin/firms" element={Home} />
                <Route path="/admin/login" element={LinkedInLogin} />

                <Route path="/admin/traction-report" element={TractionReport} />
                <Route
                  path="/admin/firmAdvertisement"
                  element={FirmAdvertisement}
                />
                <Route
                  path="/admin/firmAdvertisement/addAdvertisements"
                  element={AddAdvertisement}
                />
                <Route path="/admin/newSubscription" element={Subscription} />
                <Route
                  path="/admin/exportCompanyData"
                  element={ExportCompanyData}
                />
                <Route path="/admin/addFirm" element={AddFirm} />
                <Route path="/admin/firms/editFirm" element={EditFirm} />
                <Route path="/admin/crawlStatus" element={CrawlStatus} />
                <Route
                  path="/admin/crawlStatus/cloudServices"
                  element={CloudServices}
                />
                <Route path="/admin/traction-report/detail" element={Claims} />
                <Route path="/admin/contact-info" element={ContactInfo} />
                <Route
                  path="/admin/contact-info/add-contact"
                  element={AddContactInfo}
                />
                <Route
                  path="/admin/contact-info/edit-contact"
                  element={EditContactInfo}
                />
              </Routes>
            </BrowserRouter>

            <div className="fixed-bottom footer-fix footer-light">
              <Footer />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DefaultLayout;
