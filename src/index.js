import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider } from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
