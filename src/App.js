import Header from "./Components/Header";
import Footer from "./Components/Footer";
import UserHome from "./Components/UserHome";
import AdminHome from "./Components/AdminHome";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./Components/LoginPage";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3730a3",
      light: "#4f46e5",
      dark: "#1e1b4b",
      contrastText: "#c7d2fe",
    },
    secondary: {
      main: "#be123c",
      light: "#f43f5e",
      dark: "#9f1239",
      contrastText: "#fecdd3",
    },
    background: {
      default: "#020617",
      paper: "#0f172a",
    },
  },
});

function App() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Header />
          <Route path="/user">
            {(!user || !isAuthenticated) && <LoginPage />}
            {user && isAuthenticated && <UserHome />}
          </Route>
          <Route path="/admin">
            <AdminHome />
          </Route>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
