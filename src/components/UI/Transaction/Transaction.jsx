import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import { cryptoOptions } from "../../../utils/config/constants";
import axios from "../../../lib/http-request";
import { API } from "../../../utils/config/api-end-points.config";
import { calculateAmountAfterTDS } from "../../../utils/config/helper-functions";
import { useUserStore } from "../../../store/user.store";
import { BuyOrSellComponent } from "./BuyOrSellComponent";
import { AccountComponent } from "./AccountComponent";
import { WalletComponent } from "./WalletComponent";

export const Transaction = () => {
  let initialOrderData = {
    network: "ETH",
    transactionType: "FIAT",
    crypto: "USDT",
    currency: "INR",
    sendAmount: null,
    receivedAmount: null,
    receivedAmountAfterTdsDeduction: null,
    bankAccount: null,
    walletAddress: "",
    primaryTransactionReceipt: "",
  };

  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);
  // console.log("🟡 user: ", user);

  const [cryptoPrice, setCryptoPrice] = useState({
    BTC: null,
    ETH: null,
    BNB: null,
    USDT: null,
  });

  const [activeTab, setActiveTab] = useState("buy");
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({
    sendAmount: { message: "" },
    receivedAmount: { message: "" },
    walletAddress: { message: "" },
    primaryTransactionReceipt: { message: "" },
  });

  const [adminBankDetails, setAdminBankDetails] = useState({
    accountHolderName: "Admin",
    accountNumber: "",
    bankName: "",
    branch: "",
    ifsCode: "",
  });

  const [adminWalletsList, setAdminWalletsList] = useState([]);

  const [adminWalletDetails, setAdminWalletDetails] = useState({
    id: "",
    walletAddress: "",
    network: "",
    status: "",
  });

  const [userBankDetails, setUserBankDetails] = useState({
    accountHolderName: "User",
    accountNumber: "",
    bankName: "",
    branch: "",
    ifsCode: "",
  });

  const [orderData, setOrderData] = useState(initialOrderData);

  // price api start
  const fetchCryptoPrice = async () => {
    console.info("🟣 coingecko api call 🔥");
    const priceData = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinance-coin-wormhole%2Ctether&vs_currencies=inr",
      { headers: { "x-cg-demo-api-key": "CG-6cV1jEXLFDiEnkhUJH5CehaH" } }
    );
    setCryptoPrice({
      BTC: priceData?.data?.bitcoin?.inr,
      ETH: priceData?.data?.ethereum?.inr,
      BNB: priceData?.data["binance-coin-wormhole"]["inr"],
      USDT: priceData?.data?.tether?.inr,
    });
    console.info("🟣 priceData: ", priceData);
  };
  // price api end

  useEffect(() => {
    fetchCryptoPrice();
  }, []);

  console.info("cryptoPrice: ", cryptoPrice);

  let fetchAdminBankDetails = async () => {
    try {
      const res = await axios(API.getAdminBankDetails, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const { accountHolderName, bankName, accountNumber, branch, ifsCode } =
        res?.data?.data?.bankDetails;
      setAdminBankDetails({
        ...adminBankDetails,
        accountHolderName,
        bankName,
        accountNumber,
        branch,
        ifsCode,
      });
      return { accountHolderName, bankName, accountNumber, branch, ifsCode };
    } catch (error) {
      console.log("🔺 fetchAdminBankDetails: error: ", error);
      // throw new Error("Error fetching bank details: " + error.message);
    }
  };

  let fetchUserBankDetails = async () => {
    try {
      const res = await axios.get(API.getBankDetails, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const {
        id,
        accountHolderName,
        bankName,
        accountNumber,
        branch,
        ifsCode,
      } = res?.data?.data?.bankDetails;
      setUserBankDetails({
        ...userBankDetails,
        accountHolderName,
        bankName,
        accountNumber,
        branch,
        ifsCode,
      });
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        bankAccount: id,
      }));
      return {
        id,
        accountHolderName,
        bankName,
        accountNumber,
        branch,
        ifsCode,
      };
    } catch (error) {
      console.log("🔺 fetchUserBankDetails: error: ", error);
      // throw new Error("Error fetching bank details: " + error.message);
    }
  };

  let fetchAdminWalletDetails = async () => {
    // console.log(
    //   "🟣🟠🟢🟡 fetchAdminWalletDetails called!!!!! network: ",
    //   orderData.network
    // );
    try {
      const res = await axios.get(API.getUserWalletDetails, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        payload: {
          status: "ACTIVE",
        },
      });
      console.info('🟣🟠🟢🟡 fetchAdminWalletDetails  -> res: ', res);
      const wallets = res?.data?.data?.wallets;

      setAdminWalletsList(wallets);

      const selectNetworkWalletDetails = wallets?.find(
        (wallet) => wallet.network === orderData.network
      );
      console.log(
        "🟣🟠🟢🟡 fetchAdminWalletDetails: orderData.network ",
        orderData.network
      );
      console.log(
        "🟣🟠🟢🟡 fetchAdminWalletDetails: selectNetworkWalletDetails ",
        selectNetworkWalletDetails
      );
      const { id, status, network, address } = selectNetworkWalletDetails;

      setAdminWalletDetails((prevOrderData) => ({
        ...prevOrderData,
        id,
        status,
        network,
        walletAddress: address,
      }));

      return selectNetworkWalletDetails;
    } catch (error) {
      console.log("🔺 fetchAdminWalletDetails: error: ", error);
      // throw new Error(
      //   "Error fetching user wallet address details: " + error.message
      // );
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentStep(1);
    if (tab == "buy") {
      setOrderData({
        ...initialOrderData,
        transactionType: "FIAT",
      });
    } else if (tab == "sell") {
      setOrderData({
        ...initialOrderData,
        transactionType: "CRYPTO",
      });
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    const validationErrors = validateStep1Inputs(orderData);
    console.log("🔴🔺 handleNextClick: validationErrors: ", validationErrors);
    const hasNoErrors = Object.values(validationErrors).every(
      (error) => error.message === ""
    );

    if (hasNoErrors) {
      console.log("Form submitted:", orderData);
      setCurrentStep(currentStep + 1);
    } else {
      setValidationErrors(validationErrors);
    }
  };

  const handlePreviousClick = () => {
    event.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const handleOnSelect = (event, selectDropwdownName) => {
    event.preventDefault();
    const { name, value } = event.target;

    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [selectDropwdownName]: value,
    }));
    if (selectDropwdownName === "network") {
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        crypto: cryptoOptions[value][0],
      }));
    }
  };

  useEffect(() => {
    let fetchData = async () => {
      await Promise.all([
        fetchAdminBankDetails(),
        fetchAdminWalletDetails(),
        fetchUserBankDetails(),
      ]);
    };
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "sell") {
      fetchAdminWalletDetails();
    }
  }, [orderData.network]);

  const handleOnInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    console.log("🔶 handleOnInputChange: data: ", {
      activeTab,
      name,
      value,
    });

    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
    if (["sendAmount", "receivedAmount"].includes(name)) {
      const cryptoValueInputName =
        name === "sendAmount" ? "receivedAmount" : "sendAmount";
      const cryptoValue = Number(value) * 3600000;
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        [cryptoValueInputName]: Number(value) * cryptoPrice[orderData?.crypto],
      }));
      if (name === "sendAmount") {
        const receivedAmountAfterTdsDeduction =
          calculateAmountAfterTDS(cryptoValue);
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          receivedAmountAfterTdsDeduction,
        }));
      }
    }
  };

  const handleOrderSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateStep2Inputs(orderData);
    console.log("🟢 validationErrors: ", validationErrors);
    const hasNoErrors = Object.values(validationErrors).every(
      (error) => error.message === ""
    );

    if (hasNoErrors) {
      console.log("Form submitted:", orderData);

      let data = orderData;
      if (activeTab === "buy") {
        const { receivedAmountAfterTdsDeduction, ...restOrderData } = orderData;
        data = restOrderData;
      }
      mutate(data);
    } else {
      setValidationErrors(validationErrors);
    }
  };

  let createOrder = async (orderData) => {
    console.log("🟩 createOrder called!: orderData", orderData);
    try {
      const res = await axios(API.createOrder, {
        method: "POST",
        data: {
          ...orderData,
        },
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      return res;
    } catch (error) {
      // console.log("🔺 createOrder: error: ", error);
      throw new Error("Error creating order: " + error.message);
    }
  };

  let { mutate, isPending: loading } = useMutation({
    mutationFn: (data) => createOrder(orderData),
    onSuccess: (res) => {
      console.log("🔶 useMutation: res: UserDetails: ", res);
      toast.success("Transaction completed successfully");
      // refetch();
    },
    onError: (error) => {
      console.log("🔺 useMutation: error: UserDetails: ", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    },
  });

  const validateStep1Inputs = (data) => {
    console.log("🟢 validateStep1Inputs: ", validationErrors);
    let errors = {
      sendAmount: { message: "" },
      receivedAmount: { message: "" },
      walletAddress: { message: "" },
    };
    if (!data.sendAmount) {
      errors.sendAmount.message = "Send amount is required";
    } else if (isNaN(data.sendAmount)) {
      errors.sendAmount.message = "Send amount must be a valid number";
    } else if (activeTab === "buy" && data.sendAmount < 1000000) {
      errors.sendAmount.message =
        "Send amount must be greater than or equal to 1000000";
    }

    if (!data.receivedAmount) {
      errors.receivedAmount.message = "Received amount is required";
    } else if (isNaN(data.receivedAmount)) {
      errors.receivedAmount.message = "Received amount must be a valid number";
    }

    if (!data.walletAddress) {
      errors.walletAddress.message = "Wallet Address is required";
    }
    setValidationErrors(errors);
    return errors;
  };

  const validateStep2Inputs = (data) => {
    console.log("🟢 validateStep1Inputs: ", validationErrors);
    let errors = {
      primaryTransactionReceipt: { message: "" },
    };
    if (!data.primaryTransactionReceipt) {
      errors.primaryTransactionReceipt.message =
        "Primary Transaction Receipt is required";
    }
    setValidationErrors(errors);
    return errors;
  };

  const renderTabContent = () => {
    switch (true) {
      case activeTab === "buy" && currentStep === 1:
        return (
          <BuyOrSellComponent
            activeTab={activeTab}
            orderData={orderData}
            handleNextClick={handleNextClick}
            handleOnSelect={handleOnSelect}
            handleOnInputChange={handleOnInputChange}
            validationErrors={validationErrors}
          />
        );
      case activeTab === "buy" && currentStep === 2:
        return (
          <AccountComponent
            orderData={orderData}
            handleOnInputChange={handleOnInputChange}
            handleOrderSubmit={handleOrderSubmit}
            adminBankDetails={adminBankDetails}
            userBankDetails={userBankDetails}
            validationErrors={validationErrors}
          />
        );
      case activeTab === "sell" && currentStep === 1:
        return (
          <BuyOrSellComponent
            activeTab={activeTab}
            orderData={orderData}
            handleNextClick={handleNextClick}
            handleOnSelect={handleOnSelect}
            handleOnInputChange={handleOnInputChange}
            validationErrors={validationErrors}
          />
        );
      case activeTab === "sell" && currentStep === 2:
        return (
          <WalletComponent
            orderData={orderData}
            handleOnInputChange={handleOnInputChange}
            handleOrderSubmit={handleOrderSubmit}
            userBankDetails={userBankDetails}
            validationErrors={validationErrors}
            adminWalletDetails={adminWalletDetails}
          />
        );
      default:
        return null;
    }
  };

  // console.log("🟣 : ", {
  //   activeTab,
  //   currentStep,
  // });

  if (
    !adminBankDetails.accountNumber ||
    adminWalletsList.length < 3
  ) {
    return (
      <div className="col-lg-6">
        <div className="row gy-5 gy-md-6 justify-content-center">
          <div className="col-lg-6 col-xxl-12">
            <div className="buy_crypto__formarea p-6 p-px-8 rounded-20 bg7-color wow fadeInUp dashboard-warning-div">
              <div className="col-lg-6 col-xxl-12">
                <div className="demo">
                  <br />
                  <p className="dashboard-warning-p">You can't submit any order. Please contact Admin!</p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (
    (!!adminBankDetails.accountNumber &&
    adminWalletsList.length == 3) &&
    !userBankDetails.accountNumber
  ) {
    return (
      <div className="col-lg-6">
        <div className="row gy-5 gy-md-6 justify-content-center">
          <div className="col-lg-6 col-xxl-12">
            <div className="buy_crypto__formarea p-6 p-px-8 rounded-20 bg7-color wow fadeInUp dashboard-warning-div">
              <div className="col-lg-6 col-xxl-12">
                <div className="demo">
                  <br />
                  <p className="dashboard-warning-p">Please add your bank details in profile section</p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (
    !!adminBankDetails.accountNumber &&
    adminWalletsList.length == 3 &&
    !!userBankDetails.accountNumber
  ) {
    return (
      <>
        <Toaster />
        <div className="col-lg-6">
          <div className="row gy-5 gy-md-6 justify-content-center">
            <div className="col-lg-6 col-xxl-12">
              <div className="buy_crypto__formarea p-6 p-px-8 rounded-20 bg7-color wow fadeInUp">
                <div className="demo">
                  <div className="tab">
                    {currentStep == 1 && (
                      <div className="tab">
                        <input
                          id="tab1"
                          type="radio"
                          name="tabBuy"
                          className="radio-inputs"
                          checked={activeTab === "buy"}
                          defaultChecked
                          onChange={() => handleTabClick("buy")}
                        />
                        <label className="tab-button" htmlFor="tab1">
                          Buy Assets
                        </label>
                        <input
                          id="tab2"
                          type="radio"
                          className="radio-inputs"
                          name="tabSell"
                          checked={activeTab === "sell"}
                          onChange={() => handleTabClick("sell")}
                        />
                        <label className="tab-button" htmlFor="tab2">
                          Sell Assets
                        </label>
                      </div>
                    )}
                    {currentStep == 2 && (
                      <div className="tab">
                        {/* <p >🔙</p> */}
                        <img
                          src="assets/images/back.png"
                          style={{
                            width: "60px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                          onClick={() => setCurrentStep(1)}
                        />
                      </div>
                    )}
                    {renderTabContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
