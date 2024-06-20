import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

import { baseURL, key } from "./component/utils/config";
import Loader from "./component/utils/Loader";
import axios from "axios"
import { CLOSE_LOADER, OPEN_LOADER } from "./redux/slice/loading.type";

// Default Base URL Join In Axios
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common["key"] = key;

// axios.interceptors.request.use(
//   (req) => {
//     store.dispatch({ type: OPEN_LOADER });
//     // Real Admin
//     return req;
//   },
//   (error) => {
//     console.log(error);
//   }
// );

// axios.interceptors.response.use(
//   (res) => {
//     store.dispatch({ type: CLOSE_LOADER });
//     return res;
//   },
//   (err) => {
//     if (err.message === "Network Error") {
//       // store.dispatch({ type: SET_NETWORK_ERROR });
//     }
//     store.dispatch({ type: CLOSE_LOADER });
//     return Promise.reject(err);
//   }
// );


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer style={{ zIndex: "999999" }} 
        />
        <Loader />
      </Provider>
    </BrowserRouter>,
    // </React.StrictMode>  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
