// const errorCodes = {
//   DEFAULT: {
//     code: -1,
//     message: 'There was an error processing your request',
//   },
//   MISSING_FIELD: {
//     code: 100,
//     message: 'Field does not exist: ',
//   },
//   VALIDATION_FAILED: {
//     code: 101,
//     message: '',
//   },
//   USER_LOCKED: {
//     code: 1001,
//     message: 'Account has been locked',
//   },
//   USER_NOT_FOUND: {
//     code: 1002,
//     message: 'User not found',
//   },
//   REGISTER_EMAIL_TAKEN: {
//     code: 1010,
//     message: 'Email has already been registered',
//   },
//   LOGIN_INVALID_CREDENTIALS: {
//     code: 1020,
//     message: 'Invalid login credentials',
//   },
//   LOGIN_EMAIL_NOT_VALIDATED: {
//     code: 1021,
//     message: 'User has not validated their email',
//   },
//   LOGIN_SOCIAL_USER: {
//     code: 1022,
//     message: 'This is a social media account',
//   },
//   RESET_EMAIL_NOT_FOUND: {
//     code: 1030,
//     message: 'Email not found',
//   },
//   RESET_TOKEN_NOT_FOUND: {
//     code: 1031,
//     message: 'Reset token not found',
//   },
//   RESET_INCORRECT_PASSWORD: {
//     code: 1032,
//     message: 'Incorrect password',
//   },
//   RESET_INVALID_TOKEN: {
//     code: 1033,
//     message: 'Invalid token',
//   },
//   RESET_TOKEN_ALREADY_CLAIMED: {
//     code: 1034,
//     message: 'Token already claimed',
//   },
//   RESET_TOKEN_EXPIRED: {
//     code: 1035,
//     message: 'Token expired',
//   },
//   ROLE_USER_MISSING: {
//     code: 1100,
//     message: 'Current roles missing user roles',
//   },
//   ROLE_USER_NO_ACCESS: {
//     code: 1101,
//     message: 'Current user roles lack required permissions',
//   },
//   ROLE_COMPANY_MISSING: {
//     code: 1110,
//     message: 'Current roles missing company roles',
//   },
//   ROLE_COMPANY_NO_ACCESS: {
//     code: 1111,
//     message: 'Current company roles lack required permissions',
//   },

//   COMPANY_NOT_FOUND: {
//     code: 2000,
//     message: 'Company not found',
//   },
//   COMPANY_UPDATE_SOCIAL_INVALID: {
//     code: 2001,
//     message: 'social needs to be an object or JSON string',
//   },
//   COMPANY_NOT_OWNER: {
//     code: 2002,
//     message: 'Company not owned by user',
//   },
//   COMPANY_FORBIDDEN: {
//     code: 2003,
//     message: 'User does not have permission to perform this action',
//   },
//   COMPANY_PROF_OVERLIMIT: {
//     code: 2010,
//     message: 'Too many proficiencies',
//   },
//   COMPANY_PROF_ARRAY: {
//     code: 2011,
//     message: 'proficiencies must be an array if defined',
//   },
//   COMPANY_IND_ARRAY: {
//     code: 2021,
//     message: 'industries must be an array if defined',
//   },

//   CLAIM_TOKEN_NOT_FOUND: {
//     code: 2100,
//     message: 'Token not found',
//   },
//   CLAIM_TOKEN_NOT_VALID: {
//     code: 2101,
//     message: 'Token not valid',
//   },
//   CLAIM_TOKEN_INVALID_USER: {
//     code: 2102,
//     message:
//       'This is the wrong account for this claim. Please log in to the correct account and try again.',
//   },
//   CLAIM_NOT_OWNER: {
//     code: 2103,
//     message: 'You are not the owner of the company',
//   },
//   CLAIM_DOMAIN_MISMATCH: {
//     code: 2104,
//     message: `Email domain does not match website's`,
//   },

//   SUBSCRIPTION_NOT_FOUND: {
//     code: 2200,
//     message: 'Subscription ID does not exist',
//   },
//   SUBSCRIPTION_TOKEN_REQUIRED: {
//     code: 2201,
//     message: 'Token is required for paid subscriptions',
//   },

//   REVIEW_NOT_FOUND: {
//     code: 2300,
//     message: 'Review not found',
//   },

//   INDUSTRY_NOT_FOUND: {
//     code: 2400,
//     message: 'Industry not found',
//   },
//   INDUSTRY_ALREADY_EXISTS: {
//     code: 2401,
//     message: 'Industry already exists',
//   },

//   PROFICIENCY_NOT_FOUND: {
//     code: 2500,
//     message: 'Proficiency not found',
//   },
//   PROFICIENCY_ALREADY_EXISTS: {
//     code: 2501,
//     message: 'Proficiency already exists',
//   },

//   REVIEWS_FORBIDDEN: {
//     code: 2600,
//     message: 'Review does not exist or can no longer be edited',
//   },

//   SEARCH_PARAMS_MISSING: {
//     code: 3010,
//     message: 'Search parameters missing',
//   },
//   SEARCH_PARAMS_EMPTY: {
//     code: 3011,
//     message: 'Search parameters empty',
//   },
// };
// export default errorCodes;

const errorCodes = (code:any) =>{
    switch (code) {
        case '-1':
            return "There was an error processing your request"
        case '100':
            return "Field does not exist: "
        case '2100':
            return "Token not found"
        case '2101':
            return "Token not Valid"
        case '2102':
            return "This is the wrong account for this claim. Please log in to the correct account and try again."
        case '2103':
            return "You are not the owner of the company, please try a different account" 
        case '2104':
            return "Email domain does not match website's"
        case '10':
            return "Your ownership of the company has been relinquished "
        default:
            break;
    }
}
export default errorCodes;