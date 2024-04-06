import { put, call } from 'redux-saga/effects';
import api from '../../../services/api';
import { setCurrentUser } from './actions';

export function* getCurrentUser() {
  try {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const options = {
      headers: { Authorization: token || '' },
    };
    const user = yield call(api.get, '/api/users', options);
    if (user !== undefined) {
      yield put(setCurrentUser(user.data));
    }
  } catch (error) {
    console.log(error);
  }
}
