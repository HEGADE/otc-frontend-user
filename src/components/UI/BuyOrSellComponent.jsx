import { ValidationError } from "../UI/Errors";

export const BuyOrSellComponent = ({
  activeTab,
  handleNextClick,
  orderData,
  handleOnSelect,
  handleOnInputChange,
  validationErrors,
}) => {
  const networkOptions = ["ETH", "BSC", "BTC"];
  const cryptoOptions = {
    ETH: ["ETH", "USDT"],
    BSC: ["BNB", "USDT"],
    BTC: ["BTC"],
  };
  const currencyOptions = ["AED", "INR"];

  return (
    <div className="tab-content">
      <h2 className="mb-3 text-white">
        {activeTab === "buy" ? "Buy Assets" : "Sell Assets"}
      </h2>
      <form
        className="account__form needs-validation"
        onSubmit={(e) => handleNextClick(e)}
      >
        <div className="row">
          <div className="buy_crypto__formarea-group mb-5 mb-md-6">
            <label className="mb-2">Network</label>
            <div className="mb-2 br2 p-1 rounded-4 bg1-color">
              <div className="text-end">
                <div className="apex_section__slider-selector markets_section__rcard-selector">
                  <div className="f-group">
                    <div className="f-dropdown selectDropdown filled">
                      <select
                        id="select-network"
                        className="f-control f-dropdown"
                        value={orderData.network}
                        onChange={(e) => handleOnSelect(e, "network")}
                      >
                        {networkOptions.map((network) => (
                          <option value={network}>{network}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <span>Gass fee</span>
              <span className="p1-color">5 USDT</span>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="buy_crypto__formarea-group mb-5 mb-md-6">
              <label className="mb-2 text-white">
                {activeTab === "buy" ? "Buy Crypto" : "Sell Crypto"}
              </label>
              <div className="d-flex align-items-center br2 p-1 rounded-4 bg1-color">
                <input
                  style={{ backgroundColor: '#1c4c55', color: '#ffffff', borderColor: '#1c4c55' }}
                  name={activeTab === "buy" ? "receivedAmount" : "sendAmount"}
                  value={
                    activeTab === "buy"
                      ? orderData.receivedAmount
                      : orderData.sendAmount
                  }
                  type="number"
                  className="form-control showhide-pass"
                  id={
                    activeTab === "buy"
                      ? "input-receive-amount"
                      : "input-send-amount"
                  }
                  placeholder="Enter Send Amount"
                  onChange={(event) => handleOnInputChange(event)}
                />
                <div className="text-end">
                  <div className="apex_section__slider-selector markets_section__rcard-selector">
                    <div className="f-group">
                      <div className="f-dropdown selectDropdown filled">
                        <select
                          id="select-crypto"
                          className="f-control f-dropdown"
                          value={orderData.crypto}
                          onChange={(e) => handleOnSelect(e, "crypto")}
                        >
                          {orderData.network &&
                            cryptoOptions[orderData.network].map((buy) => (
                              <option value={buy}>{buy}</option>
                            ))}
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
              <ValidationError err={validationErrors.sendAmount} />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="buy_crypto__formarea-group mb-5 mb-md-6">
              <label className="mb-2 text-white">
                {activeTab == "buy" ? "Purchase Amount" : "Receive Amount"}
              </label>
              <div className="d-flex align-items-center br2 p-1 rounded-4 mb-2 bg1-color">
                <input
                  style={{ backgroundColor: '#1c4c55', color: '#ffffff', borderColor: '#1c4c55' }}
                  name={activeTab === "buy" ? "sendAmount" : "receivedAmount"}
                  value={
                    activeTab === "buy"
                      ? orderData.sendAmount
                      : orderData.receivedAmount
                  }
                  type="number"
                  className="form-control showhide-pass"
                  id={
                    activeTab === "buy"
                      ? "input-send-amount"
                      : "input-receive-amount"
                  }
                  placeholder="Enter purchase amount"
                  onChange={(event) => handleOnInputChange(event)}
                />
                <div className="text-end">
                  <div className="apex_section__slider-selector markets_section__rcard-selector">
                    <div className="f-group">
                      <div className="f-dropdown selectDropdown filled">
                        <select
                          id="select-crypto"
                          className="f-control f-dropdown"
                          value={orderData.currency}
                          onChange={(e) => handleOnSelect(e, "currency")}
                        >
                          {currencyOptions.map((currencyOption) => (
                            <option value={currencyOption}>
                              {currencyOption}
                            </option>
                          ))}
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
              <ValidationError err={validationErrors.receivedAmount} />
              <span className="text-white">1 BTC = 3,547,292 INR</span>
            </div>
          </div>
        </div>
        <div className="buy_crypto__formarea-group mb-6 mb-md-8">
          <label className="mb-2">Wallet Address</label>
          <div className="br2 p-1 rounded-4 bg1-color">
            {/* <textarea placeholder="Address" cols="15" rows="3"></textarea> */}
            <textarea
              cols="15"
              rows="3"
              name="walletAddress"
              value={orderData.walletAddress}
              style={{ backgroundColor: '#1c4c55', color: '#ffffff', borderColor: '#1c4c55' }}
              type="text"
              className="form-control showhide-pass"
              id="input-wallet-address"
              placeholder="Enter wallet address"
              onChange={(event) => handleOnInputChange(event)}
            />
          </div>
        </div>
        <ValidationError err={validationErrors.walletAddress} />
        {/* <div className="buy_crypto__formarea-group mb-6 mb-md-8">
          <label className="mb-2">Primary Transaction Receipt</label>
          <div className="br2 p-1 rounded-4 bg1-color">
            <input
              name="primaryTransactionReceipt"
              value={orderData.primaryTransactionReceipt}
              type="text"
              className="form-control showhide-pass"
              id="input-primary-transaction-receipt"
              placeholder="Enter primary transaction receipt"
              onChange={(event) => handleOnInputChange(event)}
            />
          </div>
        </div>
        <ValidationError err={validationErrors.primaryTransactionReceipt} /> */}
        <br />
        <button type="submit" className="cmn-btn py-3 px-5 px-md-6 d-block">
          Next
        </button>
      </form>
    </div>
  );
};
