import React from "react";
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18next={i18next}>
    <App />
  </I18nextProvider>
);

reportWebVitals();
