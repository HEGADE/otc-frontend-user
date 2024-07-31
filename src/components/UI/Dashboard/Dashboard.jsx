import React from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../lib/http-request";
import { API } from "../../../utils/config/api-end-points.config";
import { Preloader } from ".././Preloader";
import { Error } from ".././Error";
import { Transaction } from "./Transaction/Transaction";
import { CryptoPricing } from "./CrypoPricing";

export const Dashboard = () => {
  const [cryptoPrice, setCryptoPrice] = React.useState({
    BTC: null,
    ETH: null,
    BNB: null,
    USDT: null,
    TRX: null
  });

  // price api start
  const fetchCryptoPrice = async () => {
    console.info("🟣 coingecko api call 🔥");
    const priceData = await axios({
      method: "GET",
      url: API.getCryptoPricing,
      headers: { "x-cg-demo-api-key": "CG-6cV1jEXLFDiEnkhUJH5CehaH" },
    });
    console.log('priceData------------------------------------', priceData);
    setCryptoPrice({
      BTC: priceData?.data?.bitcoin?.inr,
      ETH: priceData?.data?.ethereum?.inr,
      BNB: priceData?.data["binance-coin-wormhole"]["inr"],
      USDT: priceData?.data?.tether?.inr,
      TRX: priceData?.data?.tron?.inr,
    });
    console.info("🟣 priceData: ", priceData);
    return priceData;
  };
  // price api end

  let { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["cryptoPriceDetails"],
    queryFn: fetchCryptoPrice,
  });

  console.info("cryptoPrice: ", cryptoPrice);

  if (isLoading) return <Preloader />;
  if (isError) return <Error />;

  return (
    <body>
      <section
        className="page-header bg--cover"
        style={{ backgroundImage: "url(/assets/images/breadcrumb.png)" }}
      >
        <div className="container">
          <div
            className="page-header__content mt-100 text-center"
            // data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h2>Dashboard</h2>
          </div>
          <div className="page-header__shape">
            <span className="page-header__shape-item page-header__shape-item--1">
              <img src="/assets/images/2.png" alt="shape-icon" />
            </span>
          </div>
        </div>
      </section>
      <section className="markets_section padding-top padding-bottom bg5-color">
        <div className="container">
          <div className="row gy-6">
            <CryptoPricing cryptoPrice={cryptoPrice} />
            <Transaction cryptoPrice={cryptoPrice} />
          </div>
        </div>
      </section>
      <a href="#" className="scrollToTop scrollToTop--style1">
        <i className="fa-solid fa-arrow-up-from-bracket"></i>
      </a>
    </body>
  );
};
