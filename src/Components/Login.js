import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const isUser = isAuthenticated && user;
  return (
    <span className="login-section">
      {isUser ? (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      ) : (
        <button
          onClick={() => {
            loginWithRedirect({});
          }}
        >
          Login
        </button>
      )}
    </span>
  );
};

export default Login;
