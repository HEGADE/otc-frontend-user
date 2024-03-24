import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ValidationError } from "../UI/Errors";
import { transactionDetailsSchema } from "../../utils/validation/auth.validation";

export const BuyOrSellComponent = ({
  header,
  handleNextClick,
  orderData,
  handleOnSelect,
  handleOnInputChange,
}) => {
  const networkOptions = ["ETH", "BSC"];
  const cyptoOptions = {
    ETH: ["ETH", "USDT"],
    BSC: ["BNB", "USDT"],
  };
  const currencyOptions = ["AED", "INR"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionDetailsSchema),
  });

  return (
    <div className="tab-content">
      <h2 className="mb-3 text-white">{header}</h2>
      <form
        className="account__form needs-validation"
        onSubmit={handleSubmit(() => handleNextClick())}
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
              <label className="mb-2 text-white">Buy Crypto</label>
              <div className="d-flex align-items-center br2 p-1 rounded-4 bg1-color">
                <input
                  {...register("sendAmount")}
                  name="sendAmount"
                  value={orderData.sendAmount}
                  type="number"
                  className="form-control showhide-pass"
                  id="input-send-amount"
                  placeholder="Enter Send Amount"
                  onChange={(event) => handleOnInputChange(event)}
                />
                <div className="text-end">
                  <div className="apex_section__slider-selector markets_section__rcard-selector">
                    <div className="f-group">
                      <div className="f-dropdown selectDropdown filled">
                        <select
                          id="select-buy"
                          className="f-control f-dropdown"
                          value={orderData.crypto}
                          onChange={(e) => handleOnSelect(e, "crypto")}
                        >
                          {orderData.network &&
                            cyptoOptions[orderData.network].map((buy) => (
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
              <ValidationError err={errors.sendAmount} />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="buy_crypto__formarea-group mb-5 mb-md-6">
              <label className="mb-2 text-white">Purchase Amount</label>
              <div className="d-flex align-items-center br2 p-1 rounded-4 mb-2 bg1-color">
                <input
                  {...register("receivedAmount")}
                  name="receivedAmount"
                  value={orderData.receivedAmount}
                  type="number"
                  className="form-control showhide-pass"
                  id="input-receive-amount"
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
                          {/* <option
                            value="usdt"
                            data-image="assets/images/usdt.png"
                          >
                            USDT
                          </option>
                          <option
                            value="eth"
                            data-image="assets/images/eth.png"
                          >
                            ETH
                          </option>
                          <option
                            value="btc"
                            data-image="assets/images/btc.png"
                          >
                            BTC
                          </option>
                          <option
                            value="inr"
                            selected=""
                            data-image="assets/images/inr.png"
                          >
                            INR
                          </option> */}
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
              <ValidationError err={errors.receivedAmount} />
              <span className="text-white">1 BTC = 3,547,292 INR</span>
            </div>
          </div>
        </div>
        <div className="buy_crypto__formarea-group mb-6 mb-md-8">
          <label className="mb-2">Wallet Address</label>
          <div className="br2 p-1 rounded-4 bg1-color">
            {/* <textarea placeholder="Address" cols="15" rows="3"></textarea> */}
            <textarea
              {...register("walletAddress")}
              cols="15"
              rows="3"
              name="walletAddress"
              value={orderData.walletAddress}
              type="text"
              className="form-control showhide-pass"
              id="input-wallet-address"
              placeholder="Enter wallet address"
              onChange={(event) => handleOnInputChange(event)}
            />
          </div>
        </div>
        <ValidationError err={errors.walletAddress} />
        <div className="buy_crypto__formarea-group mb-6 mb-md-8">
          <label className="mb-2">Primary Transaction Receipt</label>
          <div className="br2 p-1 rounded-4 bg1-color">
            <input
              {...register("primaryTransactionReceipt")}
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
        <ValidationError err={errors.primaryTransactionReceipt} />
        <br />
        <button type="submit" className="cmn-btn py-3 px-5 px-md-6 d-block">
          Next
        </button>
      </form>
    </div>
  );
};
