import {action} from "typesafe-actions";
import {ReviewInvitaionTypes} from "./types";

export const setCustomerForReview = (paramas: any) => action(ReviewInvitaionTypes.SET_CUSTOMER, paramas);
export const setSenderInformation = (paramas: any) => action(ReviewInvitaionTypes.SET_SENDER_INFORMATION, paramas);
export const resetInformation = () => action(ReviewInvitaionTypes.RESET_INFORMATION);
