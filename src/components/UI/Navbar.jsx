import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header
      className="header-section header-section--style4"
    >
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <Link to="/">
                <img src="assets/images/logo/logo-dark.png" alt="logo" />
              </Link>
            </div>
            <div className="menu-area">
              <ul className="menu menu--style2">
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </div>
            <div className="header-action">
              <div className="menu-area">
                <div className="header-btn">
                  <Link
                    to="/kyc-step1"
                    className="trk-btn trk-btn--border trk-btn--primary"
                  >
                    <span>Submit KYC</span>
                  </Link>
                </div>
                <Link to="/login" className="ml-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 24 24"
                    fill="#fff"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
                  </svg>
                </Link>
                <div className="header-bar d-lg-none header-bar--style2">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
