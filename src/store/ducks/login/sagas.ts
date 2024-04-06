import {put, call} from "redux-saga/effects";
import appApi from "../../../services/appApi";
import {authLoginFailed, authLoginSuccess} from "./actions";
import {setCurrentUser} from "../user/actions";
import StorageService from "../../../services/StorageService";
import {redirectAfterSuccess} from "./actions";
const userResponces: any = require("../../../lang/i18n/en/common.json");

export function* authLogin(payload: any) {
  const {setSubmitting} = payload.payload.meta;
  const values = payload.payload.values;
  try {
    values.IS_AJAX = true;
    const user = yield call(appApi.post, "/users/login", values);
    const {setUser, setToken} = StorageService;
    const {company, email, firstName, lastName, id, picture, title, verified, headline, industry} = user.data;
    yield call(setUser, {company, email, firstName, id, lastName, picture, title, verified, headline, industry});
    yield call(setToken, user.data.jwt);
    yield put(
      authLoginSuccess({
        error: false,
        message: "",
      })
    );
    yield put(setCurrentUser({company, email, firstName, lastName, id, picture, title, verified, headline, industry}));
    setSubmitting(false);
    yield call(redirectAfterSuccess);
  } catch (error) {
    let err_message = "";
    switch (error.response.status) {
      case 400:
        break;
      case 401:
        if (error.response.data.error.message === "Invalid login credentials") {
          err_message = "Invalid login credentials";
        } else {
          err_message = userResponces.signin.locked;
        }
        break;
      case 403:
        err_message = userResponces.signin.notValidated;
        break;
      default:
    }
    yield put(
      authLoginFailed({
        error: true,
        message: err_message,
      })
    );
    yield call(setSubmitting, false);
  }
}
