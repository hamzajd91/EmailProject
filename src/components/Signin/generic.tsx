// import {getURLWithQueryParams} from "../utils/generic";

const host = "http://localhost:2020/auth/linkedin/callback";

export const LINKEDIN_STATE = "random_string";
const LINKEDIN_SCOPE = "r_basicprofile r_emailaddress";
const LINKEDIN_RIDERECT = `${host}/auth/linkedin/callback`;
const LINKEDIN_CLIENT_ID = "78iwkx1rgdfoan";

export const queryToObject = (queryString: any) => {
  const pairsString = queryString[0] === "?" ? queryString.slice(1) : queryString;
  const pairs = pairsString.split("&").map((str: any) => str.split("=").map(decodeURIComponent));
  return pairs.reduce((acc: any, [key, value]: any) => (key ? {...acc, [key]: value} : acc), {});
};

export const LINKEDIN_URL = getURLWithQueryParams("https://www.linkedin.com/oauth/v2/authorization", {
  response_type: "code",
  client_id: LINKEDIN_CLIENT_ID,
  redirect_uri: LINKEDIN_RIDERECT,
  state: LINKEDIN_STATE,
  scope: LINKEDIN_SCOPE,
});

function getURLWithQueryParams(base: any, params: any) {
  const query = Object.entries(params)
    .map(([key, value]: any) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${base}?${query}`;
}
