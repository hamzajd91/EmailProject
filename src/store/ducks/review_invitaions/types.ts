/**
 * Review Invitations
 */

export enum ReviewInvitaionTypes {
  SET_CUSTOMER = "@review/SET_CUSTOMER",
  SET_SENDER_INFORMATION = "@review/SET_SENDER_INFORMATION",
  RESET_INFORMATION = "@review/RESET_INFORMATION",
}

export interface ReviewInvitaionState {
  customers: any;
  sender_information: {
    template: any;
    subject: string;
    sender_name: string;
    reply_to_email: string;
    company: string;
    sender_email_type: string;
    // emailTemplate: string;
    // custom_email: string;
  };
}
