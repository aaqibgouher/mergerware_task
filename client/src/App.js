import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import pages
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./middleware/PrivateRoute";
import SnackbarComponent from "./components/helpers/SnackbarComponent";
import DialogComponent from "./components/helpers/DialogComponent";

function App() {
  return (
    <>
      <Router>
        <DialogComponent />
        <SnackbarComponent />
        <Routes>
          {/* Auth routes */}
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<DashboardPage />}></Route>
          </Route>

          {/* Non auth routes */}
          <Route path="/register" element={<AuthPage />}></Route>
          <Route path="/login" element={<AuthPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
