import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { cryptoOptions } from "../../../../utils/config/constants";
import axios from "../../../../lib/http-request";
import { API } from "../../../../utils/config/api-end-points.config";
import { calculateAmountAfterTDS } from "../../../../utils/config/helper-functions";
import { useUserStore } from "../../../../store/user.store";
import { BuyOrSellComponent } from "./BuyOrSellComponent";
import { AccountComponent } from "./AccountComponent";
import { WalletComponent } from "./WalletComponent";
import { validate } from "wallet-address-validator";
import { TronWeb } from "tronweb";
import { ethers } from "ethers";

export const Transaction = ({ cryptoPrice }) => {
  const navigate = useNavigate();
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

  let initialAdminBankDetails = {
    accountHolderName: "Admin",
    accountNumber: "",
    bankName: "",
    branch: "",
    ifsCode: "",
  };

  let initialUserBankDetails = {
    accountHolderName: "User",
    accountNumber: "",
    bankName: "",
    branch: "",
    ifsCode: "",
  };

  const initialValidationErrors = {
    sendAmount: { message: "" },
    receivedAmount: { message: "" },
    walletAddress: { message: "" },
    primaryTransactionReceipt: { message: "" },
    receivedAmountAfterTdsDeduction: { message: "" },
  };

  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);
  // console.log("🟡 user: ", user);

  const [activeTab, setActiveTab] = useState("buy");
  const [currentStep, setCurrentStep] = useState(1);

  const [validationErrors, setValidationErrors] = useState(
    initialValidationErrors
  );

  const [adminBankDetails, setAdminBankDetails] = useState(
    initialAdminBankDetails
  );

  const [adminWalletsList, setAdminWalletsList] = useState({
    bscAddress: "",
    btcAddress: "",
    ethAddress: "",
    tronAddress: "",
  });

  // const [adminWalletDetails, setAdminWalletDetails] = useState(
  //   initialAdminWalletDetails
  // );

  const [userBankDetails, setUserBankDetails] = useState(
    initialUserBankDetails
  );

  const [orderData, setOrderData] = useState(initialOrderData);

  const resetTransactionForm = () => {
    setValidationErrors(initialValidationErrors);
    setOrderData(initialOrderData);
    setAdminBankDetails(initialAdminBankDetails);
    // setAdminWalletDetails(initialAdminWalletDetails);
    setUserBankDetails(initialUserBankDetails);
  };

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
      throw new Error("Error fetching admin bank details: " + error.message);
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
      console.error("🔺 fetchUserBankDetails: error: ", error);
      // throw new Error("Error fetching bank details: " + error.message);
    }
  };

  let fetchAdminWalletDetails = async () => {
    try {
      const res = await axios.get(API.getUserWalletDetails, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        payload: {
          status: "ACTIVE",
        },
      });
      console.info("🟣 fetchAdminWalletDetails  -> res: ", res);
      const wallets = res?.data?.data?.wallets?.[0];

      if (wallets) {
        setAdminWalletsList(wallets);
      }

      // const selectNetworkWalletDetails = wallets?.find(
      //   (wallet) => wallet.network === orderData.network
      // );
      // console.log(
      //   "🟣 fetchAdminWalletDetails: orderData.network ",
      //   orderData.network
      // );
      // console.log(
      //   "🟡 fetchAdminWalletDetails: selectNetworkWalletDetails ",
      //   selectNetworkWalletDetails
      // );
      // const { id, status, network, address } = selectNetworkWalletDetails;

      // setAdminWalletDetails((prevOrderData) => ({
      //   ...prevOrderData,
      //   id,
      //   status,
      //   network,
      //   walletAddress: address,
      // }));

      // return selectNetworkWalletDetails;
      return wallets;
    } catch (error) {
      console.error("🔺 fetchAdminWalletDetails: error: ", error);
    }
  };

  const handleTabClick = (tab) => {
    resetTransactionForm();
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

  const handleNextClick = async (e) => {
    e.preventDefault();
    const validationErrors = await validateStep1Inputs(orderData);
    console.log("🔺 handleNextClick: validationErrors: ", validationErrors);
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

  const handleCryptoDropdwonSelectionForBuyAssets = (
    selectDropwdownName,
    selectedCrypto
  ) => {
    if (orderData.receivedAmount !== null) {
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        [selectDropwdownName]: selectedCrypto,
        sendAmount:
          Number(orderData.receivedAmount) * cryptoPrice[selectedCrypto],
      }));
    }
  };

  const handleCryptoDropdwonSelectionForSellAssets = (
    selectDropwdownName,
    selectedCrypto
  ) => {
    if (orderData.sendAmount !== null) {
      const receivedAmount =
        Number(orderData.sendAmount) * cryptoPrice[selectedCrypto];
      const receivedAmountAfterTdsDeduction =
        calculateAmountAfterTDS(receivedAmount);
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        [selectDropwdownName]: selectedCrypto,
        receivedAmount,
        receivedAmountAfterTdsDeduction,
      }));
    }
  };

  const handleNetworkDropdwonSelectionForBuyAssets = (
    selectDropwdownName,
    networkValue
  ) => {
    const selectedCrypto = cryptoOptions[networkValue][0];
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [selectDropwdownName]: networkValue,
      crypto: selectedCrypto,
      sendAmount:
        Number(orderData.receivedAmount) * cryptoPrice[selectedCrypto],
    }));
  };

  const handleNetworkDropdwonSelectionForSellAssets = (
    selectDropwdownName,
    networkValue
  ) => {
    const selectedCrypto = cryptoOptions[networkValue][0];
    const receivedAmount =
      Number(orderData.sendAmount) * cryptoPrice[selectedCrypto];
    const receivedAmountAfterTdsDeduction =
      calculateAmountAfterTDS(receivedAmount);
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [selectDropwdownName]: networkValue,
      crypto: selectedCrypto,
      receivedAmount,
      receivedAmountAfterTdsDeduction,
    }));
  };

  const handleOnSelect = (event, selectDropwdownName) => {
    event.preventDefault();
    const { value } = event.target;

    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [selectDropwdownName]: value,
    }));
    if (selectDropwdownName === "network") {
      if (activeTab === "buy") {
        handleNetworkDropdwonSelectionForBuyAssets(selectDropwdownName, value);
      } else if (activeTab === "sell") {
        handleNetworkDropdwonSelectionForSellAssets(selectDropwdownName, value);
      }
    } else if (selectDropwdownName === "crypto") {
      if (activeTab === "buy") {
        handleCryptoDropdwonSelectionForBuyAssets(selectDropwdownName, value);
      } else if (activeTab === "sell") {
        handleCryptoDropdwonSelectionForSellAssets(selectDropwdownName, value);
      }
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
      const cryptoValue = Number(value) * cryptoPrice[orderData.crypto];
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
      throw new Error("Error creating order: " + error.message);
    }
  };

  let { mutate, isPending: loading } = useMutation({
    mutationFn: (data) => createOrder(orderData),
    onSuccess: (res) => {
      console.log("🔶 useMutation: res: UserDetails: ", res);
      toast.success("Transaction completed successfully");
      resetTransactionForm();
      navigate("/orders");
    },
    onError: (error) => {
      console.error("🔺 useMutation: error: UserDetails: ", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    },
  });

  const provider = new ethers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
  ); // Binance Smart Chain provider

  async function getBNBBalance(address) {
    try {
      const balanceWei = await provider.getBalance(address); // Balance in wei
      const balanceBNB = ethers.formatEther(balanceWei); // Convert wei to BNB
      return balanceBNB;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error; // Handle the error appropriately
    }
  }

  const validateStep1Inputs = async (data) => {
    console.log("🟢 validateStep1Inputs: ", validationErrors);
    console.log("data", data);
    let errors = {
      sendAmount: { message: "" },
      receivedAmount: { message: "" },
      walletAddress: { message: "" },
      primaryTransactionReceipt: { message: "" },
      receivedAmountAfterTdsDeduction: { message: "" },
    };
    if (!data.sendAmount) {
      errors.sendAmount.message = "Send amount is required";
    } else if (isNaN(data.sendAmount)) {
      errors.sendAmount.message = "Send amount must be a valid number";
    } else if (activeTab === "buy" && data.sendAmount < 1000000) {
      errors.sendAmount.message =
        "Send amount must be greater than or equal to 1000000";
    } else if (
      activeTab === "sell" &&
      data.receivedAmountAfterTdsDeduction < 1000000
    ) {
      errors.receivedAmountAfterTdsDeduction.message =
        "Received Amount must be greater than or equal to 1000000";
    }

    if (!data.receivedAmount) {
      errors.receivedAmount.message = "Received amount is required";
    } else if (isNaN(data.receivedAmount)) {
      errors.receivedAmount.message = "Received amount must be a valid number";
    }

    let valid = false;
    if (!data.walletAddress) {
      errors.walletAddress.message = "Wallet Address is required";
    } else if (data.crypto) {
      try {
        if (data.network === "BSC") {
          try {
            const balanceBNB = await getBNBBalance(data.walletAddress);
            console.log("BNB Balance:", balanceBNB);
            valid = true;
          } catch (error) {
            console.error(
              "Error fetching BNB balance or invalid BNB address:",
              error
            );
            errors.walletAddress.message =
              "Invalid BNB wallet address or error fetching balance";
          }
        } else if (data.network === "TRON") {
          valid = TronWeb.isAddress(data.walletAddress);
          console.log("TRON CHECK", valid);
        } else {
          valid = validate(data.walletAddress, data.network);
          console.log("Wallet address validation result:", valid);
        }

        if (!valid) {
          errors.walletAddress.message = "Invalid wallet address";
        }
      } catch (error) {
        console.error("Error during wallet address validation:", error);
        errors.walletAddress.message = "Error validating wallet address";
      }
    } else {
      errors.walletAddress.message = "Crypto type is required for validation";
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
            adminWalletDetails={adminWalletsList}
          />
        );
      default:
        return null;
    }
  };

  const { bscAddress, btcAddress, ethAddress, tronAddress } = adminWalletsList;
  const allAddressPresent =
    bscAddress && btcAddress && ethAddress && tronAddress;

  // console.log("🟣 : ", {
  //   activeTab,
  //   currentStep,
  // });

  if (!adminBankDetails.accountNumber || !allAddressPresent) {
    return (
      <div className="col-lg-6">
        <div className="row gy-5 gy-md-6 justify-content-center">
          <div className="col-lg-6 col-xxl-12">
            <div className="buy_crypto__formarea p-6 p-px-8 rounded-20 bg7-color wow fadeInUp dashboard-warning-div">
              <div className="col-lg-6 col-xxl-12">
                <div className="demo">
                  <br />
                  <p className="dashboard-warning-p">
                    You can't submit any order. Please contact Admin!
                  </p>
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
    allAddressPresent &&
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
                  <p className="dashboard-warning-p">
                    Please add your bank details in profile section
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user.isKYCVerified) {
    return (
      <div className="col-lg-6">
        <div className="row gy-5 gy-md-6 justify-content-center">
          <div className="col-lg-6 col-xxl-12">
            <div className="buy_crypto__formarea p-6 p-px-8 rounded-20 bg7-color wow fadeInUp dashboard-warning-div">
              <div className="col-lg-6 col-xxl-12">
                <div className="demo">
                  <br />
                  <p className="dashboard-warning-p">
                    Please Verify your KYC Status for submitting orders
                  </p>
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
    allAddressPresent &&
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
