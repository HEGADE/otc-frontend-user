export const BuyComponent = () => {
  return (
    <div className="tab-content">
      <h2 className="mb-3 text-white">Buy Assets</h2>
      <form>
        <div className="row">
          <div className="col-lg-12">
            <div className="buy_crypto__formarea-group mb-5 mb-md-6">
              <label className="mb-2 text-white">Spend</label>
              <div className="d-flex align-items-center br2 p-1 rounded-4 bg1-color">
                <input type="text" placeholder="2201-650,600" />
                <div className="text-end">
                  <div className="apex_section__slider-selector markets_section__rcard-selector">
                    <div className="f-group">
                      <div className="f-dropdown selectDropdown filled">
                        <select id="select3" className="f-control f-dropdown">
                          <option
                            value="1"
                            selected=""
                            dataImage="assets/images/btc.png"
                          >
                            BTC
                          </option>
                          <option value="2" data-image="assets/images/eth.png">
                            ETH
                          </option>
                          <option value="3" data-image="assets/images/usdt.png">
                            USDT
                          </option>
                          <option value="4" data-image="assets/images/inr.png">
                            INR
                          </option>
                        </select>
                        <ul>
                          <li className="active">
                            <a data-val="1">
                              <img src="assets/images/btc.png" />
                              <span>BTC</span>
                            </a>
                          </li>
                          <li>
                            <a data-val="2">
                              <img src="assets/images/icon/eth.png" />
                              <span>ETH</span>
                            </a>
                          </li>
                          <li>
                            <a data-val="3">
                              <img src="assets/images/usdt.png" />
                              <span>USDT</span>
                            </a>
                          </li>
                          <li>
                            <a data-val="4">
                              <img src="assets/images/inr.png" />
                              <span>TLP</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="buy_crypto__formarea-group mb-5 mb-md-6">
              <label className="mb-2 text-white">Receive</label>
              <div className="d-flex align-items-center br2 p-1 rounded-4 mb-2 bg1-color">
                <input type="text" placeholder="Enter purchase amount" />
                <div className="text-end">
                  <div className="apex_section__slider-selector markets_section__rcard-selector">
                    <div className="f-group">
                      <div className="f-dropdown selectDropdown filled">
                        <select id="select4" className="f-control f-dropdown">
                          <option value="1" data-image="assets/images/usdt.png">
                            USDT
                          </option>
                          <option value="2" data-image="assets/images/eth.png">
                            ETH
                          </option>
                          <option value="3" data-image="assets/images/btc.png">
                            BTC
                          </option>
                          <option
                            value="4"
                            selected=""
                            data-image="assets/images/inr.png"
                          >
                            INR
                          </option>
                        </select>
                        <ul>
                          <li>
                            <a data-val="1">
                              <img src="assets/images/usdt.png" />
                              <span>USDT</span>
                            </a>
                          </li>
                          <li>
                            <a data-val="2">
                              <img src="assets/images/eth.png" />
                              <span>ETH</span>
                            </a>
                          </li>
                          <li>
                            <a data-val="3">
                              <img src="assets/images/btc.png" />
                              <span>BTC</span>
                            </a>
                          </li>
                          <li className="active">
                            <a data-val="4">
                              <img src="assets/images/inr.png" />
                              <span>INR</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <span className="text-white">1 BTC = 3,547,292 INR</span> */}
            </div>
          </div>
        </div>
        <div className="buy_crypto__formarea-group mb-5 mb-md-6">
          <label className="mb-2">Network</label>
          <div className="mb-2 br2 p-1 rounded-4 bg1-color">
            <div className="text-end">
              <div className="apex_section__slider-selector markets_section__rcard-selector">
                <div className="f-group">
                  <div className="f-dropdown selectDropdown filled">
                    <select id="select5" className="f-control f-dropdown">
                      <option value="1" selected="">
                        Eth Chain
                      </option>
                      <option value="2">Bnb Chain</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <span>Tax Deduction At Source (TDS)</span>
            <span className="p1-color">1%</span>
          </div>
        </div>
        <div className="buy_crypto__formarea-group mb-6 mb-md-8">
          <label className="mb-2">Wallet Address</label>
          <div className="br2 p-1 rounded-4 bg1-color">
            <textarea placeholder="Address" cols="15" rows="1"></textarea>
          </div>
        </div>
        <br />
        <a
          href="dashboard-3.html"
          className="cmn-btn py-3 px-5 px-md-6 d-block"
        >
          Buy Order
        </a>
      </form>
    </div>
  );
};
