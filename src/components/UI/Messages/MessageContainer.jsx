import React from "react";
import Conversation from "./Conversation";

function MessageContainer() {
  return (
    <div>
      <section
        className="page-header bg--cover"
        style={{ backgroundImage: "url(/assets/images/banner/4.jpg)" }}
      >
        <div className="container">
          <div
            className="page-header__content mt-100 text-center"
            data-aos-duration="1000"
          >
            <h2>Messages</h2>
          </div>
          <div className="page-header__shape">
            <span className="page-header__shape-item page-header__shape-item--1">
              <img src="/assets/images/2.png" alt="shape-icon" />
              <img src="/assets/images/2.png" alt="shape-icon" />
            </span>
          </div>
        </div>
      </section>

      <section className="account padding-top padding-bottom sec-bg-color2">
        <div className="container">
          <div className="row g-4">
            <div className="container-fluid">
              <div className="row justify-content-center">
                {/* <div className="col-md-4">
                  <SideBar />
                </div> */}
                <div className="col-md-6">
                  <Conversation />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="account__shape">
          <span className="account__shape-item account__shape-item--1">
            <img src="/assets/images/2.png" alt="shape-icon" />
          </span>
        </div>
      </section>
    </div>
  );
}

export default MessageContainer;
