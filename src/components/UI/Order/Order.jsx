import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "../../../store/user.store";
import axios from "../../../lib/http-request";
import { API } from "../../../utils/config/api-end-points.config";
import { Preloader } from "../Preloader";
import { Error } from "../Error";
import { OrderTable } from "./OrderTable";
import { Pagination } from "../Pagination/Pagination";

export const Order = () => {
  const accessToken = useUserStore((state) => state.accessToken);

  const [activeTransactionTypeTab, setActiveTransactionTypeTab] =
    useState("FIAT");

  const [orderData, setOrderData] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  const [paginationInput, setPaginationInput] = useState({
    totalResults: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });

  const handleTabClick = (tab) => {
    setActiveTransactionTypeTab(tab);
  };

  const handleRefresh = () => {
    window.location.reload()
  }

  let fetchOrderDetails = async () => {
    const params = {
      transactionType: activeTransactionTypeTab,
      limit: paginationInput.limit,
      page: paginationInput.currentPage,
    };
    if (selectedNetwork) {
      params.network = selectedNetwork;
    }
    if (submissionStatus) {
      params.status = submissionStatus;
    }
    try {
      const res = await axios.get(API.getOrderDetails, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        params,
      });
      const orderRes = res?.data?.data?.orders;
      console.log(
        "🔷 orderRes: transactionType: ",
        activeTransactionTypeTab,
        orderRes
      );
      setOrderData(orderRes?.results);
      setPaginationInput({
        ...paginationInput,
        totalResults: orderRes.totalResults,
        totalPages: orderRes.totalPages,
        currentPage: orderRes.page,
      });
      return orderRes;
    } catch (error) {
      console.log("🔺 useQuery: error: ", error);
      throw new Error("Error fetching order details: " + error.message);
    }
  };

  let { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["orderDetails"],
    queryFn: fetchOrderDetails,
  });

  useEffect(() => {
    if (activeTransactionTypeTab) {
      refetch({ transactionType: activeTransactionTypeTab });
    }
  }, [
    activeTransactionTypeTab,
    refetch,
    paginationInput.currentPage,
    selectedNetwork,
    submissionStatus,
  ]);

  if (isLoading) return <Preloader />;

  if (isError) return <Error />;

  return (
    <>
      <section
        className="page-header bg--cover"
        style={{ backgroundImage: "url(assets/images/banner/4.jpg)" }}
      >
        <div className="container">
          <div
            className="page-header__content mt-100 text-center"
            // data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h2>Orders</h2>
          </div>
          <div className="page-header__shape">
            <span className="page-header__shape-item page-header__shape-item--1">
              <img src="/assets/images/2.png" alt="shape-icon" />
            </span>
          </div>
        </div>
      </section>
      <section className="pools_table padding-top padding-bottom bg5-color">
        <div className="container">
          <div className="row">
            <div className="pools_table__part">
              <div className="singletab">
                <div className="demo">
                  <div className="tab">
                    <div
                      className="tab-wrapper"
                      style={{ paddingRight: "20px", paddingLeft: "20px" }}
                    >
                      <input
                        id="tab1"
                        type="radio"
                        name="tabsA"
                        className="radio-inputs"
                        checked={activeTransactionTypeTab === "FIAT"}
                        defaultChecked
                        onChange={() => handleTabClick("FIAT")}
                      />
                      <label className="tab-button order-btn" htmlFor="tab1">
                        Buy Orders
                      </label>
                      <input
                        id="tab2"
                        type="radio"
                        className="radio-inputs"
                        name="tabsA"
                        checked={activeTransactionTypeTab === "CRYPTO"}
                        onChange={() => handleTabClick("CRYPTO")}
                      />
                      <label className="tab-button order-btn" htmlFor="tab2">
                        Sell Orders
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="pools_table__part">
              <div className="singletab">
                <div className="demo">
                  <div className="tab">
                    <div className="tab-wrapper d-flex gap-3 p-3">
                      <button
                        style={{
                          border: "1px solid gray",
                          borderRadius: "10px",
                          padding: "10px",
                        }}
                        onClick={handleRefresh}
                      >
                        Refresh
                      </button>
                      <select
                        className=""
                        name=""
                        id=""
                        onChange={(e) => setSelectedNetwork(e.target.value)}
                        style={{
                          border: "1px solid gray",
                          borderRadius: "10px",
                          padding: "10px",
                        }}
                      >
                        <option value=""selected>
                          All Networks
                        </option>
                        <option value="ETH">ETH</option>
                        <option value="BSC">BSC</option>
                        <option value="BTC">BTC</option>
                        <option value="TRON">TRON</option>
                      </select>
                      <select
                        className=""
                        name=""
                        id=""
                        onChange={(e) => setSubmissionStatus(e.target.value)}
                        style={{
                          border: "1px solid gray",
                          borderRadius: "10px",
                          padding: "10px",
                        }}
                      >
                        <option value="" selected>
                          All Statuses
                        </option>
                        <option value="SUBMITTED">SUBMITTED</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OrderTable
            orderData={orderData}
            activeTransactionTypeTab={activeTransactionTypeTab}
          />
          {!!paginationInput?.totalResults && (
            <Pagination
              paginationInput={paginationInput}
              setPaginationInput={setPaginationInput}
            />
          )}
        </div>
      </section>
    </>
  );
};
