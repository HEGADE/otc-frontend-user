import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import Login from "./pages/Login";
import MultifactorAuth from "./pages/MultifactorAuth";
import { Navbar } from "./components/UI/Navbar";
import { Footer } from "./components/UI/Footer";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { ResetPassword } from "./components/Auth/ResetPassword";
import { Dashboard } from "./components/UI/Dashboard";
import { useUserStore } from "./store/user.store";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProfile } from "./components/UI/UserProfile";

function App() {
  const isAuthenticated = useUserStore((state) => !!state.accessToken);

  const NavbarLayout = () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/two-step-auth" element={<MultifactorAuth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<NavbarLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Route>
          <Route path="*" element={<p>404 Page</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
