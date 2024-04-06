import React, {useEffect} from "react";
import "./index.scss";
import {Loader} from "../Loader";
import appApi from "../../services/appApi";

function CompanyClaim(props: any) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [companyName, setCompanyName] = React.useState("");

  useEffect(() => {
    setIsError(false);
    const getClaimedUser = async () => {
      const params = new URLSearchParams(props.location.search);
      const token = params.get("token");
      const free = params.get("free");
      const subscription = params.get("subscription");

      const companyId = props.match.params.id;
      const body = {
        token: token,
        free: free,
      };
      try {
        const res = await appApi.post(`companies/${companyId}/validateClaim`, body);
        setCompanyName(res.data.companyName);
        setIsLoading(false);
      } catch (error) {
        if (subscription === "true") {
          return props.history.push(`/companies/${companyId}/subscribe`);
        }
        props.history.push(error.response.data.url);
      }
    };
    getClaimedUser();
  }, []);
  return (
    <section className="pt-5 pb-5 text-center" style={{fontWeight: 600}}>
      {isLoading ? <Loader /> : `You have successfully claimed ${companyName}.  Please go to My Accounts Page and Company Tab to review your newly claimed company.`}
      {isError ? (
        <div className="text-center">
          <h3>Somethig went wrong.</h3>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default CompanyClaim;
