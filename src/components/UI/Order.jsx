export const Order = () => {
  return (
    <>
      <section
        class="page-header bg--cover"
        style={{ backgroundImage: "url(assets/images/breadcrumb.png)"}}
      >
        <div class="container">
          <div
            class="page-header__content mt-100 text-center"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h2>Orders</h2>
          </div>
          <div class="page-header__shape">
            <span class="page-header__shape-item page-header__shape-item--1">
              <img src="assets/images/2.png" alt="shape-icon" />
            </span>
          </div>
        </div>
      </section>
      <section class="pools_table padding-top padding-bottom bg5-color">
        <div class="container">
          <div class="row">
            <div class="pools_table__part">
              <div class="singletab">
                <div class="demo">
                  <div class="tab">
                    <div class="tab-wrapper" style={{ padding: "20px" }} >
                      <input
                        id="tab1"
                        type="radio"
                        name="tabsA"
                        class="radio-inputs"
                        checked
                      />
                      <label class="tab-button order-btn" for="tab1">
                        All Orders
                      </label>
                      <div class="tab-content">
                        <div class="pools_table__totalitem overflow-auto">
                          <table>
                            <th>Order Name</th>
                            <th>
                              <div class="d-flex align-items-center gap-1">
                                <span>Transaction Fees</span>
                                <div class="d-flex flex-column gap-0">
                                  <i class="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                                  <i class="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
                                </div>
                              </div>
                            </th>
                            <th>
                              <div class="d-flex align-items-center gap-1">
                                <span>Amount Recieved</span>
                                <div class="d-flex flex-column gap-0">
                                  <i class="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                                  <i class="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
                                </div>
                              </div>
                            </th>
                            <th>
                              <div class="d-flex align-items-center gap-1">
                                <span>TDS</span>
                                <div class="d-flex flex-column gap-0">
                                  <i class="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                                  <i class="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
                                </div>
                              </div>
                            </th>
                            <th>Type</th>
                            <th>Status</th>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style= {{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Completed
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Pending
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Completed
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Completed
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Completed
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Pending
                                </a>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <input
                        id="tab2"
                        type="radio"
                        class="radio-inputs"
                        name="tabsA"
                      />
                      <label class="tab-button order-btn" for="tab2">
                        Open Orders
                      </label>
                      <div class="tab-content">
                        <div class="pools_table__totalitem overflow-auto">
                          <table>
                            <th>Order Name</th>
                            <th>
                              <div class="d-flex align-items-center gap-1">
                                <span>Transaction Fees</span>
                                <div class="d-flex flex-column gap-0">
                                  <i class="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                                  <i class="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
                                </div>
                              </div>
                            </th>
                            <th>
                              <div class="d-flex align-items-center gap-1">
                                <span>Amount Recieved</span>
                                <div class="d-flex flex-column gap-0">
                                  <i class="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                                  <i class="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
                                </div>
                              </div>
                            </th>
                            <th>
                              <div class="d-flex align-items-center gap-1">
                                <span>TDS</span>
                                <div class="d-flex flex-column gap-0">
                                  <i class="ti ti-caret-up-filled fs-nine cpoint pools_table__totalitem-ticonone"></i>
                                  <i class="ti ti-caret-down-filled fs-nine cpoint pools_table__totalitem-ticontwo"></i>
                                </div>
                              </div>
                            </th>
                            <th>Type</th>
                            <th>Status</th>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Pending
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Pending
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Completed
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Pending
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Pending
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="pools_table__totalitem-ftd d-flex align-items-center gap-3 gap-md-4 ms-3 ms-md-6">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="assets/images/btc.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                    <img
                                      class="pools_table__totalitem-img"
                                      src="assets/images/inr.png"
                                      style={{ height: "30px" }}
                                      alt="Icons"
                                    />
                                  </div>
                                  <div class="d-flex flex-column">
                                    <span class="roboto fw-bold">BTC</span>
                                    <span class="roboto">INR</span>
                                  </div>
                                </div>
                              </td>
                              <td class="p1-color fs-ten">98318 INR (3%)</td>
                              <td>432390 INR</td>
                              <td>32780 INR (1%)</td>
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <span>Buy Order</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  class="cmn-btn py-2 px-6 px-md-8 p1-color"
                                  href="javascript:void(0)"
                                >
                                  Pending
                                </a>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
