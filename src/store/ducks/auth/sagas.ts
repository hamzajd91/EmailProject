import { toast } from 'react-toastify';
import { put, call, takeEvery } from 'redux-saga/effects';
import { get, post } from '../../../services/api_helper';
import StorageService from '../../../services/StorageService';
import { TOKEN, USER_DATA } from '../../../utils/ConstantsFile';
import { signInUserFail, signInUserSuccess, signUpUserFail, signUpUserSuccess } from './actions';
import { LINKEDIN_REQUEST, SIGNIN_REQUEST, SIGNUP_REQUEST } from './types';
const apiResponces: any = require("../../../lang/i18n/en/common.json");


// get country list
function* getlinkedinUser(payload: any) {
  console.log("----payload-----", payload);
  const url = payload.payload;
  console.log("----url-----", url.payload);

  try {
    // const response = yield call(get, "/api/v1/countries");
    const response = yield call(get, "/users/linkedin/callback" + url.payload);

    console.log("------response--------", response);

    // yield put(getCountrySuccess(response));
  } catch (error) {
    // yield put(getCountryFail(error));
  }
}


// post login user
function* signInUser(payload: any) {

  const user = payload.payload.user;
  const history = payload.payload.history;
  try {
    const {setUser, setToken} = StorageService;
    const response = yield call(post, "/users/login", user);
    console.log(response)
    const {company, email, firstName, lastName, id, picture, title, verified, headline, industry} = response;
    setUser({company, email, firstName, id, lastName, picture, title, verified, headline, industry});
    setToken(response.jwt)
  //  localStorage.setItem('_token',response.jwt);
  //  localStorage.setItem('_user',JSON.stringify(response));
    yield put(signInUserSuccess(response));
    toast.success("Login successfully")
    // history.push("/admin")
    window.location.href = "/admin";
  } catch (error) {
    errorHandling(error);
    yield put(signInUserFail(error));
  }
}

const errorHandling = (error: any) => {
  console.log(error);
     
  let err_message = "";
  switch (error.response.status) {
    case 401:
      toast.error(error.response.data.message);
      break;
    case 403:
      toast.error(error.response.data.error.message);
      break;
    // case 409:
    //   //user already exists
    //   err_message = apiResponces.signup.exists;
    //   toast.error(err_message);
    //   break;
    // case 400:
    //   err_message = apiResponces.signup.passwordRequirements;
    //   toast.error(err_message);
    //   break;
    default:
      //server error
      err_message = "Server Error.";
  }
}


// post register user
function* signUpUser(payload: any) {
  console.log("------payload---------", payload.payload);

  try {
    const response = yield call(post, "/users", payload.payload);
    yield put(signUpUserSuccess(response));
  } catch (error) {
    let err_message = "";
    switch (error.response.status) {
      case 409:
        //user already exists
        err_message = apiResponces.signup.exists;
        toast.error(err_message);
        // setErrors({email: apiResponces.signup.exists});
        break;
      case 400:
        //password constraint issues
        // setErrors({password: apiResponces.signup.passwordRequirements});
        err_message = apiResponces.signup.passwordRequirements;
        toast.error(err_message);
        break;
      default:
        //server error
        err_message = "Server Error.";
    }

    yield put(signUpUserFail(error));
  }
}


function* addFirmsAPI() {
  yield takeEvery(LINKEDIN_REQUEST, getlinkedinUser);
  yield takeEvery(SIGNUP_REQUEST, signUpUser);
  yield takeEvery(SIGNIN_REQUEST, signInUser);
}

export default addFirmsAPI;
