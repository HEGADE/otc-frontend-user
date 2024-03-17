import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__bottom">
            <div className="footer__end">
              <div className="footer__end-copyright">
                <p className=" mb-0">
                  © 2024 All Rights Reserved By{" "}
                  <a href="#" target="_blank">
                    OTC
                  </a>{" "}
                </p>
              </div>
              <div>
                <ul className="social">
                  <li className="social__item">
                    <Link to="#" className="social__link social__link--style22">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li className="social__item">
                    <Link
                      to="#"
                      className="social__link social__link--style22 "
                    >
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </li>
                  <li className="social__item">
                    <Link to="#" className="social__link social__link--style22">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </li>
                  <li className="social__item">
                    <Link to="#" className="social__link social__link--style22">
                      <i className="fab fa-youtube"></i>
                    </Link>
                  </li>
                  <li className="social__item">
                    <Link
                      to="#"
                      className="social__link social__link--style22 "
                    >
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__shape">
        <span className="footer__shape-item footer__shape-item--1">
          <img src="assets/images/2.png" alt="shape icon" />
        </span>
        <span className="footer__shape-item footer__shape-item--2">
          {" "}
          <span></span>{" "}
        </span>
      </div>
    </footer>
  );
};
