import {
  ADD_CONTACT_INFO_FAIL, ADD_CONTACT_INFO_REQUEST, ADD_CONTACT_INFO_SUCCESS, ContactInfoState, CONTACT_INFO_FAIL, CONTACT_INFO_REQUEST, CONTACT_INFO_SUCCESS, DELETE_CONTACT_INFO_REQUEST, DELETE_CONTACT_INFO_SUCCESS, DELETE_CONTACT_INFO_FAIL, UPDATE_CONTACT_INFO_REQUEST, UPDATE_CONTACT_INFO_SUCCESS, UPDATE_CONTACT_INFO_FAIL
} from './types';


const INIT_STATE: ContactInfoState = {
  loading: false,
  getContactInfo: {},
  addContactInfo: {},
  error: {},
  deleteContactInfo: {},
  updateContactInfo: {}
};


const contactInfoReducer = (state = INIT_STATE, action: any) => {


  switch (action.type) {
    // get Crawl Status Detail
    case CONTACT_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTACT_INFO_SUCCESS:
      return {
        ...state,
        getContactInfo: action.payload,
        loading: false,
      };
    case CONTACT_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // get Crawl Status Detail
    case ADD_CONTACT_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CONTACT_INFO_SUCCESS:
      return {
        ...state,
        addContactInfo: action.payload,
        loading: false,
      };
    case ADD_CONTACT_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // delete contact
    case DELETE_CONTACT_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CONTACT_INFO_SUCCESS:
      return {
        ...state,
        deleteContactInfo: action.payload,
        loading: false,
      };
    case DELETE_CONTACT_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // delete contact
    case UPDATE_CONTACT_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CONTACT_INFO_SUCCESS:
      return {
        ...state,
        updateContactInfo: action.payload,
        loading: false,
      };
    case UPDATE_CONTACT_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default contactInfoReducer;
