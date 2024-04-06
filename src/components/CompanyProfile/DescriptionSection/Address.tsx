import React from "react";
import "./index.scss";

export default function Address(props: any) {
  let phNo;
  const {profile} = props;
  if (profile.phone.includes("(", 0)) {
    phNo = profile.phone;
  } else {
    phNo = [profile.phone.slice(0, 0), "(", profile.phone.slice(0)].join("");
    phNo = [phNo.slice(0, 4), ")", phNo.slice(4)].join("");
    phNo = [phNo.slice(0, 5), " ", phNo.slice(5)].join("");
    phNo = [phNo.slice(0, 9), "-", phNo.slice(9)].join("");
  }
  return (
    <>
      <span>
        {profile.address1} {profile.address2 ? profile.address2 : ""}
      </span>
      <br />
      <span>
        {profile.city}, {profile.state} {profile.postalCode}, {profile.country}
      </span>
      <br />
      <span>{phNo}</span>
      <br />
      {profile.repName && (
        <>
          <span>Contact: {profile.repName}</span> <br />
        </>
      )}
      {profile.repEmail && <span>{profile.repEmail}</span>}
    </>
  );
}
