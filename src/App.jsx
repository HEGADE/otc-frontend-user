import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import Login from "./pages/Login";
import MultifactorAuth from "./pages/MultifactorAuth";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { ResetPassword } from "./components/Auth/ResetPassword";
import { Dashboard } from "./components/UI/Dashboard";
import { useUserStore } from "./store/user.store";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isAuthenticated = useUserStore((state) => !!state.accessToken);

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
          {/* <Route path="/login/two-step-auth" element={<MultifactorAuth />} /> */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<p>404 Page</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
