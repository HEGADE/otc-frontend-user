import React from "react";
import loadjs from "loadjs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import Login from "./pages/Login";
import MultifactorAuth from "./pages/MultifactorAuth";
import { Navbar } from "./components/UI/Navbar";
import { Footer } from "./components/UI/Footer";
import { Preloader } from "./components/UI/Preloader";
import { Addphone } from "./pages/PhoneVerify";
import { useUserStore } from "./store/user.store";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { ResetPassword } from "./components/Auth/ResetPassword";
import { Dashboard } from "./components/UI/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProfile } from "./components/UI/UserProfile/UserProfile";
import { Order } from "./components/UI/Order/Order";
import MessageContainer from "./components/UI/Messages/MessageContainer";
import MessageIcon from "./components/UI/MessageIcon";

function App() {
  const [pageLoading, setPageLoading] = React.useState(false);
  const isAuthenticated = useUserStore((state) => !!state.accessToken);
  const user = useUserStore((state) => state.user);
  console.log("🟡 user: ", user);
  console.log("🟡 accessToken: ", isAuthenticated);


  // SCRIPT LOAD
  const runScript = () => {
    loadjs(
      [
        "/assets/js/all.min.js",
        "/assets/js/aos.js",
        "/assets/js/bootstrap.bundle.min.js",
        "/assets/js/custom.js",
        "/assets/js/fslightbox.js",
        "/assets/js/niceCountryInput.js",
        "/assets/js/plugins.js",
        "/assets/js/plugin-custom.js",
        "/assets/js/purecounter_vanilla.js",
        "/assets/js/swiper-bundle.min.js",
        "assets/js/bootstrap.bundle.min.js",
        "assets/js/all.min.js",
        "assets/js/swiper-bundle.min.js",
        "assets/js/aos.js",
        "assets/js/fslightbox.js",
        "assets/js/custom.js",
      ],
      () => {
        console.info("Scripts Loaded!");
      }
    );
  };

  React.useEffect(() => {
    runScript();
    setPageLoading(true);

    setTimeout(() => {
      setPageLoading(false);
    }, [1500]);
  }, []);

  const NavbarLayout = () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );

  return (
    <>
      {pageLoading && <Preloader />}
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              isAuthenticated && user ? (
                user.isEmailVerified && user.isPhoneNumberVerified ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/verify" />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route path="/Phone" element={<Addphone />} />
          <Route
            path="/verify"
            element={
              isAuthenticated && user ? (
                user.isEmailVerified && user.isPhoneNumberVerified ? (
                  <Navigate to="/" />
                ) : (
                  <MultifactorAuth />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<NavbarLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/messages" element={<MessageContainer />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/orders" element={<Order />} />
            </Route>
          </Route>
          <Route path="*" element={<p>404 Page</p>} />
        </Routes>
        {isAuthenticated &&
          user &&
          user.isEmailVerified &&
          user.isPhoneNumberVerified && <MessageIcon />}
      </Router>
    </>
  );
}

export default App;
