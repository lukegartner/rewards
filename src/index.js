import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";

import store from "./redux/store";

// Domain dev-h3q8th75zwvdmzlb.us.auth0.com
// Client Id jcHj3b6PRxbzy2GmPq0sO2Kj8cgt5M9f
// Slient Secret aH13tq0KwTV7a-1lyKrsWVyq09cQXTKi6qSH4g9RnsVPScjuxotY6H8SPcQo5BKg

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-h3q8th75zwvdmzlb.us.auth0.com"
      clientId="jcHj3b6PRxbzy2GmPq0sO2Kj8cgt5M9f"
      authorizationParams={{
        redirect_uri: window.location.origin,
        connection: "planningcenter",
        connection_scope: "people services",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
