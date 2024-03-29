import { BankDetails } from "./BankDetails";
import { UserDetails } from "./UserDetails";

export const UserProfile = () => {
  return (
    <>
      <section
        className="page-header bg--cover"
        style={{ backgroundImage: "url('assets/images/breadcrumb.png')" }}
      >
        <div className="container">
          <div
            className="page-header__content mt-100 text-center"
            // data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h2>My Profile</h2>
          </div>
          <div className="page-header__shape">
            <span className="page-header__shape-item page-header__shape-item--1">
              <img src="assets/images/2.png" alt="shape-icon" />
            </span>
          </div>
        </div>
      </section>

      <section className="account padding-top padding-bottom sec-bg-color2">
        <div className="container">
          {/* <div
            class="account__wrapper"
            data-aos="fade-up"
            data-aos-duration="800"
          > */}
          <div className="row g-4">
            <UserDetails />
            <BankDetails />
          </div>
          {/* </div> */}
        </div>
        <div className="account__shape">
          <span className="account__shape-item account__shape-item--1">
            <img src="assets/images/2.png" alt="shape-icon" />
          </span>
        </div>
      </section>
    </>
  );
};
