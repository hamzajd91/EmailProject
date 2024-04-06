import React, {useEffect, useState} from "react";
import "./index.scss";
import {Loader} from "../Loader";
import qs from "qs";
import {Link} from "react-router-dom";
import appApi from "../../services/appApi";

function VerifyEmail(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  useEffect(() => {
    const query = qs.parse(location.search, {ignoreQueryPrefix: true}) as any;
    if (query.token) {
      validateEmail(query.token);
    } else {
      setIsLoading(false);
      setisError(true);
    }
  }, []);

  const validateEmail = async (token: string) => {
    try {
      await appApi.post("/users/verify", {token: token});
      setIsLoading(false);
      setisError(false);
    } catch (error) {
      setIsLoading(false);
      setisError(true);
    }
  };

  return (
    <section className="login_Section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="box_Card mt-5">
              {isLoading ? (
                <Loader />
              ) : isError ? (
                <div className="text-center">
                  <h3 className="text-danger">Oh no!</h3>
                  <p className="m-0">The token is invalid or has expired, to send a new one Click Here</p>
                  <Link to="verify/resend" className="Button">
                    Resend Link
                  </Link>
                </div>
              ) : (
                <p className="m-0">Email verified successfully.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifyEmail;
