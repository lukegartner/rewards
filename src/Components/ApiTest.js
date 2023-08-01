import { url } from "../utils/urls";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const ApiTest = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();
  const isUser = isAuthenticated && user;
  console.log(user);

  return (
    <div>
      {isUser && user.picture && <img src={user.picture} alt={user.name}></img>}
      {isUser && user.name && <h4>Welcome, {user.name.toUpperCase()}</h4>}

      {isUser ? (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      ) : (
        <button onClick={loginWithRedirect}>login</button>
      )}

      <h4>Api Test</h4>
    </div>
  );
};

export default ApiTest;
