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
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h2 style={{ color: "white" }}>My Profile</h2>
            <h2>Hello</h2>
          </div>
          <div className="page-header__shape">
            <span className="page-header__shape-item page-header__shape-item--1">
              <img src="assets/images/2.png" alt="shape-icon" />
            </span>
          </div>
        </div>
      </section>

      <section class="account padding-top padding-bottom sec-bg-color2">
        <div class="container">
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
        <div class="account__shape">
          <span class="account__shape-item account__shape-item--1">
            <img src="assets/images/2.png" alt="shape-icon" />
          </span>
        </div>
      </section>
    </>
  );
};
