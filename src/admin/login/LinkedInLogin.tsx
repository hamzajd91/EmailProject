import React from 'react';
import { Button } from 'react-bootstrap';

const LinkedInLogin = () => {
    function signInWithLinkedin() {
      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77ayyujnyaw6to&scope=r_liteprofile,r_emailaddress&state=none&redirect_uri=http://192.168.29.204:3001/firms/login/callback';
    }


  return (
    <div className="app-content content">
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <div className="content-wrapper">
        <div className="card">
          <div className="card-header d-block">
            <div className="row">
              <Button className="m-5" onClick={signInWithLinkedin}>
                Login
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LinkedInLogin;
