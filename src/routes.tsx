import React from 'react';
// import { withRouter} from "react-router-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import SiteLayout from "./layout/site/index";
import AdminLayout from "./layout/admin/index";

const Routing = () => {
    return ( <> 
    
    <BrowserRouter>
        <Routes>
            <Route path="/admin" element={AdminLayout}/>
            <Route path="/" element={SiteLayout}/>
     </Routes>
      </BrowserRouter>

    </>);
};

// export default connect()(withRouter(Routing));

export default connect()(Routing);