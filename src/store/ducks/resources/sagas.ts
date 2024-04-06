import { put, call } from "redux-saga/effects";
import appApi from "../../../services/appApi";
import { setResources } from "./actions";

export function* getResourcesData(payload: any) {
  try {
    let queryString = "";
    if (payload.search) {
      queryString = `?search=${encodeURIComponent(payload.search)}`;
    }
    const resources = yield call(appApi.get, `/resources/${payload.payload}${queryString}`);
    console.log(resources);
    yield put(
      setResources({
        data: resources.data.data.data,
        resources: payload.payload,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

