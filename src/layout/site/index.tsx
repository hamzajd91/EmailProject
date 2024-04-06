import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../../components/Navbar";
import Footer from "../../components/Footer";
import LoadingExample from "../../components/LoadingExample";
import PrivateRoutes from "../../services/PrivateRoutes";
import { ApplicationState } from "../../store";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  SplaceLoader,
  LoadableLanding,
  LoadableCompanyProfile,
  LoadableSearch,
  LoadableForServiceFirms,
  LoadableUnderConstruction,
  LoadableHowItWorks,
  LoadableAbout,
  LoadableError,
  LoadableEditCompanyProfile,
  LoadableAccount,
  LoadableContactUs,
  LoadableSubscription,
  LoadableFaq,
  LoadableBlog,
  LoadablePress,
  LoadableIndustry,
  LoadableSignin,
  LoadablePrivacyPolicy,
  LoadableTerms,
  LoadableResetPassword,
  LoadableSignUp,
  LoadableResetPasswordByToken,
  LoadableCompanyDetails,
  LoadableWriteReview,
  LoadableEditReview,
  LoadableCompanyClaim,
  LoadableVerifyResend,
  LoadableCompanyClaimDetails,
  LoadableSubscriptionPlan,
  LoadableCheckoutCompanies,
  LoadableSuccessOverview,
  LoadableVerifyEmail,
  LoadableCompanySubscribe,
  LoadableSingleBlog,
  LoadableLinkedIn,
  LoadableUpgradeSubscribe,
  LoadableCompanyBranches,
  LoadableProficiency,
  LoadableAddBranch,
} from "../../components/Loader";
import appApi from "../../services/appApi";
import StorageService from "../../services/StorageService";

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: any;
  }
}

function Logout() {
  useEffect(() => {
    localStorage.removeItem("_token");
    localStorage.removeItem("_user");
    window.location.href = "/";
  });

  return <div>...</div>;
}

function App({ location, user }: any) {
  const [isLoading, setIsLoading] = useState(true);
  // @ts-ignore
  const [showSubNav, setShowSubNav] = useState(true);
  // @ts-ignore
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    setRedirectUrl(
      `${window.location.pathname}${window.location.search ? window.location.search : "?"}&react=true`.substr(1)
    );
    setShowSubNav(true);

    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    getCurrentUser();
    const name = `${user.user.firstName} ${user.user.lastName}` || "";
    const email = `${user.user.email}` || "";

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s1: any = document.createElement("script");

    const s0: any = document.getElementsByTagName("script")[0];

    s1.async = true;
    s1.src = process.env.REACT_APP_TAWK_TO;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);

    window.Tawk_API.onLoad = function () {
      window.Tawk_API.setAttributes({
        name,
        email,
      });
    };
  }, []);

  const getCurrentUser = async () => {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    if (token) {
      try {
        const source = axios.CancelToken.source();
        setTimeout(() => {
          source.cancel();
        }, 2000);
        const response = await appApi.get("users/me", {
          cancelToken: source.token,
        });
        const { setUser } = StorageService;
        const { company, email, firstName, lastName, id, picture, title, verified, headline, industry } = response.data;
        setUser({
          company,
          email,
          firstName,
          id,
          lastName,
          picture,
          title,
          verified,
          headline,
          industry,
        });
        setIsLoading(false);
      } catch (error) {
        const { clearLogin } = StorageService;
        clearLogin();
        window.location.reload();
      }
    } else {
      setIsLoading(false);
    }
  };

  const writeReview = (props: any) => <LoadableSearch writeReview {...props} />;
  const navigate = useNavigate();

  return (
    <>
      {console.log('site')}
      <div>
        {isLoading ? (
          <SplaceLoader />
        ) : (
          <>
            <div>
              <ConicalUrl url={location.pathname} />
              <Navigation />

              <BrowserRouter>
                <Routes>
                  <Route   path="/"  element={LoadableLanding} />
                {/* <Redirect   from="/company/profile/:id" to="/profile/:id" /> */}
            <Route path="/company/profile/:id" element={<>{ navigate("/profile/:id")} </> } />

                <Route   path="/profile/:id"  element={LoadableCompanyProfile} />
                <Route   path="/profile/addbranch/:id"  element={LoadableAddBranch} />
                <PrivateRoutes   path="/profile/edit/:id"  element={LoadableEditCompanyProfile} />
                <Route   path="/profile/:slug/:id"  element={LoadableCompanyProfile} />
                <Route   path="/proficiency/:slug"  element={LoadableProficiency} />
                <Route   path="/search/writeReview"  element={writeReview} />
                <Route path="/search"  element={LoadableSearch} />
                <PrivateRoutes path="/user"  element={LoadableAccount} />
                <Route path="/contact"  element={LoadableContactUs} />
                <Route path="/subscription"  element={LoadableSubscription} />
                <Route path="/faq"  element={LoadableFaq} />
                <Route   path="/loading"  element={LoadingExample} />
                <Route   path="/error"  element={LoadableError} />
                <Route   path="/for-service-firms"  element={LoadableForServiceFirms} />
                <Route   path="/how-it-works"  element={LoadableHowItWorks} />
                <Route   path="/about-us"  element={LoadableAbout} />
                <Route   path="/under-construction"  element={LoadableUnderConstruction} />

                <Route   path="/logout"  element={Logout} />
                <Route   path="/resources/blog"  element={LoadableBlog} />
                <Route   path="/resources/press"  element={LoadablePress} />
                <Route   path="/resources/industry"  element={LoadableIndustry} />
                <Route   path="/signin"  element={LoadableSignin} />
                <Route   path="/signup"  element={LoadableSignUp} />
                <Route   path="/privacyPolicy"  element={LoadablePrivacyPolicy} />
                <Route   path="/terms"  element={LoadableTerms} />
                <Route   path="/resetPassword"  element={LoadableResetPassword} />
                <Route   path="/auth/linkedin/callback"  element={LoadableLinkedIn} />
                <Route   path="/resetPassword/:token"  element={LoadableResetPasswordByToken} />

                <PrivateRoutes   path="/company/branches/:companyId"  element={LoadableCompanyBranches} />
                <PrivateRoutes   path="/company/details"  element={LoadableCompanyDetails} />
                <PrivateRoutes   path="/company/profile/:id/writeReview"  element={LoadableWriteReview} />
                <PrivateRoutes   path="/company/:id/subscribe/upgrade"  element={LoadableUpgradeSubscribe} />
                <PrivateRoutes   path="/company/editReview/:reviewId"  element={LoadableEditReview} />
                <PrivateRoutes   path="/company/profile/:id/claim"  element={LoadableCompanyClaim} />
                <PrivateRoutes   path="/company/claim-details/:id"  element={LoadableCompanyClaimDetails} />
                <PrivateRoutes   path="/subscription2/:planName"  element={LoadableSubscriptionPlan} />
                <PrivateRoutes   path="/promotion/success-overview"  element={LoadableSuccessOverview} />

                <PrivateRoutes   path="/company/:id/subscribe"  element={LoadableCompanySubscribe} />

                <PrivateRoutes
                   
                  path="/subscription2/checkout-companies/:planId"
                   element={LoadableCheckoutCompanies}
                />
                <PrivateRoutes
                   
                  path="/company/:companyId/subscription/:planId/checkout"
                   element={LoadableCheckoutCompanies}
                />

                <Route   path="/verify"  element={LoadableVerifyEmail} />
                <Route   path="/verify/resend"  element={LoadableVerifyResend} />
                <Route   path="/resources/blog/:id"  element={LoadableSingleBlog} />
                </Routes>
              </BrowserRouter>

              <Footer />
            </div>
          </>
        )}
      </div>

    </>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user,
});

const ConicalUrl = (props: any) => (
  <>
    <Helmet>
      <link rel="canonical" href={`${process.env.REACT_APP_CLIENT_HOST}${props.url}`} />
    </Helmet>
  </>
);

export default connect(mapStateToProps)(withRouter(App));
