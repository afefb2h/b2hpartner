import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import "./index.scss";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import FontFaceObserver from "fontfaceobserver";
import history from "./utils/history";
import configureStore from "./utils/configureStore";
import "bootstrap/dist/css/bootstrap.css";
import * as dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});
// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
  process.env[envName] = process.env[envName].replace(/\\n/g, "\n");
}
console.info("env ***", process.env);

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver("Montserrat", {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  console.log("font was loaded *******");
  document.body.classList.add("fontLoaded");
});
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
