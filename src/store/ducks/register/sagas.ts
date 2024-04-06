import {put, call} from "redux-saga/effects";
import appApi from "../../../services/appApi";
import {authRegisterSuccess, authRegisterFailed} from "./actions";
const apiResponces: any = require("../../../lang/i18n/en/common.json");

export function* authRegister(payload: any) {
  const {values, setErrors, setSubmitting} = payload.payload;
  try {
    values.IS_AJAX = true;
    values.reviewId = JSON.parse(localStorage.getItem("_reviewId") as any);
    yield call(appApi.post, "/users", values);
    localStorage.removeItem("_reviewId");
    yield put(authRegisterSuccess());
  } catch (error) {
    let err_message = "";
    switch (error.response.status) {
      case 409:
        //user already exists
        err_message = apiResponces.signup.exists;
        setErrors({email: apiResponces.signup.exists});
        break;
      case 400:
        //password constraint issues
        setErrors({password: apiResponces.signup.passwordRequirements});
        err_message = apiResponces.signup.passwordRequirements;
        break;
      default:
        //server error
        err_message = "Server Error.";
    }

    yield put(
      authRegisterFailed({
        message: err_message,
      })
    );
    setSubmitting(false);
  }
}
