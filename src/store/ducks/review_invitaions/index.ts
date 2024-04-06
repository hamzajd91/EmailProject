import {Reducer} from "redux";
import {ReviewInvitaionState, ReviewInvitaionTypes} from "./types";
import BraftEditor from "braft-editor";

const defaultTemplate = `
<p>Dear {{{ customerName }}},</p>
<br />
<p>{{{ userName }}} has invited you to write a review for {{{ companyName }}} on the Hindsyght platform. Please click on the link below to start the review process. It will just take a couple of minutes!</p>
<br />
<p>Hindsyght is the go-to platform for connecting IT services and solutions with businesses across the nation.</p>
<br />
<p>{{{ reviewLink }}}</p>
<br />
<p>Thank you</p>
<p>{{{ userName }}}</p>
`;

const INITIAL_STATE: ReviewInvitaionState = {
  customers: [],
  // customers: [{email: "rahul@hindsyght.com", name: "Rahul"}],
  sender_information: {
    subject: "Invitation to write review for {{{ companyName }}}",
    sender_name: "",
    reply_to_email: "",
    template: BraftEditor.createEditorState(defaultTemplate),
    sender_email_type: "default",
    company: "",
  },
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case ReviewInvitaionTypes.SET_CUSTOMER:
      return {
        ...state,
        customers: payload,
      };

    case ReviewInvitaionTypes.SET_SENDER_INFORMATION:
      const {sender_information} = payload;
      return {
        ...state,
        sender_information: {
          ...state.sender_information,
          ...sender_information,
        },
      };

    case ReviewInvitaionTypes.RESET_INFORMATION:
      return {
        ...state,
        customers: [],
        sender_information: {
          subject: "Invitation to write review for {{{ companyName }}}",
          sender_name: "",
          reply_to_email: "",
          template: BraftEditor.createEditorState(defaultTemplate),
          sender_email_type: "default",
          company: "",
        },
      };

    default:
      return state;
  }
};
export default reducer;
