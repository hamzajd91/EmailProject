import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Hindsyght from "./Hindsyght";
import Routing from "./routes";

import store from "./store";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import './sass/index.scss';
import "./theme/index2.scss";

// import { render } from 'react-snapshot';
//
// - ReactDOM.render(
// + render(
//     <App/>,
//     document.getElementById('root')
//   );

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#154260",
    },
  },
});

setTimeout(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter forceRefresh={false}>
        <ThemeProvider theme={outerTheme}>
          <Routing />
          {/* <ToastContainer /> */}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById("hindsyght") as HTMLElement
  );
}, 5);
