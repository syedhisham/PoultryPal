import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./index.css";
import { store } from "./redux/index";
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Elements } from "@stripe/react-stripe-js"; // Import Elements
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51QY8ceGjkBvIbb1t44yllQOTlsvJ80ErOy1BXV3s4LIRVJEYnWwY10MY5Hmj8K2waRSEXkOlqwr5TSxO6fDqG5nn00PAMYNaIc");


const clientId = '916953586165-mflf9vl7fco280tt791u9n20im4n3l1u.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId={clientId}>
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
      <Elements stripe={stripePromise}>
            <App />
          </Elements>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
