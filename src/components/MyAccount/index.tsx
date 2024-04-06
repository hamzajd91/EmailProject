import React from "react";
import {Row, Col, Container} from "react-bootstrap";
// import {Switch, Route} from "react-router-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.scss";
import User from "./User";
import Dashboard from "./Dashboard";
import Review from "./Reviews";
import Bookmarks from "./Bookmarks";
import UserCompanies from "./UserCompanies";
import ReviewInvitation from "./ReviewInvitation";
import ReviewInvitationAddUser from "./ReviewInvitation/AddUser";
import ReviewInvitationSend from "./ReviewInvitation/Send";
import ReviewInvitationCSV from "./ReviewInvitation/ReviewInvitationCSV";
import ReviewInvitationHistory from "./ReviewInvitation/History";
import EmailTemplates from "./EmailTemplate/index";
import Settings from "./Settings";
import TopHeader from "./TopHeader";

export default function Account(props: any) {
  return (
    <React.Fragment>
      <TopHeader {...props} />
      <div className="account_bg">
        <Container>
          <Row className="justify-content-md-center">
            <Col sm={12}>

            <BrowserRouter>
              <Routes>
              <Route  {...props} path={`/user`}  element={User} />
                <Route  {...props} path={`/user/dashboard`}  element={Dashboard} />
                <Route  {...props} path={`/user/reviews`}  element={Review} />
                <Route  {...props} path={`/user/reviews/:companyId/invitation`}  element={ReviewInvitation} />
                <Route  {...props} path={`/user/reviews/invitation/history`}  element={ReviewInvitationHistory} />
                <Route
                  
                  {...props}
                  path={`/user/reviews/:companyId/invitation/send`}
                   element={ReviewInvitationSend}
                />
                <Route
                  
                  {...props}
                  path={`/user/reviews/:companyId/invitation/csv`}
                   element={ReviewInvitationCSV}
                />
                <Route
                  
                  {...props}
                  path={`/user/reviews/:companyId/invitation/add/users`}
                   element={ReviewInvitationAddUser}
                />
                <Route  {...props} path={`/user/bookmarks`}  element={Bookmarks} />
                <Route  {...props} path={`/user/email/template`}  element={EmailTemplates} />
                <Route  {...props} path={`/user/companies`}  element={UserCompanies} />
                <Route  {...props} path={`/user/settings`}  element={Settings} />
              </Routes>
            </BrowserRouter>

               



            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
