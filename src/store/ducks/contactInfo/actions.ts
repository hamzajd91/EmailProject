import {
  CONTACT_INFO_FAIL, CONTACT_INFO_SUCCESS, CONTACT_INFO_REQUEST, ADD_CONTACT_INFO_REQUEST, ADD_CONTACT_INFO_SUCCESS, ADD_CONTACT_INFO_FAIL, DELETE_CONTACT_INFO_REQUEST, DELETE_CONTACT_INFO_SUCCESS, DELETE_CONTACT_INFO_FAIL, UPDATE_CONTACT_INFO_REQUEST, UPDATE_CONTACT_INFO_SUCCESS, UPDATE_CONTACT_INFO_FAIL
} from './types';


// getContactInfo
export const getContactInfo = (page: any, search: any) => ({
  type: CONTACT_INFO_REQUEST,
  payload: { page, search },
});

export const contactInfoSuccess = (events: any) => ({
  type: CONTACT_INFO_SUCCESS,
  payload: events,
});

export const contactInfoFail = (error: any) => ({
  type: CONTACT_INFO_FAIL,
  payload: error,
});

// addContactInfo
export const addContactInfo = (body: any) => ({
  type: ADD_CONTACT_INFO_REQUEST,
  payload: body,
});

export const addContactInfoSuccess = (events: any) => ({
  type: ADD_CONTACT_INFO_SUCCESS,
  payload: events,
});

export const addContactInfoFail = (error: any) => ({
  type: ADD_CONTACT_INFO_FAIL,
  payload: error,
});


// deleteContactInfo
export const deleteContactInfo = (body: any) => ({
  type: DELETE_CONTACT_INFO_REQUEST,
  payload: body,
});

export const deleteContactInfoSuccess = (events: any) => ({
  type: DELETE_CONTACT_INFO_SUCCESS,
  payload: events,
});

export const deleteContactInfoFail = (error: any) => ({
  type: DELETE_CONTACT_INFO_FAIL,
  payload: error,
});


// updateContactInfo
export const updateContactInfo = (body: any) => ({
  type: UPDATE_CONTACT_INFO_REQUEST,
  payload: body,
});

export const updateContactInfoSuccess = (events: any) => ({
  type: UPDATE_CONTACT_INFO_SUCCESS,
  payload: events,
});

export const updateContactInfoFail = (error: any) => ({
  type: UPDATE_CONTACT_INFO_FAIL,
  payload: error,
});