import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./Components/Main";
import UserHome from "./Components/UserHome";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./Components/LoginPage";

// MUI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          {(!user || !isAuthenticated) && <LoginPage />}
          {user && isAuthenticated && <UserHome />}
        </Route>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
