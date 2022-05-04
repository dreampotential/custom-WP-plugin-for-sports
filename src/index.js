import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./_reducers";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import CssBaseline from "@mui/material/CssBaseline";
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk
)(createStore);
const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    {/* <CssBaseline /> */}
    <App />
  </Provider>,
  document.getElementById("dw-widget-container")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
