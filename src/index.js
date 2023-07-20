import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider } from "@material-tailwind/react";
import { InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

const root = ReactDOM.createRoot(document.getElementById("root"));
const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_KEY
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <InstantSearch indexName="products" searchClient={searchClient}>
          <App />
        </InstantSearch>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
