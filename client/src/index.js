import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { DetailsContextProvider } from "./Components/Context/detailsContext";

ReactDOM.render(
  <React.StrictMode>
    <DetailsContextProvider>
      <App />
    </DetailsContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
