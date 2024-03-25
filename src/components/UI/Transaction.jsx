import { useState, useEffect } from "react";
import loadjs from "loadjs";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import axios from "../../lib/http-request";
import { API } from "../../utils/config/api-end-points.config";
import { useUserStore } from "../../store/user.store";
import { BuyOrSellComponent } from "./BuyOrSellComponent";
import { AccountComponent } from "./AccountComponent";
import { WalletComponent } from "./WalletComponent";

export const Transaction = () => {
  const networkOptions = ["ETH", "BSC", "BTC"];
  const cryptoOptions = {
    ETH: ["ETH", "USDT"],
    BSC: ["BNB", "USDT"],
    BTC: ["BTC"],
  };
  const currencyOptions = ["AED", "INR"];

  let initialOrderData = {
    network: "ETH",
    transactionType: "FIAT",
    crypto: "USDT",
    currency: "AED",
    sendAmount: null,
    receivedAmount: null,
    bankAccount: null,
    walletAddress: "",
    primaryTransactionReceipt: "",
  };

  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);
  // console.log("🟡 user: ", user);

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
      // console.log("🔺 fetchAdminBankDetails: error: ", error);
      throw new Error("Error fetching bank details: " + error.message);
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
      // console.log("🔺 fetchUserBankDetails: error: ", error);
      throw new Error("Error fetching bank details: " + error.message);
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
          status: "active",
        },
      });
      const wallets = res?.data?.data?.wallets;

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
      // console.log("🔺 fetchAdminWalletDetails: error: ", error);
      throw new Error(
        "Error fetching user wallet address details: " + error.message
      );
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
    if (activeTab === "buy") {
      let fetchData = async () => {
        await Promise.all([fetchAdminBankDetails(), fetchUserBankDetails()]);
      };
      fetchData();
    }
    if (activeTab === "sell") {
      let fetchData = async () => {
        await Promise.all([
          fetchAdminBankDetails(),
          fetchAdminWalletDetails(),
          fetchUserBankDetails(),
        ]);
      };
      fetchData();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "sell") {
      fetchAdminWalletDetails();
    }
  }, [orderData.network]);

  const handleOnInputChange = (event) => {
    // console.log("🟢 handleOnInputChange: ", orderData.network);
    event.preventDefault();
    const { name, value } = event.target;
    console.log(
      "🔶 Transaction: handleOnInputChange: name, value: ",
      name,
      value
    );
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
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
      mutate(orderData);
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
      // console.log("🔺 useMutation: error: UserDetails: ", error);
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

  return (
    <>
      <Toaster />
      <div className="col-lg-6">
        <div className="row gy-5 gy-md-6 justify-content-center">
          <div className="col-lg-6 col-xxl-12">
            <div className="buy_crypto__formarea p-6 p-px-8 rounded-20 bg7-color wow fadeInUp">
              <div className="demo">
                <div className="tab">
                  <div className="tab-wrapper">
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
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
