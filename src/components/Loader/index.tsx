/* eslint-disable import/no-cycle */
import React from "react";
import Loadable from "react-loadable";
import "./index.scss";
import logo from "../../images/navbar/logo.svg";

export function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="loader">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

export function SplaceLoader() {
  return (
    <div className="space_loading">
      <div>
        <img src={logo} alt="Hindsyght Logo" />
        <div className="loader">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
    </div>
  );
}

export function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

export const LoadableFaq = Loadable({
  loader: () => import("../Faq"),
  loading: Loading,
});

export const LoadableCompanyProfile = Loadable({
  loader: () => import("../CompanyProfile"),
  loading: Loading,
});


export const LoadableRepos = Loadable({
  loader: () => import("../RepositoryList"),
  loading: Loading,
});

export const LoadableLanding = Loadable({
  loader: () => import("../HomePage"),
  loading: Loading,
});

export const LoadableSearch = Loadable({
  loader: () => import("../SearchPage"),
  loading: Loading,
});



export const LoadableForServiceFirms = Loadable({
  loader: () => import("../ForServiceFirms"),
  loading: Loading,
});

export const LoadableUnderConstruction = Loadable({
  loader: () => import("../UnderConstruction"),
  loading: Loading,
});

export const LoadableHowItWorks = Loadable({
  loader: () => import("../HowItWorks"),
  loading: Loading,
});

export const LoadableAbout = Loadable({
  loader: () => import("../About"),
  loading: Loading,
});

export const LoadableError = Loadable({
  loader: () => import("../ErrorComponent"),
  loading: Loading,
});

export const LoadableEditCompanyProfile = Loadable({
  loader: () => import("../EditCompanyProfile"),
  loading: Loading,
});

export const LoadableContactUs = Loadable({
  loader: () => import("../ContactUs"),
  loading: Loading,
});

export const LoadableSubscription = Loadable({
  loader: () => import("../Subscription"),
  loading: Loading,
});

export const LoadableAccount = Loadable({
  loader: () => import("../MyAccount"),
  loading: Loading,
});

export const LoadableBlog = Loadable({
  loader: () => import("../Resources/Blog"),
  loading: Loading,
});

export const LoadablePress = Loadable({
  loader: () => import("../Resources/Press"),
  loading: Loading,
});

export const LoadableIndustry = Loadable({
  loader: () => import("../Resources/Industry"),
  loading: Loading,
});

export const LoadableSignin = Loadable({
  loader: () => import("../Signin"),
  loading: Loading,
});

export const LoadablePrivacyPolicy = Loadable({
  loader: () => import("../PrivacyPolicy"),
  loading: Loading,
});

export const LoadableTerms = Loadable({
  loader: () => import("../Terms"),
  loading: Loading,
});

export const LoadableSignUp = Loadable({
  loader: () => import("../SignUp"),
  loading: Loading,
});

export const LoadableResetPassword = Loadable({
  loader: () => import("../ResetPassword"),
  loading: Loading,
});

export const LoadableResetPasswordByToken = Loadable({
  loader: () => import("../ResetPassword/ResetPasswordByToken"),
  loading: Loading,
});

export const LoadableCompanyDetails = Loadable({
  loader: () => import("../CompanyDetails"),
  loading: Loading,
});

export const LoadableWriteReview = Loadable({
  loader: () => import("../WriteReview"),
  loading: Loading,
});

export const LoadableEditReview = Loadable({
  loader: () => import("../EditReview"),
  loading: Loading,
});

export const LoadableCompanyClaim = Loadable({
  loader: () => import("../CompanyClaim"),
  loading: Loading,
});

export const LoadableVerifyResend = Loadable({
  loader: () => import("../VerifyResend"),
  loading: Loading,
});

export const LoadableCompanyClaimDetails = Loadable({
  loader: () => import("../CompanyClaimDetails"),
  loading: Loading,
});

export const LoadableSubscriptionPlan = Loadable({
  loader: () => import("../SubscriptionPlan"),
  loading: Loading,
});

// export const LoadableCheckoutCompanies = Loadable({
//   loader: () => import("../CheckoutCompanies"),
//   loading: Loading,
// });

export const LoadableCheckoutCompanies = Loadable({
  loader: () => import("../CheckoutCompanies"),
  loading: Loading,
});

export const LoadableSuccessOverview = Loadable({
  loader: () => import("../SuccessOverview"),
  loading: Loading,
});

export const LoadableCompanySubscribe = Loadable({
  loader: () => import("../CompanySubscribe"),
  loading: Loading,
});

export const LoadableVerifyEmail = Loadable({
  loader: () => import("../VerifyEmail"),
  loading: Loading,
});

export const LoadableSingleBlog = Loadable({
  loader: () => import("../SingleBlog"),
  loading: Loading,
});

export const LoadableLinkedIn = Loadable({
  loader: () => import("../LinkedIn"),
  loading: Loading,
});

export const LoadableUpgradeSubscribe = Loadable({
  loader: () => import("../UpgradeSubscribe"),
  loading: Loading,
});

export const LoadableCompanyBranches = Loadable({
  loader: () => import("../CompanyBranches"),
  loading: Loading,
});

export const LoadableProficiency = Loadable({
  loader: () => import("../ProficiencySearch"),
  loading: Loading,
});


export const LoadableAddBranch = Loadable({
  loader: () => import("../AddBranches"),
  loading: Loading,
});


