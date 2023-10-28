import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import  ContextProvider  from "./components/context/ContextProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ContextProvider>
);
