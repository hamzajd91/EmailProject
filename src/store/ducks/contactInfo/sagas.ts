import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects';
import { get, post, del, putCall } from '../../../services/api_helper';
import { contactInfoFail, contactInfoSuccess, deleteContactInfoSuccess, deleteContactInfoFail } from './actions';
import { ADD_CONTACT_INFO_REQUEST, CONTACT_INFO_REQUEST, DELETE_CONTACT_INFO_REQUEST, UPDATE_CONTACT_INFO_REQUEST } from './types';

const apiResponces: any = require('../../../lang/i18n/en/common.json');

// get Contact Info Detail
function* getContactInfoAPI(payload: any) {
  const data = payload.payload;
  try {
    const response = yield call(get, `/contact/get/contactinfo?page=${data.page}&limit=10&search=${data.search}`);
    yield put(contactInfoSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(contactInfoFail(error));
  }
}

// add Contact Info Detail
function* addContactInfoAPI(payload: any) {
  const data = payload.payload.data;
  console.log('-----data-----', payload.payload);

  try {
    const response = yield call(post, '/contact/add/contactinfo', data);
    toast.success(response.message);
    payload.payload.history.push('/admin/contact-info');
    yield put(contactInfoSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(contactInfoFail(error));
  }
}

//update Contact Info Detail
function* deleteContactInfoAPI(payload: any) {
  const data = payload.payload;
  try {
    ///delete/contactinfo
    const response = yield call(del, `/contact/delete/contactinfo?id=${data.id}`);
    toast.success(response.message);
    yield put(deleteContactInfoSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(deleteContactInfoFail(error));
  }
}

//delete Contact Info Detail
function* updateContactInfoAPI(payload: any) {
  const data = payload.payload;
  try {
    ///update/contactinfo
    const response = yield call(putCall, `/contact/put/contactinfo?id=${data.id}`, data.data);
    toast.success(response.message);
    payload.payload.history.push('/admin/contact-info');
    yield put(deleteContactInfoSuccess(response));
  } catch (error) {
    errorHandling(error);
    yield put(deleteContactInfoFail(error));
  }
}

const errorHandling = (error: any) => {
  let err_message = '';
  switch (error.response.status) {
    case 401:
      toast.error(error.response.data.message);
      break;
    case 403:
      toast.error(error.response.data.error.message);
      break;
    case 400:
      toast.error(error.response.data.error.message);
      break;
    default:
      toast.error('Server Error.');
      err_message = 'Server Error.';
  }
};


function* contactInfoAPI() {
  yield takeEvery(CONTACT_INFO_REQUEST, getContactInfoAPI);
  yield takeEvery(ADD_CONTACT_INFO_REQUEST, addContactInfoAPI);
  yield takeEvery(DELETE_CONTACT_INFO_REQUEST, deleteContactInfoAPI);
  yield takeEvery(UPDATE_CONTACT_INFO_REQUEST, updateContactInfoAPI);
}

export default contactInfoAPI;
