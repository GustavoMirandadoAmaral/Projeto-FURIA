import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FormProvider } from "./context/FormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FormProvider>
      <App />
    </FormProvider>
  </BrowserRouter>
);
